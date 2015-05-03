---
author: jmitch18
comments: true
date: 2009-08-29 16:34:36+00:00
layout: post
slug: silverlight-3-fun-3d-projection-and-element-binding
title: 'Silverlight 3 Fun: 3D Projection and Element Binding'
wordpress_id: 89
categories:
- Software Development
tags:
- sample
- silverlight
---

Yesterday at work, there was a talk about [Silverlight](http://www.silverlight.net) 3 about its capabilities and the improvements over Silverlight 2 (in particular element binding which impressed me).  The talk featured demonstrations of existing applications and some step by step “how to" tutorials in which I saw how to rotate controls in 3D space and a cool [Twitter](http://www.twitter.com) reader which was made surprisingly quickly; albeit with some ready prepared code.  It had been a while since I had played with Silverlight and this talk inspired me to go home and have a play about.  In this article I am going to outline the steps taken to create this video player but check out [this article](http://www.jason-mitchell.com/index.php/2009/08/30/silverlight-3-rotating-video-player/) for step-by-step instructions to create this video player.


<!-- more -->


To make this application, I used **Expression Blend 3** although since Silverlight is based on [XAML](http://en.wikipedia.org/wiki/XAML), it is entirely possible to do this just from Visual Studio.  Personally, I don’t really like writing XAML unless I really have to and prefer to use the automatically generated code from Expression Blend.




The first step in creating this application was to give the default **grid layout three rows**, one for the video, one for the slider and one for the up and down buttons.  For this example, this step isn’t all [![blendControlsDialog](http://www.jason-mitchell.com/images/blog/Silverlight3Fun3DProjectionandElementBin_D20F/blendControlsDialog_thumb.jpg)](http://www.jason-mitchell.com/images/blog/Silverlight3Fun3DProjectionandElementBin_D20F/blendControlsDialog.jpg)that important but I did it anyway! The layout for this application is very straightforward to create; we need to add a** MediaElement control** to the top row, a** Slider control** to the second row finally **two Button controls** to the bottom row.  If you don’t know where to find the **MediaElement **and **Slider** controls, you can search for them in the **assets dialog box** which is shown in the image to the right.  Once you have added the** Slider** to your application, you can change the **minimum and maximum values in the Common Properties pane**.  I set mine to go from** 0 to 360 so the Slider will spin the MediaElement around fully**.  You will also want to set the** media source for the MediaElement** control, you can embed a video in the project and reference it in the Source box, however this will create a very large XAP package that will take some time to download.  To solve this you can specify a web address to use as your video source which is what I have done.




Next, we want to link the value of my **Slider** control, to the **Projection.RotationY** property to rotate the video around the **Y-axis**.  This is really simple to do , in Blend if you select the **Slider control**, open the **Common Properties** pane,** right click on Value** and select **Data Binding** you will see a new dialog box on the screen allowing to create a new data binding.  We want to bind the** Slider** value to the property of another element in the application so select the **Element Property** tab at the top of this window.  You should now see two lists, one that displays the elements in your application and another that displays the element properties.  Select your **MediaElement** control from the list on the left (I called mine** mediaElement**).  Unfortunately we can’t select the **RotationY** property from the second list so we need to check the box below the lists that say** “Use a custom path expression” and enter Projection.RotationY**.  We need to set the **binding direction** option to TwoWay, so click the arrow below the custom expression box and select TwoWay then click ok.  To make the **MediaElement** rotate about it’s centre, we need to change it’s** centre of rotation in the Transform pane**; make sure that the **value of X is 0.5** (the range goes from 0 to 1).   Now if you build and run the application you should be able to rotate the video using the Slider.




Now we need to make the buttons make the** MediaElement** fall down and come back up again.  First step is to make another change to it’s **centre of rotation**, so if we open the Transform pane again and **set it’s Y value to 1** to indicate that we want it to rotate on the X-axis around the bottom of the element.  In order to create the animations we need to use **Storyboards**, you can create a new storyboard by clicking the “+” in the** Objects and Timeline pane**.  Name your storyboard “Down”, we will use this to to make the** MediaElement** rotate and make it look like it fell over.  Once you create your** storyboard**, the timeline should automatically open; **move the yellow marker** to 1.5 seconds and with the **MediaElement selected**, go to the **Transform pane and set the value of X under Projection to –90**.  Now click play on the timeline and you should see the MediaElement “fall “ down….but it doesn’t look very realistic!!  To make this animation look a bit better, we can use something called** Easing**, a feature new to Silverlight 3. Click on the key frame in the timeline and the** Easing pane** should open up (by default this appears on the right hand side of the screen).  The** Easing pane** contains a drop down list with all the different types of easing, you should definitely have a play about with these and see their effects.  For my example, I chose **Bounce Out **to make it look as if the** MediaElement** has actually hit something that’s stopping it falling further.  Click play on the timeline and see what happens!


We now need to **tell our application when to play this animation**.  So select the button you want to use to make the video fall and open the** events pane** (little icon in the top right of the window with a lightning bolt on it).  In the **Click box, type MoveDown and press enter (**oh look Blend 3 has a built-in code editor), this will automatically hook up the event and create the method to handle it.  In your method type in “Down.Begin();” this will tell the storyboard to begin playing.

Creating the **Up animation** is similar to the Down animation.  Create a new storyboard and call it Up, then in the timeline move the yellow marker to 1.5 seconds and this time click the Record Keyframe button.  You MediaElement should already be displayed in the up-right position so we don’t need to change any properties.  If it isn’t upright, then set the X value for Projection in the Transform pane to 0.  Follow the same steps to add an Easing effect to this animation.  I used a Bounce Out effect again and set it’s bounces to 1 and bounciness to 23.  Don’t forget to set the event to your Up button!

Boy that was a lot of waffling, thinking back I should have maybe just made a numbered list of steps; maybe I will do that later!
