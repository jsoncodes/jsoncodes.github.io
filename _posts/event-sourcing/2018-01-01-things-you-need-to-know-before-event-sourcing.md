---
comments: true
date: 2016-08-30 00:00:00
layout: post
title: Things You Need to Know Before Event Sourcing
series: Things You Need to Know Before Event Sourcing
series_post_title: Introduction
---

Event sourcing is a popular topic these days with a lot of information and talks available describing many of the concepts behind it but I've found that information about applying event sourcing in practice is harder to come by.  This series is aimed at providing a practical guide (including some .NET code samples) of things you need to know before building an event sourced application.

I am going to assume some knowledge of the theory of event sourcing though I will provide a quick introduction to the core concepts.

## Topics Covered

The list of topics I plan to cover includes:

- Basics of event sourcing
- Introduction to [Event Store](http://geteventstore.com)
- Event sourcing and Domain Driven Design
- Projections and read models
- Event versioning
- Event Store operations

## Event Stores

When it comes to event stores there are a few choices:

- [EventStore](http://geteventstore.com)
- [NEventStore](https://github.com/NEventStore/NEventStore)
- [SQL Stream Store](https://github.com/damianh/SqlStreamStore)
- [Marten](https://github.com/JasperFx/marten)

I'm sure there are others and you can always implement your own event storage mechanism if you want however throughout this series I will be focusing on the use of EventStore.

## Up Next

The [first article](/blog/basics-of-event-sourcing) in this series will introduce the basics of event sourcing before digging into more detailed topics.
