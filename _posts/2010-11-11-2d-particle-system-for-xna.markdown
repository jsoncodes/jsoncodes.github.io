---
author: jmitch18
comments: true
date: 2010-11-11 14:54:51+00:00
layout: post
slug: 2d-particle-system-for-xna
title: 2D Particle System for XNA
wordpress_id: 202
categories:
- Game Development
tags:
- 2D Graphics
- c#
- sample
- xna
---

Basically since I got into [XNA](http://create.msdn.com) (about 3 years ago) I have been tinkering with particle systems for games.  Using a particle system has allows game developers to create really nice, complicated looking effects without too much effort.  Personally I find them pretty mesmerising and often found that with each new effect I create, I could sit back and watch it run for about 10 minutes.

I’ve made quite a few iterations of my particle system but eventually managed to settle on one that I felt had pretty decent performance and was fairly flexible allowing for the creation of a range of effects with the one system.  A couple of months ago I decided to publish this to [CodePlex](http://www.codeplex.com/) and can be downloaded [here](http://microstar.codeplex.com/).

<!-- more -->

The following video demonstrates some effects I created using my particle system:








Particle System Demonstration







If you are interested in seeing this particle system being used in an actual game, check out the [video](http://www.youtube.com/watch?v=c3wdQyuyfHc) of my [Imagine Cup](http://imaginecup.com/) 2009 game on YouTube.  In this video, the two different bubble effects at the start were created using this particle system.  It was also used to create the trail behind the player and a slight particle effect in the background which isn’t really visible in the video.

In my system, a particle effect revolves primarily around three main concepts; emitters, forces and modifiers.

An emitter will emit particles in a set pattern at a particular location and also maintain a Queue of free particles for use in effects removing the need to iterate over the entire particle list to find dead particles to re-initialize.  If you have downloaded the code (or browsed the [source code](http://microstar.codeplex.com/SourceControl/changeset/view/58504)) you can see that not only have I created a default emitter which initializes particles at a single location, but I have also created emitters which allow me to emit particles in a circle or rectangle pattern.

A force is responsible for the behaviour particles as they are emitted and don’t really need much explanation, a brief look at the code should suffice.  I have defined two forces; Randomize and Directional.  The Randomize force will emit particles at random speeds and directions whilst the Directional force will emit particles at a constant speed along the defined Vector2.

In my opinion, the most interesting aspect of my particle system is the modifiers component.  A modifier is some predefined code that is executed for each and every particle in the effect on every update.  I’m sure there are probably some performance considerations here that I haven’t addressed in the code but I have been able to achieve reasonably high particle counts on my PC with a realistic number of modifiers active.  These modifiers are what make my particle system flexible and allow it to achieve such a range of effects.  Any time I found myself requiring a new behaviour for particles, I programmed a new behaviour.

I don’t want to describe all of the modifiers here since that could take a bit of time, but the following list identifies some of my favourite modifiers:



	
  * **AlphaAgeTransform** – This will fade a particle in/out based on it’s “age” _(Practically all my effects use this)_

	
  * **ColorAgeTransform** – Transitions between two sets of RGB values based on a particles “age”

	
  * **DirectionalPull** – Modifies the velocity of the particle to pull it in a certain direction (nice when combined with Randomize force)

	
  * **GravityPoint** – Sets a point in 2D space to pull particles towards.  It provides some control by allowing users to define pull strength and area of effect radius


At the core of any effect is the Particle and ParticleEffect classes which, for the most part, are pretty boring and the kind of code you would expect.  The XML documentation comments in the code should mostly explain what’s going on in these classes but I want to highlight the ParticleEffect’s ability to save and load effects to and from XML files.  Basically every class (except for Particle) is flagged as Serializable and I have provided a Save and static Load method in the ParticleEffect class.  I created the Save method simply to let me easily create the XML for effects rather than trying to remember the markup myself and I’ve always had the intention to create a particle effect editor tool and remove this method from the code but haven’t found the time to do this yet.

Ideally I would prefer to save the particle effects to a custom file format that contained the image files for particles as well as the XML definition and provide a custom content processor that would initialize the effect.  This would make it easier to share effects between projects as with the current setup, you need to copy the XML definition, the images and then possibly modify the definition to point to a new relative path for the images *yuck*.  Life is full of things I would like to do…

To use the particle effect there are four steps:

	
  1. Initialize the effect (from file or programmatically)

	
  2. Emit particles

	
  3. Update effect

	
  4. Draw effect


The Samples project that is bundled with the source code, demonstrates how to load and display a particle effect and since it’s pretty simple I’m not going to write about that process here.

I’m happy for anyone to take this project and use it for free or tear it apart or whatever people do with things these days.  I would ask that if you do use it that you let me know and send me links to some videos that I can put up to show people what it can do.  Or if you make a particularly cool component that could be added or you want to assist with the project, I would be happy to add you as a developer on the project.
_**See [http://jason-mitchell.com/game-development/supernova-particle-system-for-monogame/](http://jason-mitchell.com/game-development/supernova-particle-system-for-monogame/) for a newer version which has been updated to use MonoGame.**_
