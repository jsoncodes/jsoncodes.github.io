---
comments: true
date: 2011-06-28 15:10:55+00:00
layout: post
slug: basic-xna-and-kinect-sdk-sample
title: Basic XNA and Kinect SDK Sample
wordpress_id: 357
tags:
- c#
- kinect
- sample
- xna
---

This past week I have spent a little bit of time playing with the Kinect SDK and trying to get to grips with how it all works.  My biggest interest is to use the Kinect SDK along with Microsoft’s XNA Framework for games development so I made a sample project using these technologies.  I’ve posted a link to this project at the end of the article.

<!-- more -->

The idea of this project was pretty simple.  I wanted to get the RGB camera stream of me goofing around and use it as the background in an XNA application.  I also wanted to try out some skeleton tracking functionality to test when my hands are intersecting with hot spots (represented as semi-transparent squares) on the screen.  As it turns out, this project was pretty simple and quick to make and overall I’m really quite impressed with how the SDK is to use.

This project makes use of a couple of [simple extension methods I created](http://jason-mitchell.com/2011/06/27/kinect-sdk-extension-methods/) and is fairly heavily based on the samples which get installed with the Kinect SDK.

**_Download: [http://jason-mitchell.com/Uploads/XNA_And_Kinect-28_06_11.zip](http://jason-mitchell.com/Uploads/XNA_And_Kinect-28_06_11.zip)_**
