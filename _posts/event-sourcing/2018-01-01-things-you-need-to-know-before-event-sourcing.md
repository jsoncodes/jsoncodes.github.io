---
comments: true
date: 2016-08-30 00:00:00
layout: post
title: Things You Need to Know Before Event Sourcing
series: Things You Need to Know Before Event Sourcing
series_post_title: Introduction
---

Event sourcing is becoming a popular topic with a lot of information and talks available online describing the theory but my experience has been that information about applying event sourcing in practice is harder to come by.  This series is aimed at providing a practical guide (including some .NET code samples) of things you need to know before building an event sourced application.  I am by no means an expert but I want to share my experiences and what I have learned from writing event sourced applications in the past.

I am going to assume some knowledge of the theory of event sourcing (as there are better sources for this) though I will provide a quick introduction to the core concepts.

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

- [Event Store](http://geteventstore.com) (also sometimes referred to as GES)
- [NEventStore](https://github.com/NEventStore/NEventStore)
- [SQL Stream Store](https://github.com/damianh/SqlStreamStore)
- [Marten](https://github.com/JasperFx/marten)

I'm sure there are others and you can always implement your own event storage mechanism if you wish using an RDBMS or document database; throughout this series I will be focusing on the use of Event Store/GES (known simply as Event Store from this point forward).

## Up Next

The [first article](/blog/basics-of-event-sourcing) in this series will introduce the basics of event sourcing before digging into more detailed topics.
