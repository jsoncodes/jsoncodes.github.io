---
comments: true
date: 2016-06-21 00:00:00
layout: post
title: Versioning Events
series: event-sourcing
published: false
---

Sometimes things change - the events themselves may change over time because software never stands still

We need to respect the old events that happened, they are still things which had consequences within the system

It's important that replay of events is NEVER broken

Some changes may be fine and we can use sensible default values or we remove a serialized property which is no longer necessary in the domain

Many event changes are not so simple and require a new version.  A new version of an event is nothing more than just another event defined in the system - there does not need to be any real relationship between versions
