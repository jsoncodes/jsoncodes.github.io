---
author: jmitch18
comments: true
date: 2013-01-13 22:01:06+00:00
layout: post
slug: datepicker-for-c-xaml-windows-store-apps
title: Date Picker for C# & XAML Windows Store Apps
wordpress_id: 584
categories:
- Software Development
tags:
- c#
- windows 8
- xaml
---

I found myself needing a date picker in the C# and XAML Windows Store app that I'm currently working on.  To my disappointment I found this control was available in the default controls for HTML and JS apps but not XAML.   I love XAML because it's immensely powerful and flexible and I love being able to use it to develop apps for Windows 8 but the lack of equality in terms of availability of commonly required controls frustrates the crap out of me.


#### _**Update:** I've set up my own NuGet package for this control so I can ensure it's kept it up to date with the latest build.  You can find it at: [https://nuget.org/packages/WinRT-DatePicker/](https://nuget.org/packages/WinRT-DatePicker/)_


<!-- more -->

This isn't a problem of just differences between project types but there are some core controls missing in all of them; for example the calendar control is missing from both XAML and HTML projects (although I imagine any number of existing JS libraries for calendars should work in HTML apps).  There are some great tools out there to help developers fill in the missing pieces like Telerik's [RadControls for Windows 8](http://www.telerik.com/products/windows-8/overview.aspx) and ComponentOne's [Studio for WinJS/WinRT XAML](http://www.componentone.com/SuperProducts/Windows8/) but frankly the pricing of such toolkits for an independent developer borderlines on absurd.

Luckily there are some awesome open source projects such as the [WinRT XAML Toolkit](http://winrtxamltoolkit.codeplex.com/) out there to help fill in the pieces while we wait to see if Microsoft will ever give us these tools out of the box.  Unfortunately the WinRT XAML Toolkit doesn't yet provide a date picker control so I created a simple one to fit my needs and put it on GitHub at [https://github.com/jasonmitchell/WinRT-XAML-DatePicker](https://github.com/jasonmitchell/WinRT-XAML-DatePicker).  It doesn't cover every possible scenario but it should fit basic needs.  Hopefully it helps someone out there.
