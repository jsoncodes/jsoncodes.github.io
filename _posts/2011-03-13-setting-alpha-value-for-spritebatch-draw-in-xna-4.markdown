---
author: jmitch18
comments: true
date: 2011-03-13 13:45:00+00:00
layout: post
slug: setting-alpha-value-for-spritebatch-draw-in-xna-4
title: Setting Alpha Value for SpriteBatch.Draw in XNA 4
wordpress_id: 270
categories:
- Game Development
tags:
- 2D Graphics
- c#
- sample
- xna
---

A few weeks ago I spent some time upgrading my [MicroStar Particle System](http://microstar.codeplex.com/) from [XNA](http://create.msdn.com) 3.1 to XNA 4.  For the most part this process went smoothly; there were quite a few changes to be made all over the place.  However once I had cleared up all the build errors and ran the sample project I saw that my code for fading out particles when drawing them via my SpriteBatch instance was obviously not working.

<!-- more -->

I immediately set about trying to hunt down the offending piece of code but came up blank; there was nothing that I had changed that should have killed that functionality.  After spending some time rummaging through the source code I felt sure that it was caused by some breaking change in XNA between versions 3.1 and 4.0.  As it turns out, this assumption was correct.

In XNA 3.1 all that was needed to be done to fade a texture out in a SpriteBatch draw call was to enable alpha blending (now enabled by default in XNA 4.0) and set the “A” property of your Color object appropriately like so:

    
    Color myColor = Color.White;
    myColor.A = 50;
    spriteBatch.Draw(texture, position, sourceRect, myColor, ...... );


Now it seems that changing the alpha value on a Color instance to be used with SpriteBatch doesn’t make a difference.  What we now must do in XNA 4.0 is to define the alpha separately to the colour as a float with a value between 0 and 1.  Then the selected colour must then be multiplied by this float to set the transparency:

    
    spriteBatch.Draw(texture, position, sourceRect, Color.White * 0.5f, .......);


This line of code will draw the texture at half transparency.

At first I found this really confusing and I longed for the old approach from XNA 3.1 but over time I’ve come to prefer the new XNA 4.0 approach that requires me to define my alpha separately to the colour.  This also neatly resolves some conflicts between colour modifiers in my particle system (they could have been resolved anyway but it wouldn’t have been as nice).
