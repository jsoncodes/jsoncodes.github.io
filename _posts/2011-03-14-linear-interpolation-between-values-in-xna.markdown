---
author: jmitch18
comments: true
date: 2011-03-14 12:38:29+00:00
layout: post
slug: linear-interpolation-between-values-in-xna
title: Linear Interpolation Between Values in XNA
wordpress_id: 273
categories:
- Game Development
tags:
- c#
- sample
- xna
---

I thought that I would take some time to write up a quick article about using linear interpolation to smoothly transition between two values in XNA.  When I first found out how to do this it made a huge difference to the projects I work on.  Some examples of when I use this are for time based colour cycling and gradually modifying alpha values to fade out a texture over a defined period.  In general, I find that it is a simple method of adding some extra polish to any game.

<!-- more -->

Performing linear interpolation between two values is incredibly simple thanks to the MathHelper.Lerp method provided by the XNA Framework.  The method signature is:

    
    float MathHelper.Lerp(float value1, float value2, float amount)


The parameters **_value1_** and **_value2_** are the two values we want to interpolate between.  The **_amount_** parameter is a value between 0 and 1 which determines the result of the interpolation between the two input values.  The closer the **_amount_** value is to 0, the closer the result will be to **_value1 _**and the closer the **_amount_** value is to 1, the closer the result will be to **_value2_**.

As I said above, I typically use this for time based interpolation so I’m going to do a quick example of that but you can calculate the value of the _**amount** _parameter any way you want.  What the following demo application will do is simply interpolate the colour used for the GraphicsDevice.Clear method between red and green over a period of 5 seconds.

You will find the code for the application below and then I will briefly highlight some of the key areas.  I won’t be including a download with this article since the following class is literally all there is to it; not counting Program.cs.  I’ve also trimmed away all of the excess methods that I’m not using for this example.

    
    public class Game1 : Game
    {
        private GraphicsDeviceManager graphics;
    
        private const int Duration = 5000;
        private Color backgroundColor = Color.Red;
        private float elapsedTime;
    
        public Game1()
        {
            graphics = new GraphicsDeviceManager(this);
        }
    
        protected override void Update(GameTime gameTime)
        {
            elapsedTime += (float) gameTime.ElapsedGameTime.TotalMilliseconds;
            float amount = MathHelper.Clamp(elapsedTime / Duration, 0, 1);
    
            byte value = (byte) MathHelper.Lerp(255, 0, amount);
    
            backgroundColor.R = value;
            backgroundColor.G = (byte) (255 - value);
        }
    
        protected override void Draw(GameTime gameTime)
        {
            GraphicsDevice.Clear(backgroundColor);
        }
    }


The first thing to note is my variable definitions at the top of the class.  The **_Duration_** constant defines how long the interpolation will last for in _milliseconds, **backgroundColor**_ is simply a variable to hold the current colour values and the **_elapsedTime_** variable is used to track how much time has passed in the interpolation.

First I’m going to skip over the Update method and point out that all the Draw method is doing is using the **_backgroundColor_** variable to clear the screen.  The colour values in this instance will be modified in the Update method to give us a smooth change from red to green.

In the Update method, the first thing I’m doing is to add the elapsed time for the current game frame to the **_elapsedTime_** variable.  The next line will calculate the value of the **_amount_** parameter required for the MathHelper.Lerp method.  This is pretty simple as all that needs to be done is to divide the total time that has passed by our defined duration.  I also use the MathHelper.Clamp method on this line to ensure that the value is always between 0 and 1 otherwise the interpolation will seem to loop.

The next step is to use the MathHelper.Lerp method to perform the interpolation so all that is needed here is to fill in the parameters.  In my example I’m essentially interpolating the value of the red channel and using this to calculate the amount of green rather than doing two separate interpolations.  To do this I defined **_value1_** as 255, **_value2_** as 0 and passed in my variable containing my calculated **_amount_** value and then cast the result to a byte.

The last step is to simply use the resulting values to set the colours which is pretty straightforward so I won’t explain it here.
