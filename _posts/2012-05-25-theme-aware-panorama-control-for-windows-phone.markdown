---
author: jmitch18
comments: true
date: 2012-05-25 16:58:57+00:00
layout: post
slug: theme-aware-panorama-control-for-windows-phone
title: Theme Aware Panorama Control for Windows Phone
wordpress_id: 526
tags:
- c#
- silverlight
- windows phone
- wp
---

For the Windows Phone app that I've been working on recently I want to make sure that it has good support for both the light and dark themes on Windows Phone.  This is pretty easy to achieve in most places by binding styles to the built-in resources but I found myself needing to change the background image of a panorama control.

<!-- more -->

A quick search found [this article](http://blog.jayway.com/2010/12/16/theme-aware-panorama-background-in-windows-phone-7/) which uses the ViewModel to determine the background image to be used.  I don't feel like this is the right place to implement this as it is really something that should be accomplished through XAML along with the rest of the UI.  What I decided to do was extend the Panorama control with my own ThemeAwarePanorama control.

First I set up a basic UIHelper class to help me determine if the light theme is active:

{% gist jasonmitchell/4462646 UIHelper.cs %}

Next I added a new class to my project called ThemeAwarePanorama:

{% gist jasonmitchell/4462646 ThemeAwarePanorama.cs %}

All that was left then was to create this control in my XAML:

{% gist jasonmitchell/4462646 SamplePage.xaml %}

And now my background image will switch based on my phone's theme.  Better yet is that this also works in Expression Blend so I can easily toggle the theme within it and preview the styles without needing to start up the emulator.
