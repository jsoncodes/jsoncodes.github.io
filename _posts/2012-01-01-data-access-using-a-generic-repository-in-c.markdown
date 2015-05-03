---
comments: true
date: 2012-01-01 21:30:40+00:00
layout: post
slug: data-access-using-a-generic-repository-in-c
title: Data Access Using a Generic Repository in C#
wordpress_id: 407
tags:
- c#
- data access
- repository
---

The repository pattern is an abstraction layer which provides a well-organised approach to maintaining a separation between an applications data access and business logic layers.  This gives us the important advantages of making code more maintainable and readable and improving the testability of our code.  It also works great with dependency injection!




When I started looking at the repository pattern I found that a lot of the samples on the internet used explicitly typed repositories such as ICustomerRepository and IOrderRepository.  However for a website I'm currently working on all of my CRUD operations were pretty much the same and I wanted to reduce the amount of code I needed to write so I implemented a basic generic repository which would work with any of my data model classes.




<!-- more -->The following code snippet  is the interface for the basic repository I've been using:



{% gist jasonmitchell/4322305 IRepository.cs %}




This interface only defines the most basic data access operations and should probably be expanded on to provide support for beginning, committing and rolling back transactions.




The following class is an implementation of IRepository which has been implemented to abstract access to an Entity Framework Code First data context:



{% gist jasonmitchell/4322305 EntityFrameworkRepository.cs %}




There's nothing particularly complicated about this class so  I'm just going to give a quick example on how to use it and leave it at that!  If you have the following class defined in an Entity Framework Code First data context:




{% gist jasonmitchell/4322305 Customer.cs %}




You could query your customer data really easily using a LINQ expression or a lambda expression:



{% gist jasonmitchell/4322305 Sample.cs %}




For more information about the repository pattern see: [http://msdn.microsoft.com/en-us/library/ff649690.aspx](http://msdn.microsoft.com/en-us/library/ff649690.aspx)
