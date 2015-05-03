---
comments: true
date: 2012-01-23 12:00:47+00:00
layout: post
slug: quick-tip-fixing-incorrectly-sized-bounding-sphere-for-3ds-model-in-xna
title: 'Quick Tip: Fixing Incorrectly Sized Bounding Sphere for 3DS Model in XNA'
wordpress_id: 478
tags:
- 3D Graphics
- c#
- quick tip
- xna
---

Recently I've been spending a lot of time working on a 3D game engine using XNA and wanted to implement some model measuring functionality.  I noticed that my measurements weren't coming out quite right so with the help of the App Hub's [shape renderer sample](http://create.msdn.com/en-US/education/catalog/sample/shape_rendering) I was able to visualise the bounding sphere for the model and noticed it was significantly smaller than my model.  After some poking around and googling I discovered that **I needed to set the units in my install of 3DS Max to be centimeters** - once this was done and I exported my model again the bounding spheres were correctly sized and my model measurements were returning the correct results!
