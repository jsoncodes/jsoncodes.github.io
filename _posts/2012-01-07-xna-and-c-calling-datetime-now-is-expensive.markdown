---
comments: true
date: 2012-01-07 20:39:29+00:00
layout: post
slug: xna-and-c-calling-datetime-now-is-expensive
title: 'XNA and C#: Calling DateTime.Now is Expensive'
wordpress_id: 429
tags:
- performance
- xna
---

While working on a new game engine using XNA I decided to run Visual Studios profiling tools against a basic demo game to measure CPU usage.  The results showed that the update process used approximately 65% of the CPU time while the render process used roughly 25%.  This ratio was not what I had expected at all because the updating was fairly simple so I drilled down into report to find the culprit.  It turns out the code using up the most of the CPU time in the update was a call to DateTime.Now to use as a time stamp.


<!-- more -->


First I want to provide a bit of context on how DateTime.Now is being called.  My game engine includes a messaging system so that objects can create and publish messages to the game so they can be consumed by subscribed objects.  Each message generates a time stamp for itself using DateTime.Now.  The demo game has been purposefully set up to create 800 objects each of which send out new messages every frame.




The following screenshots are from the profiler run with the DateTime.Now call still in the code.  This first image shows the CPU usage ratio between the full update and draw processes:


[![](http://jason-mitchell.com/wp-content/uploads/2012/01/Game.Run_Poor.png)](http://jason-mitchell.com/wp-content/uploads/2012/01/Game.Run_Poor.png)

The following image shows the call to the constructor containing the usage of DateTime.Now.  Note that the usage for the function calling this code (the blue box on the left) is 35.8%.

[![](http://jason-mitchell.com/wp-content/uploads/2012/01/AttributeChangedMessage.Ctor_Poor1.png)](http://jason-mitchell.com/wp-content/uploads/2012/01/AttributeChangedMessage.Ctor_Poor1.png)

Lastly, this image shows the CPU percentage used for the DateTime.Now call.

[![](http://jason-mitchell.com/wp-content/uploads/2012/01/Message.Ctor_Poor.png)](http://jason-mitchell.com/wp-content/uploads/2012/01/Message.Ctor_Poor.png)


I was really quite surprised to see how much CPU time the DateTime.Now call was using.  I then removed the call and ran the CPU profiler to see how the results changed.  The first image is of the Game.Run() call again showing the ratio between the update and draw methods.  Already it's clear that removing the DateTime.Now call has improved things since the CPU usage is split more evenly.




[![](http://jason-mitchell.com/wp-content/uploads/2012/01/Game.Run_.png)](http://jason-mitchell.com/wp-content/uploads/2012/01/Game.Run_.png)




The following image shows the call to the constructor which **used to** contain the call to DateTime.Now.  Notice that the usage for the code calling this function has dropped from 35.8% to 0.9% which is a massive change!




[![](http://jason-mitchell.com/wp-content/uploads/2012/01/AttributeChangedMessage.Ctor_Poor.png)](http://jason-mitchell.com/wp-content/uploads/2012/01/AttributeChangedMessage.Ctor_Poor.png)




Because the results of this performance test were so surprising I decided to do a bit of googling around the performance of DateTime.Now and it didn't take very long to find an article confirming that this call is expensive.  The article also states that using DateTime.UtcNow is much faster however I plan on staying away from using DateTime in my game engine.  You can read the article at [http://bit.ly/zTJaaT](http://bit.ly/zTJaaT).
