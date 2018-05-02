---
comments: true
date: 2016-05-25 21:00
layout: post
title: Renaming Streams in Event Store
---

I have recently been working with [Event Store](http://geteventstore.com) (GES) on a project and had the need to rename some of my streams.  I performed this operation using the native projections built into GES which made it a fairly simple operation; I read all events within a given category of streams and then emitted these into a stream with the new name.

My streams all follow the format of `MyOldStreamCategory-00000000-0000-0000-0000-000000000000`.  The native projection was created as a one-time projection with emit enabled that looks like:

{% gist jasonmitchell/185a01a7613692cc0ff8a07dbc3cd726 stream_rename.js %}

Once the streams have been renamed they could be removed using the HTTP API which would require identifying all the original stream ids (complete with guids) before renaming.  However the existence of streams with the old names would not have any impact on our system so we opted to just leave them.
