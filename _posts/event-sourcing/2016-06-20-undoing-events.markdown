---
comments: true
date: 2016-06-20 00:00:00
layout: post
title: Undoing Events
series: event-sourcing
published: false
---

Reminder that streams are append only so we can't actually be remove old events

Issue compensating events to undo the event (like a banking ledger)

Both events will have always happened in the eyes the event store
