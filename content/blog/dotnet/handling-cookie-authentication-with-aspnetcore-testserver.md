---
subject: .NET
title: Handling Cookie Authentication with ASP.NET Core TestServer
date: '2023-08-09T20:59:00.000Z'
tags:
  - testing
  - .net
coverImage: ./handling-cookie-authentication-with-aspnetcore-testserver.jpg
coverImageCredit: Ben Lei on Unsplash
coverImageCreditUrl: https://unsplash.com/photos/pQhV76X37P0
---

Following up on my article about handling
[JWT authentication with the ASP.NET Core TestServer](handling-jwt-authentication-with-aspnetcore-testserver/),
this post will cover the equivalent approach but for cookie based authentication. As a reminder, the idea
is to ensure our tests also execute the authorization policies defined by the application so that we can
be sure we are verifying the most complete slice through our API as possible.

Achieving this for cookie authentication was much trickier than for JWT and there wasn't a lot of readily
available documentation for what I was about to do. I first needed to do this for a side project of mine and
I *really* didn't want to compromise on my preference for hitting the authorization policies. Admittedly at
time I was very close to giving up and rethinking my approach however with a bit of perseverence I got there
in the end.

The principle is the same as with JWT authentication; we need to reconfigure `CookieAuthenticationOptions`
so we can set a custom cookie format which allows us to easily create a cookie in tests and have it
correctly handled by the API. As with my previous article, you can either continue reading or
[just skip to the sample](https://github.com/jasonmitchell/dotnet-testserver-auth).

First let's assume we have authorization services configured as follows:

```csharp
public static void AddAuthorizationServices(this IServiceCollection services, IConfiguration configuration)
{
    services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
            .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
            {
                options.Cookie.Name = "api-cookie";
                options.Cookie.MaxAge = TimeSpan.FromMinutes(15);

                options.Events.OnRedirectToLogin = context =>
                {
                    context.Response.StatusCode = 401;
                    return Task.CompletedTask;
                };
            });

    services.AddAuthorization(options =>
    {
        options.DefaultPolicy = new AuthorizationPolicyBuilder(CookieAuthenticationDefaults.AuthenticationScheme)
                                .RequireAuthenticatedUser()
                                .Build();

        options.AddPolicy("Admin", policy => policy.RequireClaim("role", "admin"));

    });
}
```

This configures cookie authentication, sets up a default authorization policy which requires an
authenticated user, and then adds an additional policy which requires the user to be in the `admin`
role.

We will use the same API which uses the admin policy from the previous post for this example. For reference
this API looks like:

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
a `401 Unauthorized` response. We need to reconfigure `CookieAuthenticationOptions` to use a custom
"ticket" format for our cookies. The format I chose to use would create a string of key-value pairs
from the identity claims and then base64 encode it but really the format you use can be anything that
encodes claims into a string. Here is my format:

```csharp
internal class TestCookieTicketFormat : ISecureDataFormat<AuthenticationTicket>
{
    public string Protect(AuthenticationTicket data)
    {
        var claims = data.Principal.Claims.Select(x => $"{x.Type}={x.Value}").ToArray();
        var claimsString = string.Join("&", claims);
        var ticketBytes = Encoding.UTF8.GetBytes(claimsString);

        return Convert.ToBase64String(ticketBytes);
    }

    public string Protect(AuthenticationTicket data, string? purpose) => this.Protect(data);

    public AuthenticationTicket? Unprotect(string? protectedText)
    {
        if (string.IsNullOrWhiteSpace(protectedText))
        {
            return null;
        }

        var ticketBytes = Convert.FromBase64String(protectedText);
        var claimsString = Encoding.UTF8.GetString(ticketBytes);
        var claims = claimsString.Split('&').Select(x =>
        {
            var claimParts = x.Split('=');
            return new Claim(claimParts[0], claimParts[1]);
        });

        var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        var authenticationTicket = new AuthenticationTicket(new ClaimsPrincipal(claimsIdentity), CookieAuthenticationDefaults.AuthenticationScheme);

        return authenticationTicket;
    }

    public AuthenticationTicket? Unprotect(string? protectedText, string? purpose) => this.Unprotect(protectedText);
}
```

With this format we can then do the necessary reconfiguration:

> The test server setup has been omitted for brevity. See the [sample](https://github.com/jasonmitchell/dotnet-testserver-auth)
> for a full working example.

```csharp
private static void ConfigureAuthenticationForTest(IServiceCollection services)
{
    // Remove the existing configuration from the API, we don't need that...
    services.RemoveAll<IPostConfigureOptions<CookieAuthenticationOptions>>();

    // Reconfigure CookieAuthenticationOptions to use a custom cookie format
    services.PostConfigure<CookieAuthenticationOptions>(CookieAuthenticationDefaults.AuthenticationScheme, options =>
    {
        options.CookieManager = new ChunkingCookieManager();
        options.TicketDataFormat = new TestCookieTicketFormat();

        options.Cookie.Name = "api-cookie";
        options.Events.OnRedirectToLogin = context =>
        {
            context.Response.StatusCode = 401;
            return Task.CompletedTask;
        };
    });
}
```

Here we set up a new `TicketDataFormat` by giving it an instance of our custom format and we also need
to set up the `CookieManager` for this to work correctly. It is important that we make sure we use the
same cookie name here as we do for the API. The framework will then be able to use this like our regular
cookie authentication and create a `ClaimsPrincipal` containing the `ClaimsIdentity` for our test "user"
represented by the JWT.

Now we can create a cookie from arbitrary claims in our tests using our custom format:

```csharp
private static CookieHeaderValue CreateCookie(string role)
{
    var claims = new List<Claim>
    {
        new("name", "Some User"), new("role", role)
    };

    var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
    var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);
    var authenticationTicket = new AuthenticationTicket(claimsPrincipal, CookieAuthenticationDefaults.AuthenticationScheme);

    var cookie = new TestCookieTicketFormat().Protect(authenticationTicket);
    return new CookieHeaderValue("api-cookie", cookie);
}
```

and use it in our tests to call the authenticated API endpoint:

```csharp
[Fact]
public async Task User_is_authenticated_by_test_cookie()
{
    var httpClient = await CreateTestClient();
    var cookie = CreateCookie("admin");

    var request = new HttpRequestMessage(HttpMethod.Get, "/people");
    request.Headers.Add("cookie", cookie.ToString());

    var response = await httpClient.SendAsync(request);
    Assert.Equal(HttpStatusCode.OK, response.StatusCode);
}
```

Now we can use cookies with the ASP.NET Core Test Server and make sure our API is properly handling
claims within the authorization policies we configured.

With this post and my [previous post](handling-jwt-authentication-with-aspnetcore-testserver/) about
JWT authentication in tests we have seen how we can use the Test Server without compromising on what
gets executed as part of these tests. I hope this is useful for someone and maybe this will save someone
else the headaches I experienced with this some day.
