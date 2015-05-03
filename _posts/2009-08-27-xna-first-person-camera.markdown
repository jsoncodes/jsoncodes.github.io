---
author: jmitch18
comments: true
date: 2009-08-27 21:01:42+00:00
layout: post
slug: xna-first-person-camera
title: XNA First Person Camera
wordpress_id: 75
categories:
- Game Development
tags:
- 3D Graphics
- c#
- sample
- xna
---

As I previously mentioned, I plan on updating this blog with my experience of learning 3D XNA and hopefully be able to help out others doing the same as well as receive a bit of feedback and advice on how to improve the work I have done.  The first section I began working on was the camera for the game.  Since my game is being planned for the Xbox Live Indie Games, the tutorial below is intended to work with the Xbox 360 game pad although with a little modification it should be possible to use it on the PC.

<!-- more -->

The current view and field of vision are defined in two matrices; the **View matrix** and the **Projection matrix**.

In order to define the the **View matrix** we need 3 Vector3 objects; one for the position of the camera, one for the target the camera is pointing at and a vector defining which way is up for the camera. We don't need to worry about what goes on to define the **View matrix** as the Matrix class in XNA provides a method called** CreateLookAt** which accepts the position, target and up vectors as parameters and returns the view matrix.

    
    Matrix viewMatrix = Matrix.CreateLookAt(position, target, upVector);


To create the **Projection matrix**, we need to know the angle of the field of view in radians, the aspect ratio of the screen, the near plane distance and the far plane distance. The near and far planes dictate the planes to draw between, everything outside of these planes will not be rendered. It is worth remembering that setting a very low near plane and a very large far plane may negatively impact your games performance if there is a lot going on. As with the View matrix, we do not need to worry too much about the details about how the **Projection matrix** is created as XNA again provides a useful method for this:

    
    projectionMatrix= Matrix.CreatePerspectiveFieldOfView(MathHelper.PiOver4, GraphicsDevice.Viewport.AspectRatio, 1, 400);


For my game, I decided to make a base** camera** class which handles all this for me so I don't need to worry about it again.  The code for this class is very straight forward and simply handles the basic camera functionality.

Camera.cs

    
    using Microsoft.Xna.Framework;
    
    namespace Cameras
    {
        public class Camera : GameComponent
        {
            public Vector3 position;
            public Vector3 target;
            public Vector3 upVector;
    
            public Matrix viewMatrix;
            public Matrix projectionMatrix;
            public float fieldOfView = MathHelper.PiOver4;
            public float nearPlaneDistance = 1f;
            public float farPlaneDistance = 500f;
    
            public Camera(Game game, Vector3 position, Vector3 target, Vector3 upVector)
                : base(game)
            {
                this.position = position;
                this.target = target;
                this.upVector = upVector;
            }
    
            public override void Initialize()
            {
                UpdateViewMatrix();
                float aspectRatio = Game.GraphicsDevice.Viewport.AspectRatio;
                projectionMatrix= Matrix.CreatePerspectiveFieldOfView(fieldOfView, aspectRatio, nearPlaneDistance, farPlaneDistance);
    
                base.Initialize();
            }
    
            protected void UpdateViewMatrix()
            {
                viewMatrix = Matrix.CreateLookAt(position, target, upVector);
            }
        }
    }


For this class, I have made all it's variables public for the purposes of this article so the code is much shorter.  I would strongly recommend encapsulating these variables if you are using it in any of your projects.

All this class does is allow us to point the camera in one direction and does not have any built in functionality for movement so that is our next step.  So far, I've always found myself wanting to be able to move around and get a better look at what I'm currently working on, so for that reason my next step was to create a **first person camera**.  This was a bit trickier, however with a bit of playing around I was eventually able to get it working!  Following is the code for the class and then I will explain it a bit afterwards.

FirstPersonCamera.cs

    
    using Microsoft.Xna.Framework;
    
    namespace Cameras
    {
        public class FirstPersonCamera : Camera
        {
            public Vector3 cameraReference;
    
            public float leftRightRot;
            public float upDownRot;
    
            public float rotationSpeed = 0.05f;
            public float translationSpeed = 1f;
    
            public FirstPersonCamera(Game game, Vector3 position, Vector3 target, Vector3 upVector)
                : base(game, position, target, upVector)
            {
                cameraReference = target;
            }
    
            public void Update(Vector3 translation, float leftRightRot, float upDownRot)
            {
                this.leftRightRot += leftRightRot * rotationSpeed;
                this.upDownRot += upDownRot * rotationSpeed;
                Matrix rotationMatrix = Matrix.CreateRotationX(this.upDownRot) * Matrix.CreateRotationY(this.leftRightRot);
                Vector3 transformedReference = Vector3.Transform(cameraReference, rotationMatrix);
                position += Vector3.Transform(translation, rotationMatrix) * translationSpeed;
                target = transformedReference + position;
    
                UpdateViewMatrix();
            }
        }
    }


**_UPDATE:_** Tony Peng pointed out in the comments that rotating too far would reverse the controls.  Please see his solution in the comments section below.

Possibly the most important part of this is the **cameraReference** variable.  This holds the **original target vector** we set up for our camera and is used for calculating our resulting camera target after rotation.  This was the part that was catching me out for a little while!  The** leftRightRot** and **upDownRot** variables keep track of how far we have moved from the **original target** and are also used in calculating our** rotated camera target**.

I created a new** Update** method that accepts the **translation** (ie the amout to move the camera by),** left-right rotation** and **up-down rotation** as parameters.  My next step was to add this onto my** rotation variables and create the rotation matrix**.  The purpose for adding the rotations to my class variables rather than just assigning them, is so that the** camera rotation will persist** even after, for example, the thumbstick has been released and is at it default position.  If we were to just assign the rotations to the variables, The camera would have limited movement in the desired direction and then reset to the centre once the thumbstick has been released.

Now that I have the **rotation matrix**, I can use this, along with the **cameraReference** the calculate the **rotated camera target**.  All that is left to do is to** calculate the rotated translation**, **add it to the camera position** and set the** new camera target by adding our transformedReference to the camera position**.  Finally we called the **UpdateViewMatrix** method from the Camera class to generate our new view matrix.

It is worth noting that if you are rotating in any possible combination of the x, y and z axis, you may encounter an issue known as [Gimbal Lock](http://en.wikipedia.org/wiki/Gimbal_lock).  I have read that this can be solved by using** Quaternions** for the rotations but I have yet to look into this too much.  If anyone has any useful information about how to do this please let me know!

Lastly we will need a way to test our camera out so here is a small class I used for my testing; I'm not going to explain it as it's all fairly straight forward!

Game1.cs

    
    using Microsoft.Xna.Framework;
    using Microsoft.Xna.Framework.Graphics;
    using Microsoft.Xna.Framework.Input;
    
    namespace Cameras
    {
        public class Game1 : Microsoft.Xna.Framework.Game
        {
            private GraphicsDeviceManager graphics;
    
            private FirstPersonCamera camera;
            private VertexPositionColor[] verts;
    
            public Game1()
            {
                graphics = new GraphicsDeviceManager(this);
                Content.RootDirectory = "Content";
            }
    
            protected override void Initialize()
            {
                camera = new FirstPersonCamera(this, new Vector3(0, 0, 20), Vector3.Forward, Vector3.Up);
                Components.Add(camera);
    
                base.Initialize();
            }
    
            protected override void LoadContent()
            {
                verts = new VertexPositionColor[4];
                verts[0] = new VertexPositionColor(new Vector3(-3, -3, 0), Color.Red);
                verts[1] = new VertexPositionColor(new Vector3(3, -3, 0), Color.Green);
                verts[2] = new VertexPositionColor(new Vector3(-3, 3, 0), Color.Blue);
                verts[3] = new VertexPositionColor(new Vector3(3, 3, 0), Color.Yellow);
            }
    
            protected override void UnloadContent()
            {
    
            }
    
            protected override void Update(GameTime gameTime)
            {
                GamePadState gamepadState = GamePad.GetState(PlayerIndex.One);
    
                if (gamepadState.Buttons.Back == ButtonState.Pressed)
                    this.Exit();
    
                Vector3 translation = new Vector3(gamepadState.ThumbSticks.Left.X, 0, -gamepadState.ThumbSticks.Left.Y);
                camera.Update(translation, -gamepadState.ThumbSticks.Right.X, gamepadState.ThumbSticks.Right.Y);
    
                base.Update(gameTime);
            }
    
            protected override void Draw(GameTime gameTime)
            {
                GraphicsDevice.Clear(Color.CornflowerBlue);
                GraphicsDevice.RenderState.CullMode = CullMode.None;
    
                GraphicsDevice.VertexDeclaration = new VertexDeclaration(GraphicsDevice, VertexPositionColor.VertexElements);
    
                BasicEffect effect = new BasicEffect(GraphicsDevice, null);
                effect.World = Matrix.Identity;
                effect.View = camera.viewMatrix;
                effect.Projection = camera.projectionMatrix;
    
                effect.VertexColorEnabled = true;
    
                effect.Begin();
                foreach (EffectPass pass in effect.CurrentTechnique.Passes)
                {
                    pass.Begin();
                    GraphicsDevice.DrawUserPrimitives(PrimitiveType.TriangleStrip, verts, 0, 2);
                    pass.End();
                }
                effect.End();
    
                base.Draw(gameTime);
            }
        }
    }
