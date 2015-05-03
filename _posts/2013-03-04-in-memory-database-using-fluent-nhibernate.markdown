---
author: jmitch18
comments: true
date: 2013-03-04 10:08:54+00:00
layout: post
slug: in-memory-database-using-fluent-nhibernate
title: In-Memory Database Using Fluent NHibernate
wordpress_id: 625
tags:
- c#
- data access
- Unit Testing
---

When writing unit tests dealing with code that communicates with the database can be a pain.  All the information on Test Driven Development on the internet and in books always recommends that you avoid hitting the database.  Avoiding interacting with the database naturally has positive performance implications and has the additional advantage of not cluttering up a test database with a bunch of data created in our unit tests.  I've found that this lets me simplify my unit tests because I can make certain assumptions about the state of my data. There are different ways of avoiding interacting with a database but the two ways I have used are:




  *  Implement the Repository pattern and mock out the interfaces


  * Use an in-memory database


<!-- more --> Fluent NHibernate makes it fairly simple to set up an in-memory database using your mapping files and SQLite.  First your project will need to be configured to include the SQLite interop DLLs which can be done using a NuGet package([http://nuget.org/packages/System.Data.SQLite/](http://nuget.org/packages/System.Data.SQLite/)). The following code is what I use to create an in-memory database for my unit tests.  This code will create a fresh database for each of our tests so it will ensure they all run in isolation.


### InMemorySessionFactoryProvider.cs


This class is responsible for creating my ISessionFactory and ISession instances.  It's implemented as a singleton so I can easily access a single ISessionFactory instance anywhere I need it.  The CreateSessionFactory method configures a single ISessionFactory instance to use SQLite, adds the mappings from my main project and provides access to the database configuration object.  The OpenSession method will create a new ISession instance and create a new database for it to use.

{% gist jasonmitchell/5073089 InMemorySessionFactoryProvider.cs %}


### TestSetupFixture.cs


TestSetupFixture is configured as a NUnit setup fixture which will execute it's setup and teardown methods once for any test run no matter how many tests are being executed.

{% gist jasonmitchell/5073089 TestSetupFixture.cs %}


### AbstractInMemoryDataFixture.cs


This class only exists to automatically open a new session for each test and dispose of it afterwards.  All my fixtures which require data access inherit from this class.

{% gist jasonmitchell/5073089 AbstractInMemoryDataFixture.cs %}

In my opinion this approach is fairly simple and helps to make unit testing a bit simpler.  I also no longer like using the Repository pattern (which I plan to write about soon) so this provides a nice way of avoiding touching the database without mocking objects.
