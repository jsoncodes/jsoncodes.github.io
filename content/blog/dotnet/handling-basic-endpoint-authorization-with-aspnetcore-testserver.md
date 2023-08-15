---
subject: .NET
title: Handling Basic Endpoint Authorization with ASP.NET Core TestServer
date: '2023-08-15T21:15:00.000Z'
tags:
  - testing
  - .net
coverImage: ./handling-basic-endpoint-authorization-with-aspnetcore-testserver.jpg
coverImageCredit: Dim Hou on Unsplash
coverImageCreditUrl: https://unsplash.com/photos/BjD3KhnTIkg
---

My recent articles on [JWT](../handling-jwt-authentication-with-aspnetcore-testserver/) and
[Cookie](../handling-cookie-authentication-with-aspnetcore-testserver/) authentication reminded me of a problem I
wanted to solve when testing authentication and authorization with the ASP.NET Core Test Server.
I really like to write unit tests which hit my API running in test server and I like to verify
my authorization policies as part of that. I found myself writing tests which looked like
`My_new_endpoint_requires_authorization` and repeating this many time.

I eventually got fed up copying, pasting, and editing these tests (a process which I also
felt a bit uncomfortable with). I decided to have a play with the ASP.NET Test Server again and
see what I could do to have a single test which verifies this API wide and this is what I came up
with:

> The test server and API setup has been omitted to keep this short. See the [sample](https://github.com/jasonmitchell/dotnet-testserver-auth)

```csharp
[Fact]
public async Task Endpoints_require_authorization()
{
    // Some public routes we want to exclude from the check
    var publicRoutes = new []
    {
        "/health"
    };

    // However you want to create your test server...
    var server = await HttpTestServerFixture.CreateTestServer();

    // Let's get all the endpoints we have configured in the API
    var endpointDataSources = server.Services.GetServices<EndpointDataSource>();
    var endpoints = endpointDataSources.SelectMany(x => x.Endpoints);

    foreach (var endpoint in endpoints)
    {
        // Now check each endpoint to see if it should be authorized
        var routeEndpoint = (RouteEndpoint)endpoint;
        var route = routeEndpoint.RoutePattern.RawText!;

        // The RequireAuthorization() simply adds AuthorizeAttribute to the endpoint metadata
        var authorizeAttribute = routeEndpoint.Metadata.OfType<AuthorizeAttribute>().FirstOrDefault();

        if (publicRoutes.Contains(route.ToLowerInvariant()))
        {
            // Route is expected to be public
            Assert.Null(authorizeAttribute);
        }
        else
        {
            // Route is expected to require authorization
            Assert.NotNull(authorizeAttribute);
        }
    }
}
```

We can have this test in a single place and verify that all our endpoints at a bare minimum have
authorization required. We will still want to add tests which verify specific authorization policies
are applied but this test allows me to comfortably skip adding tests for my default authorization
policy for each endpoint.