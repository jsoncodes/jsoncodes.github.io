---
author: jmitch18
comments: true
date: 2013-04-06 15:35:03+00:00
layout: post
slug: use-of-spcontext-current-in-sharepoint-code
title: Use of SPContext.Current in SharePoint Code
wordpress_id: 561
categories:
- Web Development
tags:
- sharepoint
---

First off, there's nothing wrong with using SPContext.Current; this article is about using it correctly and structuring your code to work with it in a flexible way.

I worked on a fairly long running SharePoint project which liberally used SPContext.Current to access the SPWeb instance everywhere; it popped up not only in WebPart code but also _**business logic classes**_.  It's perfectly acceptable to use SPContext.Current in your WebPart code-behind files because the context will be available in these places, however problems arise when your business logic classes make use of this singleton under the assumption that they will only ever be used in WebParts.  The moment you want to use these business logic classes anywhere else (think event receivers) things fall apart and you get exceptions when the code is called.

<!-- more -->


### Imagine this scenario...


We create a new simple event receiver and in the interest of remaining [DRY](http://en.wikipedia.org/wiki/Don't_repeat_yourself) we decide to reuse our existing business logic classes to do some stuff (said classes use SPContext.Current liberally).  We finish writing our code and give ourselves a pat on the back for a job well done.  Confident that our use of mature and established code will pretty much guarantee that the event receiver will work with minimum problems we deploy it only to find that it doesn't work.


### The problem...


In an event receiver SPContext.Current will always be null and rightly so, the expectation in this case is that you should access the SPWeb object using the SPItemEventProperties object.  Therefore any of our established business logic methods used in the event receiver will fail since we cannot get the static context.


### The real problem...


In my opinion the real problem here is lack of a flexible code structure; in the scenario the developer tried to be good and write reusable code but it wasn't written flexibly.  By embedding calls to SPContext.Current we are always forcing that method to run under the current site context.  As mentioned above our event receiver failed because of this but it also limits what we can do with the code even when it is used from a WebPart and SPContext.Current is not null.  Perhaps we want to use one of our methods in a block of code running with elevated privileges?  This could potentially give funny results as our business method will not be using the elevated SPWeb object that we probably want it to use.


### The solution...


Solving this is pretty straightforward.  All we have to do is pass in the SPWeb object as a parameter to the methods that need it and remove our embedded calls to SPContext.Current, this way we give control of the context to the caller and remove that responsibility from the business class.

Is this more verbose?  Yes.  Is this more typing for developers?  Definitely.  Is this a more flexible way to implement business logic in SharePoint? Absolutely!
