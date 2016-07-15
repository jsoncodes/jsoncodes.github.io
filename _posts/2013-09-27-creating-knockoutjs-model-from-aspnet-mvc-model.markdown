---
comments: true
date: 2013-09-27 17:26
layout: series-post
title: Creating a KnockoutJS model from an ASP.NET MVC model
series: "ASP.NET MVC and KnockoutJS"
---

This article will demonstrate how to dynamically create a KnockoutJS view model from a C# model in an ASP.NET MVC
project and will build on the code from the previous article Getting Started With ASP.NET MVC and KnockoutJS.

_**Note a sample project for this series of articles will be available [on Github](https://github.com/jasonmitchell/aspnetmvc-knockoutjs-quickstart)**_

## The problem
In the previous article I showed how to load and populate an existing KnockoutJS view model which mirrored the
properties of a C# model. There is an obvious problem relating to maintainability here; when the **C# model changes
we need to manually update the KnockoutJS view model**. Fortunately there is a solution!

## The solution
To deal with this problem we can use **the [Knockout Mapping plugin](http://knockoutjs.com/documentation/plugins-mapping.html)
which provides functionality to map JSON to KnockoutJS observables**; you can either get it from the Knockout website
or through [NuGet](http://www.nuget.org/packages/Knockout.Mapping/).

If we simply want to map JSON to observables we can just use the mapping functionality of the plugin and use
the return value directly as a view model. The example below demonstrates this usage:

{% gist jasonmitchell/6727372 DynamicModelLoading.cshtml %}

_Note the use of the ToJson() extension method from [my previous article](/blog/getting-started-with-aspnet-mvc-and-knockoutjs/)._

While this approach works to create a simple model, it is more likely that you will want to have a more complex view
model which defines functions and calculated observables. To accomplish this we simply need to create a typical KnockoutJS
view model and use the mapping plugin within it:

{% gist jasonmitchell/6727372 DynamicModelLoading.js %}

Here we give the “fromJS()” function three parameters:

* **The data**: the JSON to be used to generate the observable variables
* **The mapping configuration**: used to customise the mapping process (beyond the scope of this series but
[the documentation](http://knockoutjs.com/documentation/plugins-mapping.html) may be useful)
* **The update target**: the object to create observables in


In the example above **the data is the C# model serialized as JSON** and **the update target is the “self” variable which
references the view model object** itself. This view model also defines a simple function which constructs and displays
the Persons full name which can be bound to in the view. This view model can then be created and applied to the view:

{% gist jasonmitchell/6727372 DynamicModelLoadingWithClientSideFunctions.cshtml %}

## What's next?
In the next article I will be creating a sample to show how to asynchronously load and update a dynamically created view
model from the server using ajax.
