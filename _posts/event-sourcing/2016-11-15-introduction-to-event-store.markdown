---
comments: true
date: 2016-11-15 00:00:00
layout: post
title: Introduction to Event Store
series: Things You Need to Know Before Event Sourcing
cover: /images/blog/event-sourcing/event-store-dashboard.png
---

The event store I'm using in this series is [Event Store/GES](https://geteventstore.com/).  In this article I'm going to run through a _very brief_ introduction to Event Store to provide a basis for the future articles. For more detail I would recommend you take a look at the [documentation](http://docs.geteventstore.com/) for Event Store.

## Installing Event Store

Setting up and running the Event Store server on any platform is pretty straightforward.  You can [download it](https://geteventstore.com/downloads/) straight from the website, run it in Docker using the [official image](https://store.docker.com/community/images/eventstore/eventstore) or install it through [apt-get](https://packagecloud.io/EventStore/EventStore-OSS).

Once the server is running (assuming using the default ports) you can navigate to the dashboard in a browser using the address `http://<host-machine-address>:2113` and sign in using the default credentials `admin` and `changeit`.

## Event Store Client API

Event Store provides a [.NET API](http://docs.geteventstore.com/dotnet-api/) to communicate with the server which can be installed via [NuGet](https://www.nuget.org/packages/EventStore.Client/).  For the code samples in this article I'm going to use the class below as an example event:

{% gist jasonmitchell/92b23be8e914bf6b91dc4ec87e0c1635 SomeEvent.cs %}

The snippets below show the basics of writing to and reading from Events using the .NET client API (full source code available on on [GitHub](https://github.com/jasonmitchell/event-store-samples/tree/master/Streams)).

### Writing Events to a Stream

{% gist jasonmitchell/92b23be8e914bf6b91dc4ec87e0c1635 WriteEvents.cs %}

### Reading Events from a Stream

{% gist jasonmitchell/92b23be8e914bf6b91dc4ec87e0c1635 ReadingEvents.cs %}

## Up Next

The next article in this series will look at combining event sourcing with tactical Domain Driven Design patterns.
