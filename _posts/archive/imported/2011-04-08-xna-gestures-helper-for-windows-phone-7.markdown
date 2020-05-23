---
comments: true
date: 2011-04-08 13:15:41+00:00
layout: post
slug: xna-gestures-helper-for-windows-phone-7
title: XNA Gestures Helper for Windows Phone 7
wordpress_id: 285
tags:
- c#
- nui
- sample
- touch
- windows phone
- xna
---

For my final year project at university I’ve been doing a bit of work with Windows Phone 7 and naturally that has involved working with gestures a bit.  I think the gesture support in [XNA](http://create.msdn.com) 4 is great but I found myself writing the same code over and over again to handle them.  So I decided to make a GestureHelper class which would take care of a lot of the repetitive work for me.  I’ve attached a sample project containing my gesture helper and a couple of examples of using it.

<!-- more -->

The class I created is basically an XNA game component which maintains a dictionary of gestures and an associated list of delegates and provides some obvious methods to add and remove gesture callbacks.  The Update method will take care of reading in the gestures from the touch screen and then calling the delegates for any gesture detected.  The code is listed below:


    using System;
    using System.Collections.Generic;
    using Microsoft.Xna.Framework;
    using Microsoft.Xna.Framework.Input.Touch;

    namespace GestureHelperTest
    {
        public class GestureHelper : GameComponent
        {
            public static GestureHelper Instance { get; private set; }

            public static void Initialize(Game game)
            {
                if (Instance != null)
                    throw new InvalidOperationException("Only one instance of GestureHelper can be created.");

                Instance = new GestureHelper(game);
                game.Components.Add(Instance);
            }

            private Dictionary<GestureType, List<Action<GestureSample>>> gestureCallbacks;

            private GestureHelper(Game game) : base(game)
            {
                TouchPanel.EnabledGestures = GestureType.None;
                gestureCallbacks = new Dictionary<GestureType, List<Action<GestureSample>>>();
            }

            public void AddCallback(GestureType gestureType, Action<GestureSample> callback)
            {
                if (!gestureCallbacks.ContainsKey(gestureType))
                {
                    TouchPanel.EnabledGestures |= gestureType;
                    gestureCallbacks.Add(gestureType, new List<Action<GestureSample>>());
                }

                gestureCallbacks[gestureType].Add(callback);
            }

            public void Clear()
            {
                TouchPanel.EnabledGestures = GestureType.None;
                gestureCallbacks.Clear();
            }

            public void ClearGesture(GestureType gestureType)
            {
                TouchPanel.EnabledGestures -= gestureType;
                gestureCallbacks.Remove(gestureType);
            }

            public override void Update(GameTime gameTime)
            {
                while (TouchPanel.IsGestureAvailable)
                {
                    GestureSample gestureSample = TouchPanel.ReadGesture();

                    if (gestureCallbacks.ContainsKey(gestureSample.GestureType))
                    {
                        foreach (Action<GestureSample> callback in gestureCallbacks[gestureSample.GestureType])
                            callback(gestureSample);
                    }
                }

                base.Update(gameTime);
            }
        }
    }


The class is basically implemented as a singleton but with a little bit of a deviation.  I’ve opted to not allow lazy initialization of the class in favour of requiring the user to explicitly initialize it to keep it nice and clean when creating the game component.  Adding the GestureHelper to the components list could be done in the game class but it will basically amount to the same thing (ie requiring the user to perform some initialization step).

In the sample project I’ve created, I provide the following examples of how to handle a gesture with my GestureHelper class:


    protected override void Initialize()
    {
        GestureHelper.Initialize(this);
        GestureHelper.Instance.AddCallback(GestureType.FreeDrag, gestureSample => position = gestureSample.Position);
        GestureHelper.Instance.AddCallback(GestureType.Hold, gestureSample => scale = 1);
        GestureHelper.Instance.AddCallback(GestureType.Tap, ScaleSquare);

        base.Initialize();
    }

    private void ScaleSquare(GestureSample gestureSample)
    {
        scale += 0.1f;
    }


The first two examples pass lambda expressions to the AddCallback method and the third passes a method.  Once these delegates have been added that’s it!  No more code is needed to handle these gestures!

This class is the result of a bit of experimentation that has been working out well for me.  I’d really appreciate any opinions that others might have on this approach to handling gestures.

_**Sample Project: [/uploads/GestureHelperTest-08_04_11.zip](/uploads/GestureHelperTest-08_04_11.zip)**_
