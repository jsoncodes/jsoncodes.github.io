---
comments: true
date: 2015-10-29 21:37
layout: post
title: Generic Repository and the Specification Pattern
---

A few years back I wrote an article titled
["Data Access Using a Generic Repository in C#"](/blog/data-access-using-a-generic-repository-in-c/) which
since it was published has been by far the most popular article on my blog.  This is somewhat frustrating given that the
approach I described in that article (and repositories in general - but that's a different article) is something I disagree with
now.  In this article I'm going to share a generic repository implementation which makes use of the
["specification pattern"](https://en.wikipedia.org/wiki/Specification_pattern) to perform queries against an Entity Framework
context.

# What's wrong with the original implementation?

The original implementation I posted is nothing more than a leaky and pointless abstraction around the ORM (Entity Framework in
my example).  Essentially the basic implementation looks like:

{% gist jasonmitchell/62905f39a21979f14f06 QueryableRepository.cs %}

The ```Query``` method accepts an ```Expression``` as a parameter to filter the results and returns an ```IQueryable``` as the
output.  Since the repository returns an ```IQueryable```, the predicate parameter serves no purpose whatsoever when a query
like ```repository.Query<Person>().Where(...)``` would be a much simpler solution.  The other issue I have with this repository is
the fact that it returns an ```IQueryable``` at all; in my opinion repositories should be executing queries and converting the
results to a list.  If a repository does not do this then what benefit does it provide over using the context directly?

The implementation I'm going to describe in this article will remove the ```IQueryable``` return value and encapsulate query
conditions in a useful way.  I will provide code snippets throughout but for a more complete example I have provided a
[demo project on GitHub](https://github.com/jasonmitchell/generic-repository-specification-example).

# Why the Specification Pattern?

Specifications provide a means of encapsulating boolean logic in a class which can be reused and chained together to compose more
complex queries.  In addition they can be used in a non-query context to check in an object meets certain criteria (for example, as
part of an ```if``` statement).  Specifications are also easily unit testable making it simple to assert the logic contained within
them.

For this example I will be using a simple interface which defines a single ```IsSatisfiedBy()``` method which returns an
```Expression``` for use in Entity Framework queries.  An overload could be implemented which accepts an object as a parameter
for more general use but I've that for this article.

{% gist jasonmitchell/62905f39a21979f14f06 ISpecification.cs %}

Below are two simple example specifications: one to query ```Person``` objects by ```FirstName``` and the other by ```LastName```:

{% gist jasonmitchell/62905f39a21979f14f06 GetByFirstName.cs %}
{% gist jasonmitchell/62905f39a21979f14f06 GetByLastName.cs %}

These very simple classes encapsulate the logic required for the queries which can be useful when complex queries need to be reused
and, as mentioned before, they can be composed together into more complex queries such as querying ```Person``` objects by full name.

# Composing Specifications

Specifications can be combined together to make more complex queries using the logical operators ```And```, ```Or``` and ```Not```.
These operators are themselves implemented as specifications, for example:

{% gist jasonmitchell/62905f39a21979f14f06 AndSpecification.cs %}

For the implementation of the other operators see the [demo project](https://github.com/jasonmitchell/generic-repository-specification-example/tree/master/Sample.Repositories/Specifications).
In the demo I have also implemented extension methods on the ```ISpecification``` interface to provide a more friendly method of
chaining specifications together:

```var spec = new GetByFirstName("Jason").And(new GetByLastName("Mitchell"));```

```var spec = new GetByFirstName("Jason").Or(new GetByFirstName("Dave"));```

These newly combined specifications can be used in the exact same way as simple specifications.

# Querying in a Repository using Specifications

Most of the work is done by the implementation of the specifications themselves.  The implementation of the repository is now very
simple:

{% gist jasonmitchell/62905f39a21979f14f06 SpecificationRepository.cs %}

# Demo project

I have implemented a demo project that provides a working solution on [GitHub](https://github.com/jasonmitchell/generic-repository-specification-example).