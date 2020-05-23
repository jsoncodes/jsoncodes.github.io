---
comments: true
date: 2013-12-15 11:47
layout: post
title: Loading a KnockoutJS model from and ASP.NET MVC controller using ajax
series: "ASP.NET MVC and KnockoutJS"
---

This article will demonstrate how to load a KnockoutJS view model from a C# controller using ajax in an ASP.NET MVC
project and will build on the code from the previous articles in the series:

* [Getting Started with ASP.NET MVC and KnockoutJS](/blog/getting-started-with-aspnet-mvc-and-knockoutjs/)
* [Creating a KnockoutJS Model From an ASP.NET MVC Model](/blog/creating-knockoutjs-model-from-aspnet-mvc-model/)

Note a sample project for this series of articles will be available [on Github](https://github.com/jasonmitchell/aspnetmvc-knockoutjs-quickstart)

## The code
I’m just going to jump straight into the code for this sample. To get started we need to create a new action in
the controller. For the purposes of this sample this action will return a randomly populated Person object (see
the previous articles for the definition) so that we can see the content changing. Here is the action:

{% gist jasonmitchell/7858340 SampleController.cs %}

This action creates the Person object and then detects if the HTTP request was made using ajax. If it was then
it serializes the model as JSON and if it is a standard HTTP request it returns the view. This is a handy technique
for implementing a simple refresh of data in the view without retrieving all the HTML from the server again.

On line 9 you can see that I have not used the standard ASP.NET JSON serializer. Instead I went with my own ActionResult
which makes use of JSON.NET to give myself more control over the generated JSON. For reference the code for my JsonNetResult
class is below:

{% gist jasonmitchell/7858340 JsonNetResult.cs %}

Next we need to create the KnockoutJS view model to bind to the view. This is going to make use of the KnockoutJS Mapping
plugin I used in my [previous article](/blog/creating-knockoutjs-model-from-aspnet-mvc-model/) to generate the view model
properties from the JSON returned from the action.

{% gist jasonmitchell/7858340 AjaxModelLoading.js %}

This view model defines a function which will be used to handle a click event from the view in order to refresh the data.
It also does some basic state management to determine if the content has been loaded or is in the process of loading. I
have put in a short delay between the click in the view and executing the ajax request in order to make the loading state
management more apparent for the sample.

Lastly we need to create the view. This is pretty much the same thing that I used for the
[previous article](/blog/getting-started-with-aspnet-mvc-and-knockoutjs/) with the addition of a simple loading indicator
and a link which is bound to the view models “getRandomModel” function.

{% gist jasonmitchell/7858340 AjaxModelLoading.cshtml %}

And that’s all there is to it. Please leave a comment if you have any questions.

## What's next?

Next up in the series is creating a custom Knockout date binding which makes use of [Moment.js](http://momentjs.com/).
