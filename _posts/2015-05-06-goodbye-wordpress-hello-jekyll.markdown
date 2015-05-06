---
comments: true
date: 2015-05-06 17:24
layout: post
title: Goodbye Wordpress, hello Jekyll!
---

Ever since I started blogging back in 2009 I've always run it on Wordpress.  I always found Wordpress to be okay but was never
fully satisifed with it.  It felt a bit like overkill for what I needed and the writing experience was forever frustrating me.
Recently I decided to look into alternatives that would be much lighter weight and simpler to manage than Wordpress; I settled
on [Jekyll](http://jekyllrb.com).

Jekyll is a static website generator that converts your content from [Markdown](http://daringfireball.net/projects/markdown/)
and [Liquid](http://daringfireball.net/projects/markdown/) templates into HTML files.  As an added bonus [GitHub Pages](https://pages.github.com/)
can compile Jekyll sites from a GitHub repository ([see mine](https://github.com/jasonmitchell/jasonmitchell.github.io)) when
changes are pushed into the repository allowing me to ditch my Wordpress server (which I never backed up) in the future when
I am completely finished with it.

The process of migrating from Wordpress was _reasonably_ painless.  I used a tool called [Exitwp](https://github.com/thomasf/exitwp)
to convert an XML export of my Wordpress content into Markdown files.  While this certainly helped with the migration process, I
found that the generated Markdown wasn't valid in a few cases and required me to go through and manually fix the content. However
after I finished correcting my content I found that there is an [official website](http://import.jekyllrb.com) listing a range of
importers that may have produced better results

Overall I'm happy with the decision to move to Jekyll and I'm looking forward to blogging more often.