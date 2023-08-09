---
subject: .NET
title: Handling JWT Authentication with ASP.NET Core TestServer
date: '2023-06-02T22:45:00.000Z'
tags:
  - testing
  - .net
coverImage: ./handling-jwt-authentication-with-aspnetcore-testserver.jpg
coverImageCredit: Markus Spiske on Unsplash
coverImageCreditUrl: https://unsplash.com/photos/6pflEeSzGUo
---

When writing APIs using ASP.NET Core we can use the excellent
[Microsoft.AspNetCore.TestHost](https://www.nuget.org/packages/Microsoft.AspNetCore.TestHost) or
[Microsoft.AspNetCore.Mvc.Testing](https://www.nuget.org/packages/Microsoft.AspNetCore.Mvc.Testing) packages
to write tests which execute the API endpoints themselves in a test server. This allows us to easily
write tests which integrate all layers of our API. However there are some challenges with this style
of test where authentication is involved.

Microsofts [own documentation](https://learn.microsoft.com/en-us/aspnet/core/test/integration-tests?view=aspnetcore-6.0#mock-authentication) offers an approach which involves creating a custom `AuthenticationHandler<TOptions>` which can
allow us to bypass API authentication in tests. Personally, I'm not a fan. I would much prefer to
write tests for ASP.NET Core APIs in such a way where the authorization policies I have configured for
my JWT bearer authentication are hit as part of the tests.

Fortunately, it's possible to write tests where we can send a JWT to the API and exercise our authorization
policies in the process. To do this we need to reconfigure `JwtBearerOptions` to provide a different signature
validator which will allow us to create a JWT in tests and have it accepted by the API under test. At this point,
you can continue reading or [just skip to the sample](https://github.com/jasonmitchell/dotnet-testserver-auth).

First let's assume we have authorization services configured as follows:

```csharp
public static void AddAuthorizationServices(this IServiceCollection services, IConfiguration configuration)
{
    JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

    services.Configure<JwtBearerOptions>(configuration.GetSection("JwtBearer"));
    services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer();

    services.AddAuthorization(options =>
    {
        options.DefaultPolicy = new AuthorizationPolicyBuilder(JwtBearerDefaults.AuthenticationScheme)
                                .RequireAuthenticatedUser()
                                .Build();

        options.AddPolicy("Admin", policy => policy.RequireClaim("role", "admin"));
    });
}
```

This configures JWT bearer authentication, sets up a default authorization policy which requires an
authenticated user, and then adds an additional policy which requires the user to be in the `admin`
role.

We can then set up an API to use the admin policy:

```csharp
app.MapGet("/people", () => new[]
{
    new Person("John", "Doe"),
    new Person("Jane", "Doe"),
    new Person("John", "Smith"),
    new Person("Jane", "Smith")
}).RequireAuthorization("Admin");
```

If we try to use this API endpoint in tests with the authorization configuration above, we'll get a
a `401 Unauthorized` response. We need to reconfigure `JwtBearerOptions` to use a custom signature
validator in our test setup:

> The test server setup has been omitted for brevity. See the [sample](https://github.com/jasonmitchell/dotnet-testserver-auth)
> for a full working example.

```csharp
private static void ConfigureAuthenticationForTests(WebApplicationBuilder builder)
{
    // Remove the existing configuration from the API, we don't need that...
    builder.Services.RemoveAll<IPostConfigureOptions<JwtBearerOptions>>();

    // Reconfigure JwtBearerOptions to use a custom token validator
    builder.Services.PostConfigure<JwtBearerOptions>(JwtBearerDefaults.AuthenticationScheme, options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            SignatureValidator = (token, _) => new JwtSecurityToken(token), ValidateAudience = false, ValidateIssuer = false
        };
    });
}
```

Here we skip validation of the token audience and issuer and simply create a new `JwtSecurityToken` instance
from the provided token string. The framework will then be able to use this like our regular authentication
and create a `ClaimsPrincipal` containing the `ClaimsIdentity` for our test "user" represented by the JWT.

Now we can create a JWT signed by a random key in the tests:

```csharp
private static string CreateTestJwt(string role)
{
    var securityTokenDescriptor = new SecurityTokenDescriptor
    {
        NotBefore = DateTime.UtcNow,
        Expires = DateTime.UtcNow.AddMinutes(1),
        SigningCredentials = new SigningCredentials(new RsaSecurityKey(RSA.Create()), SecurityAlgorithms.RsaSha512),
        Subject = new ClaimsIdentity(new List<Claim>
        {
            new("name", "Some User"), new("role", role)
        })
    };

    var securityTokenHandler = new JwtSecurityTokenHandler();
    var token = securityTokenHandler.CreateToken(securityTokenDescriptor);
    var encodedAccessToken = securityTokenHandler.WriteToken(token);

    return encodedAccessToken;
}
```

and use it in our tests to call the authenticated API endpoint:

```csharp
[Fact]
public async Task User_is_authenticated_by_test_token()
{
    var httpClient = await CreateTestServer();
    var jwt = CreateTestJwt("admin");

    var response = await httpClient.SendAsync(new HttpRequestMessage(HttpMethod.Get, "/people")
    {
        Headers =
        {
            Authorization = new AuthenticationHeaderValue(JwtBearerDefaults.AuthenticationScheme, jwt)
        }
    });

    Assert.Equal(HttpStatusCode.OK, response.StatusCode);
}
```

Now we have a solution which allows us to use the test server to exercise our API logic and the authorization
policies associated with it. This is a much better approach than mocking authentication and authorization entirely
with a new authorization handler.
