---
comments: true
date: 2016-08-30 00:00:01
layout: post
title: The Basics of Event Sourcing
series: Things You Need to Know Before Event Sourcing
---

Event sourcing can open up a lot of interesting possibilities within software but it is important to be aware of the fact that it comes with its own set of problems in exchange. It's important to clarify that event sourcing is not directly related to Domain Driven Design and while both are regularly described together, they are distinct things which can be used without each other.

## Events and Streams

The basic principle of event sourcing is to rebuild state from a sequence of changes rather than reading the current state from a store such as a relational database.  These changes are called **events** and they are historical records of something that has occurred within the system - they are _facts_.  Events are saved in sequence to a **stream**; these streams can then be replayed in order to reproduce the state.

Streams are often (though not always) treated as **append-only** and events cannot be modified once saved to a stream. This means that once an event has occurred within a system and been saved the record of it is always preserved.  There are some consequences to this that will be explored in a later article.

## Read Models and Projections

An event stream is not always a particularly useful format for read operations so a more useful **read model** can be produced to complement an event-centric **write model**.  The separation of write and read models is known as **Command Query Responsibility Segregation** (or **CQRS**); this goes beyond the scope of this series but there is a lot of useful content online.

Producing a read model can be done using a set of **projections**.  A projection is a different view or shape of some data; in this case the event stream may be **projected** into some other storage to provide better querying support.

## Advantages of Event Sourcing

Event sourcing seems complex relative to storing the up-to-date state of the system however it brings with it some useful advantages:

- It captures the intent of operations
- It provides increased traceability of changes occurring within the system
- Testing is simpler than testing up-to-date state; we only need to inspect the events that are raised
- It provides an audit log for free
- Event-centric model makes it simpler to produce projections of data

It also comes with some disadvantages:

- It requires a shift in mindset to be thinking in an event-centric way
- Additional overhead of producing projections
- Less commonly known so new team members may have additional on-boarding time

## Up Next

The [next article](/blog/introduction-to-event-store) will take a look at Event Store which I will be using throughout this series.
