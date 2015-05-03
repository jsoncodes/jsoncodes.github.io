---
comments: true
date: 2009-08-30 16:06:02+00:00
layout: post
slug: xna-3d-terrain
title: XNA 3D Terrain
wordpress_id: 99
tags:
- 3D Graphics
- c#
- debugging
- xna
---

Having created my own [first person camera](http://www.jason-mitchell.com/index.php/2009/08/27/xna-first-person-camera/), I moved on to creating some 3D terrain for my game.  I have to admit, I cheated on this a bit and just used the custom content pipeline from the [XNA Creators Club](http://creators.xna.com)’s generated geometry sample found [here](http://http://creators.xna.com/en-GB/sample/generatedgeometry).  For this reason, I currently do not fully understand the process of creating terrain from a height map despite despite understanding the basic theory behind it.  For this reason I can’t really provide a guide as to how to code it yourself at the minute but I will hopefully be able to do this in the future.


<!-- more -->


The sample from the creators club website isn’t without it’s flaws; it’s a great way to easily get terrain in your game however it does hard code the name of the height map and it’s texture in the processor itself.  This doesn’t provide much flexibility at all and isn’t an ideal solution.  I will be looking into whether or not it is possible to pass in extra details to the processor (ie the height map file) which would provide a much nicer solution.  I also want to remove the texturing from the processor and do this via an [HLSL](http://en.wikipedia.org/wiki/HLSL) effects file and provide multi [texture splatting](http://en.wikipedia.org/wiki/Texture_splatting) functionality.  If anyone knows a good resource for information on this please feel free to leave a comment.




Despite using a ready made processor for loading my terrain, my experience with getting this working wasn’t so simple due to some [XNA](http://en.wikipedia.org/wiki/Microsoft_XNA) functionality that seems relatively undocumented and doesn’t seem to come up in 3D tutorials.  When setting up my terrain, I was completely unaware that my use of a SpriteBatch object to draw some debug text to the screen would modify the GraphicsDevice render states and not reset them.  This resulted in the errors seen in the two following images:




[![renderError](http://www.jason-mitchell.com/images/blog/XNA3DTerrain_E030/renderError_thumb.jpg)](http://www.jason-mitchell.com/images/blog/XNA3DTerrain_E030/renderError.jpg) [![textureStretch](http://www.jason-mitchell.com/images/blog/XNA3DTerrain_E030/textureStretch_thumb.jpg)](http://www.jason-mitchell.com/images/blog/XNA3DTerrain_E030/textureStretch.jpg)




The image on the left was caused by the SpriteBatch object disabling the depth buffer on the GraphicsDevice.  This will allow parts of the scene in the background to appear to be drawn in front of larger foreground sections.  The problem on the right was caused by the SpriteBatch object changing the UV coordinates for the texture sampler.  To fix this, I simply added the following code just before rendering my terrain:











    GraphicsDevice.RenderState.DepthBufferEnable = true;
    GraphicsDevice.SamplerStates[0].AddressU = TextureAddressMode.Wrap;
    GraphicsDevice.SamplerStates[0].AddressV = TextureAddressMode.Wrap;










For more information on the effects a SpriteBatch object will have on your render states, [check out this article](http://blogs.msdn.com/shawnhar/archive/2006/11/13/spritebatch-and-renderstates.aspx) by Shawn Hargreaves.

After figuring all that out thanks to help of the community on the XNA Creators Club website, I got my terrain working quite well and looking relatively nice:

[![terrain](http://www.jason-mitchell.com/images/blog/XNA3DTerrain_E030/terrain_thumb.jpg)](http://www.jason-mitchell.com/images/blog/XNA3DTerrain_E030/terrain.jpg)
