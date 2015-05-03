---
author: jmitch18
comments: true
date: 2009-09-27 13:47:17+00:00
layout: post
slug: wordpress-stats-plug-in-not-counting
title: Wordpress Stats Plug-in Not Counting
wordpress_id: 111
post_format:
- Aside
tags:
- plugins
- wordpress
---

I have various Wordpress plug-ins installed for my blog but my favourite has got to be the Wordpress Stats plug-in.  I like to be able to keep an eye on the amount of traffic my blog gets and in particular what the most popular articles are.  At the minute, it seems to be [my article on a first person camera](http://www.jason-mitchell.com/index.php/2009/08/27/xna-first-person-camera/) in [XNA](http://en.wikipedia.org/wiki/Microsoft_XNA) and [my article about iPhone development](http://www.jason-mitchell.com/index.php/2009/04/07/iphone-application-development/).  However, for the past month or so the plug-in hasn't been counting visits at all.  Which was a little annoying, I figured that I was either hugely unpopular or there was something up with the plug-in.  Not wanting to resign to the possible truth that no one cares what I have to say, I did a little bit of searching for people having similar problems.  it wasn't difficult to turn up some results, but the answer came from the [plug-in's FAQ page on Wordpress Extend](http://wordpress.org/extend/plugins/stats/faq/) as I had hoped for.  Basically this plug-in depends on the wp_footer PHP function being called in your theme.  Turns out, my current theme didn't call this.  All that I needed to do was add <?php wp_footer(); ?> just before the </body> tag and the plug-in began counting stats straight away.  Easy fix!
