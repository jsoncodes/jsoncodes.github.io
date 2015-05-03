---
author: jmitch18
comments: true
date: 2013-06-21 12:52:04+00:00
layout: post
slug: visual-studio-regions-make-me-cringe
title: Visual Studio Regions Make Me Cringe
wordpress_id: 723
tags:
- microsoft
- regions
- standards
- visual studio
---

The topic of Visual Studio regions feature is one that seems to create divided opinions from developers who work with the IDE on a regular basis.  If you can't guess my opinion from the title of this article, I personally totally and utterly hate seeing regions in code.

<!-- more -->

I never write regions in my own code and any time I open a file and see something like this:

![Regions](http://i1288.photobucket.com/albums/b495/jmitch181/regions_zps14c63d6d.png)

or this:

![Regions](http://i1288.photobucket.com/albums/b495/jmitch181/regions2_zpsefc5ba3e.png)

I feel like I die a little inside (obviously the examples above are just made up and a little pointless given that they are ~25 lines long).  If I need to work on a file I don't want to have to rummage through regions.  Sure I can use other file navigation features but perhaps I just want to quickly scan a file what then?  I need to expand them out first.  Not a massive deal since keyboard shortcuts exist for this but it's still an extra step.  And let's not forget about the extra clutterly lines we have in our file as a result of using regions.

When I rant about regions to a developer who loves them they laugh at me derisively for discarding their organisational nirvana in favour of scrolling endlessly and getting lost in code; I'm of the opinion that regions are essentially used to hide code.  **Why hide code? ** Is it ugly? Or simply too long?

Regardless of the reason, if you feel that you need to hide code in order to keep your code readable and clear then you have an actual problem; **one that isn't solved by hiding code away in regions**.

**The problem is only solved by consciously making an effort to write clear and readable code.**  File length is not really a metric that can be used to indicate bad code and you may find there are times when large files are necessary but these occasions should not be due to simply bundling a whole bunch of vaguely related code together.  When adding any code to a class you should always consider if it logically makes sense to add it there or whether it would be better suited to its own dedicated class.  Trying to adhere the [Single Responsibility Principle](http://en.wikipedia.org/wiki/Single_responsibility_principle) as much as possible should help alleviate these issues and contribute to making you a much happier developer!

**Recently I discovered a great Visual Studio plugin for those who hate regions.**  It's fittingly called "I Hate #Regions" and can be downloaded at [http://visualstudiogallery.msdn.microsoft.com/0ca60d35-1e02-43b7-bf59-ac7deb9afbca](http://visualstudiogallery.msdn.microsoft.com/0ca60d35-1e02-43b7-bf59-ac7deb9afbca).  This plugin will automatically expand regions when you open a file and make the #region directives less visible.

**However for those of you who are borderline insane** you might be interested to try "Regionizer" ([http://regionizer.codeplex.com/](http://regionizer.codeplex.com/)).  This "delightful" plugin will wrap your code in #regions and even alphabetize it for you.  Sweet...






