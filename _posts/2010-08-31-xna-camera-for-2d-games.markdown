---
comments: true
date: 2010-08-31 13:30:00+00:00
layout: post
slug: xna-camera-for-2d-games
title: XNA camera for 2D games
wordpress_id: 177
tags:
- 2D Graphics
- c#
- sample
- xna
---

This is just a quick article to share a nice way to create a camera for 2D games.  There are a couple of ways to do this; I originally did it by making a class that held a position for the camera and then subtracting the object and camera positions when drawing to offset the sprites.  This turned out to be a problem prone approach and caused me a few issues in my Imagine Cup game.

<!-- more -->

I recently noticed that it was possible to pass a transform matrix into the spriteBatch.Begin method which allows for a much nicer and more flexible approach to creating a cameras effect for a 2D game.

Below is the code for my Camera class that can be used for 2D games:


    public class Camera
    {
        public Camera()
        {
            Position = Vector2.Zero;
            Zoom = 1f;
        }

        public Vector2 Position { get; set; }
        public float Rotation { get; set; }
        public float Zoom { get; set; }

        public Matrix TransformMatrix
        {
            get
            {
                return Matrix.CreateRotationZ(Rotation) * Matrix.CreateScale(Zoom) *
                       Matrix.CreateTranslation(Position.X, Position.Y, 0);
            }
        }
    }


This code is all pretty simple so I’m not going to explain much.  I would just like to highlight that for the rotation, we use the **Matrix.CreateRotationZ** function to create the camera rotation in 2D.

To use this class, all that needs to be done is create a new instance, perform your updates to the position, rotation and zoom then use the TransformMatrix property in the Begin method of your spriteBatch instance like so:


    spriteBatch.Begin(SpriteBlendMode.AlphaBlend, SpriteSortMode.Texture, SaveStateMode.None,
                       camera.TransformMatrix);
    spriteBatch.Draw(texture, Vector2.Zero, Color.White);
    spriteBatch.End();


And there it is!  A nice camera solution for 2D games and it should also work for Windows Phone 7!  And here is the [source](http://www.jason-mitchell.com/Uploads/MatrixTransformCamera.zip) and XNA 3.1 demo project.
