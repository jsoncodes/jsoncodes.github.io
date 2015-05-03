---
author: jmitch18
comments: true
date: 2009-08-30 11:50:00+00:00
layout: post
slug: silverlight-3-rotating-video-player
title: Silverlight 3 Rotating Video Player
wordpress_id: 93
categories:
- Software Development
post_format:
- Aside
tags:
- silverlight
---

Yesterday I wrote an article about creating a rotating video player using [Silverlight](http://www.silverlight.net) 3 (see [here](http://www.jason-mitchell.com/index.php/2009/08/29/silverlight-3-fun-3d-projection-and-element-binding/)) and I admit that there was an awful lot of text in it, so here is a list of numbered steps for you to follow with less of the rambling in between steps.


<!-- more -->



	
  1. 


Create a new Silverlight 3 + website project (obviously) in Blend 3


	
  2. 


Create 3 rows in the default grid layout


	
  3. 


Add MediaElement control to top row


	
  4. 


Add Slider control to middle row


	
  5. 


Add two Button controls to bottom row


	
  6. 


Set Slider maximum value to 360


	
  7. 


Set MediaElement source to your video



	
    * 


Embedded in project or…


	
    * 


web address





	
  8. 


Select Slider control, open Common Properties pane, right click Value textbox, select Data Binding


	
  9. 


Select Element Property tab, click MediaElement control from left-hand list


	
  10. 


Check “Use custom path expression” box and enter Projection.RotationY into the textbox


	
  11. 


Expand Data Binding window and select TwoWay from the Binding Direction radio buttons


	
  12. 


Select MediaElement, open Transform pane and make sure the X centre of rotation is 0.5 and Y is 1


	
  13. 


Run application and you should be able to turn the video using the slider


	
  14. 


Create a new storyboard called Down


	
  15. 


Move to 1.5 seconds on timeline and set X value of Projection of the MediaElement to –90


	
  16. 


Click the key frame on the time line to open the Easing pane


	
  17. 


Select Bounce Out from drop down list


	
  18. 


Select a Button control and open it’s event pane (small icon in the top left with a lightning bolt)


	
  19. 


Enter FallDown into the Click text box and press enter


	
  20. 


Type “Down.Begin();” in the new method


	
  21. 


Run application and click the button to make the video fall over


	
  22. 


Create a new storyboard called Up


	
  23. 


Move to 1.5 second on timeline and set X value of Projection of the MediaElement to 0



	
    * 


If this is already 0, click the Add New Key Frame button on the timeline





	
  24. 


Add a Bounce Out easing effect


	
  25. 


Select the second Button control and create a click event for it and enter “Up.Begin();” into the new method





And there you have it!  25 steps to create a useless and impractical video player, at least I hope its only 25!
