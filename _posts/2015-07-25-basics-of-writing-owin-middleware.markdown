---
comments: true
date: 2015-07-25 22:59
layout: post
title: The Basics of Writing OWIN Middleware
---

OWIN (Open Web Interface for .NET) is an open source initiative to define the specification of an interface between
.NET web applications and servers; it aims to enable web applications to become decoupled from IIS by removing the
dependency on the System.Web assembly.  With OWIN, you can write "middleware" to hook into the request pipeline which
is what this article will be focusing on.

## What are middlewares?

In the context of OWIN, middlewares are components which are registered on application startup and run on every
request.  Middlewares can handle requests and write to the response stream before deciding whether or not to
pass the request along to the next middleware.  OWIN middlewares are not just some niche concept that will disappear -
its use is becoming more widespread with ASP.NET Web API, SignalR and NancyFX all providing middleware components.  At
present there is no middleware for running the current version of ASP.NET MVC due to the heavy dependency on System.Web
however that will change with the release of ASP.NET 5.

## What does custom OWIN middleware look like?

There are several ways to write OWIN middleware but in this article I'm only going to look at the option which I feel
is most accessible to developers interested in writing non-trivial middleware components.  There are other approaches,
each with their own advantages but these would be the topic of a different article.

The approach I have used is to create a sub-class of `OwinMiddleware` which is defined in the `Microsoft.Owin` NuGet
package.  In the basic structure below there are two things to note:
1. The constructor which takes the reference to the next middleware in the pipeline
2. The `Invoke` method which takes a parameter of type `IOwinContext`

{% gist jasonmitchell/d02d2b4f9216e62c92d7 BasicMiddleware.cs %}

In the `Invoke` method I have invoked the next middleware in the pipeline which will progress the request through to the
next stage.  If my middleware did not do this then the request would not progress beyond it; this is useful when writing
components which should handle the incoming request and prevent any further processing of it.

The following example demonstrates handling requests to a specific URL (in this case `/my-middleware-url`) and returning
a serialised `DateTime` object.  In the `Invoke` method I access the request details via the `IOwinContext` instance and
check if the request URL is one my middleware is interested in handling.  If it isn't then it simply invokes the next
piece of middleware otherwise it writes the current date to the response stream (which is also accessed via the `IOwinContext`
instance).

{% gist jasonmitchell/d02d2b4f9216e62c92d7 BasicMiddleware.impl.cs %}

Although this example only checks the request URL before deciding whether or not to handle it, we can easily extend the
handling conditions beyond this.  The `Request` property of `IOwinContext` exposes everything we would expect such as
HTTP method and the request body.

## How do I use middleware?

Hooking middleware into your web application is very simple.  The first thing your application will need is an OWIN
`Startup` class; if this is not already present in your project you can easily add one using the context menu option
in Visual Studio.  Once you have this you simply register your middleware against the `IAppBuilder` instance which is
passed into your `Startup` class.

{% gist jasonmitchell/d02d2b4f9216e62c92d7 Startup.Basic.cs %}

At this point it is possible to pass additional dependencies into the constructor of your middleware by passing them
as parameters to the `Use` method.

If you have used other OWIN middleware before such as ASP.NET Web API you may be familiar with registration approaches
such as `app.UseWebApi()`; this is easily achieved by creating an extension method for `IAppBuilder`.

{% gist jasonmitchell/d02d2b4f9216e62c92d7 BasicMiddlewareAppBuilderExtensions.cs %}

This would then allow you to register this middleware by calling `app.UseBasicMiddleware();`.