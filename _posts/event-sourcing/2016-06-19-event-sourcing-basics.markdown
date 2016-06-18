---
comments: true
date: 2016-06-19 00:00:00
layout: series-post
title: The Basics of Event Sourcing
series: event-sourcing
published: true
---

What is an event? (historical record of something that happened)

Events are stored in append-only streams

Cannot/should not remove events as they are part of the historical record (bank ledger correcting a mistake

Events are then replayed to reproduce the state of the system

CQRS

Example of write an event to GES

Example of reading a stream of events
