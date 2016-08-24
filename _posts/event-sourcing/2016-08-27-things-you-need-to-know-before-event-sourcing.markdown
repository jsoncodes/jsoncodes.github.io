---
comments: true
date: 2016-06-18 00:00:00
layout: post
title: Things You Need to Know Before Event Sourcing
series: Things You Need to Know Before Event Sourcing
series_post_title: Introduction
published: true
---

Event sourcing is a popular topic these days which I have found quite difficult to gather information on the realities of implementing and maintaining.  This series is aimed at providing a practical guide (including some .NET code samples) of things you need to know before building an event sourced application.

Event sourcing is not a top-level architecture that needs to be applied to the entire system but rather should be applied where appropriate within your software.  It is also not a magical silver bullet that will make everything perfect and I have found that in reality you trade one set of problems for another.  That said, event sourcing opens up a lot of interesting possibilities for your application which I will cover throughout.

## Topics Covered

The list of topics I plan to cover includes:

- Introduction to [Event Store](http://geteventstore.com)
- Basics of event sourcing
- Introduction to CQRS
- Event versioning
- Event sourcing and Domain Driven Design (including example code for event sourced aggregates)
- Projections and read models
- Event Store operations

I won't claim to have all the answers in this series and will be asking some questions throughout that you should perhaps ask yourself (and share your answers for) before making use of event sourcing.

## Event Stores

When it comes to event stores there are a few choices:

- [Event Store](http://geteventstore.com) (also sometimes referred to as GES)
- [NEventStore](https://github.com/NEventStore/NEventStore)
- [SQL Stream Store](https://github.com/damianh/SqlStreamStore)
- [Marten](https://github.com/JasperFx/marten)

I'm sure there are others and you can always implement your own event storage mechanism if you wish using an RDBMS or document database.  Throughout this series I will be focusing on the use of Event Store/GES (known simply as Event Store from this point forward) - and with that it's on to the first article.
