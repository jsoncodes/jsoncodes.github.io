---
comments: true
date: 2014-03-09 15:07
layout: post
title: Binding and formatting dates using Knockout and Moment JS
series: "ASP.NET MVC and KnockoutJS"
---

This article is the fourth in a series of working with KnockoutJS and ASP.NET MVC. This article is not strictly about
using KnockoutJS with ASP.NET MVC but will show how to create a simple custom binding handler to bind and format date
values to HTML elements using Moment JS. As usual, this article will build on the code from the previous articles in
the series:

* [Getting Started with ASP.NET MVC and KnockoutJS](/blog/getting-started-with-aspnet-mvc-and-knockoutjs/)
* [Creating a KnockoutJS Model From an ASP.NET MVC Model](/blog/creating-knockoutjs-model-from-aspnet-mvc-model/)
* [Loading a KnockoutJS model from and ASP.NET MVC controller using ajax](/blog/loading-knockoutjs-model-from-aspnet-mvc-using-ajax/)

Note a sample project for this series of articles will be available [on Github](https://github.com/jasonmitchell/aspnetmvc-knockoutjs-quickstart)

## The code
There isn’t a lot of code to this article; this sample is mostly based on the dynamic model loading sample from
[a previous article](/blog/creating-knockoutjs-model-from-aspnet-mvc-model/). This sample makes use of the custom
binding functionality in KnockoutJS which I’m not going to go through step by step. If you want to understand custom
bindings and how they work I suggest reading the documentation on the [Knockout website](http://knockoutjs.com/documentation/custom-bindings.html).
First up is the custom Knockout binding:

{% gist jasonmitchell/9260569 knockout.bindings.date.js %}

The important parts to notice here are lines 8 and 12 where the code will determine the date format to use (using
[MomentJS’ formats](http://momentjs.com/docs/#/displaying/format/)) and then parse the input string using MomentJS. Next
is a simple view which uses the date binding:

{% gist jasonmitchell/9260569 DateFormatting.cshtml %}

On line 18 I then use the new date binding and specify the date format and the custom binding does it’s work to spit
out a date in the DD MMM YYYY format. As I mentioned above this isn’t strictly an article about using KnockoutJS and
ASP.NET MVC together however I have found it to be very useful. Doing this kind of work on the client-side means that
you don’t have to format the date as a string on the server­side and your model can simply return a DateTime object.
