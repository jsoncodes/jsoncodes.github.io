---
comments: true
date: 2013-03-02 17:09:02+00:00
layout: post
slug: force-asp-net-mvc4-urls-to-lowercase
title: Force ASP.NET MVC 4 URLs To Lowercase
wordpress_id: 622
tags:
- ASP.NET MVC
---

This afternoon while working on an ASP.NET MVC 4 project I wanted to look into a way to force all of my route URLs to be lowercase.  After a quick bit of searching online I found that .NET 4.5 introduces a new property to the RouteCollection class which forces all URLs to lower case.  Find out more at: [http://msdn.microsoft.com/en-us/library/system.web.routing.routecollection.lowercaseurls.aspx](http://msdn.microsoft.com/en-us/library/system.web.routing.routecollection.lowercaseurls.aspx)
