---
comments: true
date: 2016-02-07 19:30
layout: post
title: Practical SOLID
---

[SOLID](https://en.wikipedia.org/wiki/SOLID_(object-oriented_design)) is an acronym for five basic principles of object-oriented design which are intended to serve as guidelines for improving the quality of object-oriented codebases.  The relevancy of SOLID seems to be questioned and debated these days however I'm of the opinion that the general principles are relevant but that discussions around the meaning of and the attempted adherence to the SOLID principles has become somewhat philosophical.  I prefer a more practical view of SOLID which I hope to share in this article.

This article assumes familiarity with SOLID and the general ideas behind the principles.  I'm not going to go into the detail of them in this post because it's described much better in a lot more detail on many other blogs.  I will be focusing on frustrations I have with SOLID and how I feel about applying it.

## Single Responsibility Principle

> A module or class should have only one reason to change.

I find the Single Responsibility Principle to be generally quite sensible; in theory it helps to improve the robustness of code and will help to increase the cohesiveness of a codebase.  These are good things and this is cool.  However any discussion I have ever been involved with or have listened in on seems to extensively discuss what "one reason to change" actually means and the scope at which to define a single responsibility (e.g. module, class, method).  I find such conversations tiresome; people seem to spend more time stressing over the single responsibility principle than actually producing working, reasonably well-designed software.

Getting carried away with breaking software down into microscopic responsibilities can result in a tangled mess that is difficult to understand due to having to hold so many concepts in your head for any one feature.  In my opinion sometimes it is better to modify 10 lines of highly coupled code than 5 layers of decoupled, "cohesive" code.

In short, I like to make a reasonable effort at defining single responsibilities but don't get so bogged down in it that it gets in the way of producing software.

## Open/Closed Principle

> Software entities should be open for extension, but closed for modification.

The definition of this one is very academic and I find it quite tricky to clearly define.  The common description seems to be that we should write code in a manner that makes it easy to write new code and behaviour without requiring modification of existing codeg.

I think the open/closed principle is potentially very useful but building everything in a way that adheres to this principle from the start is unnecessary.  I think this principle is good to stick to when the need arises; don't try to anticipate the need for it. In my opinion it is much better to keep the codebase lean and simple as much as possible in order make it easy to transition to this structure.

## Liskov Substitution Principle

> Objects in a program should be replaceable with instances of their sub-types without altering the correctness of that program.

To me this one has always felt more complex and open to debate than the others and I have so many questions about what it actually means to adhere to it.  An alternative description for this principle is that "sub-types must always follow the exact same contract as the base type" - I don't find this particularly helpful.  What does this even mean?  I have so many questions.

* If there are pre-requisites to being able to call a method on a sub-type does it still adhere?  

  My research says no and that the method should be callable without any method calls to get the object in order.  This means the methods should be callable as self-contained units, with careful design this is definitely possible though not always practical.
* Does a sub-type which throws an exception violate it?  For example some ```Stream``` sub-types are forward only and can't seek to the beginning.

  I have encountered mixed opinions on this one.  My feeling is that this violates the rule because that exception in one of the sub-types is most definitely altering the correctness of the the program.

In my opinion strict adherence to this principle can be a massive pain in the ass and I don't think it's worth the hassle in a lot of cases; again this is just another example of how SOLID can sometimes get in the way of producing working software.  Following this principle on a basic level is much more practical and definitely brings benefits.

## Interface Segregation Principle

> Many client-specific interfaces are better than one general-purpose interface.

Or "No client should be forced to depend on methods it doesn't use".  This makes sense in a few ways:

* The additional interfaces can help to describe the intent of the code
* In theory the segregated interfaces should be simpler to apply refactorings to
* Can work quite nicely with the Dependency Inversion Principle

However on the other hand this can add some unnecessary complexity in some (especially smaller) software projects and is likely not worth the effort.  In my opinion .NET developers seem to overuse interfaces a lot in ways that do not provide much value outside of mockability for testing (e.g. ```MyService``` and ```IMyService```).  Following this principle might (or might not) help to guide those developers away from this pattern by encouraging them to define interfaces which reveal intent.

There is another way of thinking about this principle which isn't necessarily about the interface concept we know from OOP but rather about the contract defined by the methods within concrete types.  This approach to the interface segregation principle says that you should break classes down into components and bring them together again as a whole through composition.  In this way you end up several types instead of a single large one which allows other parts of the codebase to depend on smaller chunks.  This is just plain old object composition which is a good thing which we all should like.

## Dependency Inversion Principle

> Depend upon Abstractions. Do not depend upon concretions.

Dependency inversion helps to reduce coupling by encouraging developers to write code which depends on a "concept" rather than a specific implementation.  When following this principle the relationship between the consumer and dependency should be inverted so that the ownership of the contract "belongs" to the consumer.  

I think that this principle can sometimes be misunderstood; my experience has been that many dependency inversion implementations follow the pattern of ```Consumer -> [IDependency <= Dependency]```.  This pattern decouples the consumer from the dependency details however it does not invert the relationship between the dependency and the consumer.  A "technically correct" implementation would follow the pattern of ```[Consumer -> IConsumerDependency] <= Dependency```; this is an important distinction and I would argue that the former pattern offers little value.

Personally I quite like this principle however like the other SOLID principles I feel like it should only be adhered to in the correct circumstances where it offers value.  I don't think this principle is worth worrying about too much on a smaller project - it adds a certain amount of complexity to the codebase.

## Summary

All of the SOLID principles are useful in their own way and getting carried away with trying to adhere to all of them on all projects can lead to a bit of a mess.  In the correct situations these principles can add a lot of value to codebases.  As responsible developers we should be making the decision to follow each SOLID principle based on the circumstances of the project and not just because we feel we are supposed to.
