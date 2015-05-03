---
author: jmitch18
comments: true
date: 2013-03-02 13:08:26+00:00
layout: post
slug: t4-templates-to-generate-code-for-asp-net-mvc-actions
title: Using T4 Templates to Remove String References to ASP.NET MVC Actions
wordpress_id: 605
categories:
- Web Development
tags:
- ASP.NET MVC
- Code Generation
- T4
---

Ever since I started working with ASP.NET MVC there has been one thing that has bugged me a little bit; needing to reference my strongly-typed Controllers and Action methods by their string names.  It's not a major problem for me but last night I decided to have a go at solving the problem for a project I'm currently working on.  There are the obvious simple solutions such as manually creating string constants or HtmlHelper and UrlHelper extension methods.  In the past I have used the extension method approach but frankly it's a real pain to maintain going forward with updating names, removing methods, adding new methods etc.  In my opinion developers shouldn't have to worry themselves with this kind of work when we can leave it up to the IDE (Visual Studio 2012 in this case) to do this monotonous work for us.

Thanks to Visual Studio tooling and C# language features such as reflection and extension methods I have created a basic solution that **_suffices for my project._**_  _Note emphasised text; there is a possibility this solution may not meet your needs.  I am not trying to create a comprehensive copy-and-paste solution for this article, just sharing my work so far.

<!-- more -->

The basic concept behind my solution is to use reflection to inspect my controllers, grab their methods and generate HtmlHelper and UrlHelper extension methods for each action.    I'm not really going to deep-dive into T4 templates or reflection, just putting this content online.  For anyone who hasn't used T4 before and wants to try this template, you can add a new Text Template file using Visual Studios "Add New Item" dialog.  It will create a nested file under the .tt which gets updated when you save a valid template.


## The T4 Template


[gist file="ActionExtensions.tt"]https://gist.github.com/jasonmitchell/5070743[/gist]


## What it does


This code gets an array of the Types in the Controllers namespace of my main assembly.  It then gets all the public instance methods defined within this class and uses a LINQ expression to project the MethodInfo objects into a format that is more useful for me.  At the minute it _explicitly ignores _methods (for now) marked with the HttpPostAttribute; the only reason for this is to let me focus on solving the basic problem first before working on a more comprehensive solution.  The template will also respect the use of the ActionNameAttribute so the extension methods will actually point to the correct place.

It then creates several HtmlHelper and UrlHelper overloads for each action.  These overloads allow us to optionally pass through parameters such as route values and html attributes.


## What it does NOT do


As mention above the template does not yet handle actions decorated with the HttpPostAttribute.  It also does not create extension methods for BeginForm in HtmlHelper.  It also does not account for strongly typed action parameters.  I'm sure there are lots more things that this template doesn't do.


## What's next?





	
  * Creating BeginForm extension methods and allowing post actions

	
  * Adding extension method with strongly typed action parameters

	
  * Automatically outputting string constants of controller and action names for flexibility

	
  * Better naming convention for generated code ("<ControllerName><ActionName>ActionLink" is ugly)

	
  * Template to generate javascript file defining relative action URLs

	
  * Anything else?


