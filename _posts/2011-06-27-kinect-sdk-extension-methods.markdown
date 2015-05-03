---
author: jmitch18
comments: true
date: 2011-06-27 17:02:33+00:00
layout: post
slug: kinect-sdk-extension-methods
title: Kinect SDK Extension Methods
wordpress_id: 340
categories:
- Game Development
tags:
- c#
- extension method
- kinect
- natural user interface
- nui
- xna
---

In this article I’m sharing a couple of quick extension methods I made for working with the Kinect SDK Beta.  I was experimenting with using the Kinect sensor in an XNA project and found myself wanting to do two things; convert the output from the RGB stream to a Texture2D and to get the position of a joint from the sensors skeleton tracking functionality relative to the game screen dimensions.

<!-- more -->

The following code shows the implementation of these extension methods.  I must add that this code is pretty much taken straight out of the samples and that I have just reorganised it to make it a bit easier to use.

    
    public static class KinectExtensions
    {
        private static Texture2D texture = null;
        private static Color[] colorData = null;
    
        public static Texture2D ToTexture2D(this PlanarImage image, GraphicsDevice graphicsDevice)
        {
            if(texture == null || colorData == null)
            {
                texture = 
                    new Texture2D(graphicsDevice, image.Width, image.Height, false, SurfaceFormat.Color);
                colorData = new Color[image.Width * image.Height];
            }
    
            int index = 0;
            for (int y = 0; y < image.Height; y++)
            {
                for (int x = 0; x < image.Width; x++, index += image.BytesPerPixel)
                    colorData[y * image.Width + x] = 
                        new Color(image.Bits[index + 2], image.Bits[index + 1], image.Bits[index + 0]);
            }
    
            texture.SetData(colorData);
            return texture;
        }
    
        public static Vector2 GetScreenPosition(this Joint joint, Runtime kinectRuntime, int screenWidth, int screenHeight)
        {
            float depthX;
            float depthY;
    
            kinectRuntime.SkeletonEngine.SkeletonToDepthImage(joint.Position, out depthX, out depthY);
            depthX = Math.Max(0, Math.Min(depthX * 320, 320));  //convert to 320, 240 space
            depthY = Math.Max(0, Math.Min(depthY * 240, 240));  //convert to 320, 240 space
    
            int colorX;
            int colorY;
            // only ImageResolution.Resolution640x480 is supported at this point
            kinectRuntime.NuiCamera.GetColorPixelCoordinatesFromDepthPixel(ImageResolution.Resolution640x480, new ImageViewArea(), (int)depthX, (int)depthY, (short)0, out colorX, out colorY);
    
            // map back to skeleton.Width & skeleton.Height
            return new Vector2(screenWidth * colorX / 640.0f, screenHeight * colorY / 480f);
        }
    }}
