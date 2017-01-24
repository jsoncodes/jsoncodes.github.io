---
comments: true
date: 2016-08-30 00:00:01
layout: post
title: The Basics of Event Sourcing
series: Things You Need to Know Before Event Sourcing
---

Event sourcing is not a top-level architecture that should be applied to the entire system but rather applied where appropriate within your software.  It is not a silver bullet and in fact you may find that by applying event sourcing you are trading one set of problems for another; that said, event sourcing opens up a lot of interesting possibilities for your application.

Before continuing it's important to clarify that event sourcing is not directly related to Domain Driven Design and while both are regularly described together, they are actually distinct things which can be used without each other.

## Events and Streams

The basic principle of event sourcing is to rebuild state from a sequence of changes rather than reading the current state from a store such as a relational database.  These changes of state are called **events** and they are historical records of something that has occurred within the application - they are _facts_.  The sequence of events is known as a **stream**; events are saved to a stream in the order that they occurred.  These streams can then be replayed in order to reproduce state in the system.  The number of streams in an event store will vary based on specific application needs as there are no predefined rules on how events are partitioned.

Streams are often (though not always) treated as **append-only** and events cannot be modified once saved to a stream. This means that once an event has occurred within a system and been saved the record of it is always preserved.  There are some consequences to this that will be explored in a later article.

## Read Models and Projections

An event stream is not always a particularly useful format for read operations so a more useful **read model** can be produced to complement our event-centric **write model**.  The separation of write and read models is known as **Command Query Responsibility Segregation** (or **CQRS**); this goes beyond the scope of this series but there is a lot of useful content online.

Producing a read model can be done using a set of **projections**.  A projection is a different view or shape of some data; in this case the event stream may be **projected** into some other storage to provide better querying support.

## Advantages of Event Sourcing

Event sourcing seems complex relative to storing the up-to-date state of the system however it brings with it some useful advantages:

- It produces a record of the user's intentions
- It provides increased traceability of changes occurring within the system
- It becomes trivial to revert the system to an earlier state
- Testing is simpler than testing up-to-date state; we only need to inspect the events that are raised
- The state of the system becomes decoupled from the storage
- It provides an audit log for free
- Event-centric model makes it simpler to produce projections of data

It also comes with some disadvantages:

- It requires a shift in mindset to be thinking in an event-centric way
- Additional overhead of producing projections
- Less commonly known so new team members may have additional on-boarding time

## Up Next

The [next article](/blog/introduction-to-event-store) will take a look at Event Store which I will be using throughout this series.
