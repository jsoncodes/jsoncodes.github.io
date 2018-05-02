---
comments: true
date: 2013-09-19 22:59
layout: post
title: Getting started with ASP.NET MVC and KnockoutJS
series: "ASP.NET MVC and KnockoutJS"
---

This is the first article in what will hopefully be a series on using KnockoutJS with ASP.NET MVC and is intended
to demonstrate techniques for combining the two technologies in your work.

This article starts off the series by looking at a simple method of populating a KnockoutJS view model with content
from a C# model in a MVC project.

_**Note a sample project for this series of articles will be available [on Github](https://github.com/jasonmitchell/aspnetmvc-knockoutjs-quickstart)**_

## The code
To get started **we need a simple C# model**. For this example I’ve created a Person model which looks like this:

{% gist jasonmitchell/6608081 Person.cs %}

As you can see there’s nothing special about this class. We will also need a simple controller to create this model
and create the view.

{% gist jasonmitchell/6608081 SampleController.cs %}

Next up we will need a KnockoutJS view model which, for this example, will simply mirror the properties of the C# model.
This **view model will accept the data as JSON** and will use it to initialize the Knockout observables.

{% gist jasonmitchell/6608081 SimpleModelLoading.js %}

We now want to convert our C# model to JSON in order to pass it in to the Knockout view model. We could use the built in
Json.Encode() method for this but I like to use JSON.NET as it gives me greater control over the resulting JSON. For
example I like my JSON property names to be camel cased starting with a lowercase letter rather than the Pascal casing
typically used for C# properties; JSON.NET allows me to do this and I have created an extension method to make this simpler
to use in my views:

{% gist jasonmitchell/6608081 ObjectExtensions.cs %}

Lastly we need to set up a view which will create and bind the view model to our HTML. The code below shows an example
of this, it assumes that a layout file exists which references the KnockoutJS file and defines a “scripts” section.

{% gist jasonmitchell/6608081 SimpleModelLoading.cshtml %}

This file should be mostly straightforward to anyone familiar with KnockoutJS. The most important section of this
view is line 8 which creates the view model. Here I have used my ToJson extension method (see above) to serialize my
C# model and I use **Html.Raw() to ensure that the raw output is passed into my KnockoutJS view model** instead of a string
representation. And that’s all there is to implementing a really simple KnockoutJS view model which is populated by
data in a C# model.

## What's next?
In the next part I will be creating a simple example of how to create a view model dynamically on the client side based
on a C# model.
