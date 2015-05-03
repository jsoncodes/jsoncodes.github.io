---
author: jmitch18
comments: true
date: 2013-08-21 20:31:58+00:00
layout: post
slug: dont-static-all-the-things
title: (Don't) Static All The Things!
wordpress_id: 715
tags:
- .net
- c#
- code structure
- software craftmanship
- standards
---

Sometimes when you first start working on an existing project you come across some code that's a bit quirky or weird. This is normally due to personal preferences or misunderstandings but whatever the reason, you can live with it - it's not that bad. Other times you just come across code that makes you quietly weep as you resign yourself to spending the next few months in this hell; a .NET project which uses the "Static Everything" (anti-) pattern is one of those times (is this actually a pattern? I don't know but I'll be calling it a pattern throughout this post).  _**The Static Everything pattern is when core operations and business logic in a code base is mostly made up of static classes with static utility methods**_ scattered everywhere; some of which may even have static "state" (!!).  This is typically accompanied by simple domain/model classes that simply define properties for an entity.

<!-- more -->

## Why is this a problem?


Because I said so and I'm grumpy about having dealt with it before?  Partially yes but I don't expect you to accept that as a reason, fortunately there are real reasons for why this is a problem.

When you think about the core principles of Object Oriented Programming it's difficult to see how modelling most of your operations as static methods fits in. _**Essentially these methods are now globally accessible functions**_, something that fits in perfectly well in a language like PHP but feels slightly out of place in a fully object oriented language.

_**The Static Everything pattern encourages terrible abstractions**_ (if they can even be called that) in order to organise and group methods together.  In the beginning the classes might seem small and perfectly formed however over time they can easily grow into epic blob classes once we decide that we need to provide some very slight change in behaviour under very slightly different circumstances. What's a developer to do?  Copy the method and tweak the behaviour slightly? Create optional parameters or overloads? These are not ideal solutions and will lead to a maintainability nightmare over the following months and years.

As a consequence of using this pattern _**it will become more difficult to write testable code**_; not impossible, just more difficult.  Static methods are difficult to mock (the only third-party library I know of that does this is [Typemock Isolator](http://www.typemock.com/isolator-product-page)) and they don't lend themselves well to composition. My experience has been that composition generally isn't even attempted presumably because of the "inconvenience" of writing such code (and possibly the risk of parameter overload).  Instead _**dependencies are created inside the static methods**_ to create little self-contained packets of functionality.  This really harms testability as we can no longer mock out a component which really should have had it's own set of tests and doesn't need to be tested again by everything that uses it.  On top of that the dependencies could possibly be performing expensive tasks such as communicating with a database which will impact on the performance of the tests.


## A sure-fire way to violate the SOLID principles!


How does this approach help a developer adhere to the SOLID principles of Object Oriented Design? It doesn't really; it almost automatically violates the O-L-D and makes the S and I pretty difficult to adhere to.

**S ([Single responsibility principle](http://en.wikipedia.org/wiki/Single_responsibility_principle))**
With the Static Everything pattern it's possible to adhere to the Single Responsibility Principle by having very specific static classes and methods.  Unfortunately the Static Everything pattern typically seems to use something along the line of "MyEntityManager" which defines every operation possible for a specific entity.  You could argue that managing an entity is a single responsibility but what does that even mean?  It's far to vague to be considered a single responsibility.

**O ([Open/closed principle](http://en.wikipedia.org/wiki/Open/closed_principle))**
This states _"software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification"._  This is something that tends to be solved using inheritance and [polymorphism](http://en.wikipedia.org/wiki/Polymorphism_in_object-oriented_programming) which obviously isn't applicable to _**static classes as they are inherently sealed and can't be extended**_.

**L ([Liskov substitution principle](http://en.wikipedia.org/wiki/Liskov_substitution_principle))**
This principle says _“objects in a program should be replaceable with instances of their subtypes without altering the correctness of that program”_.  Again we can't have subtypes of static classes so we can't substitute them with anything.

**I ([Interface segregation principle](http://en.wikipedia.org/wiki/Interface_segregation_principle))**
_“Many client-specific interfaces are better than one general-purpose interface”.  _This is all about splitting an interface down into very specific components to reduce potential dependencies across code.  I guess if you squint really hard at this principle in the context of the Static Everything pattern you can make the definition of an "interface" really fuzzy and argue that it doesn't literally mean an actual interface and that your static methods are nicely broken down into logic groups of methods in a dedicated static class.  However this seems to be making life unnecessarily difficult when _**you could be using an object oriented language feature to adhere**_ to this one.

**D ([Dependency inversion principle](http://en.wikipedia.org/wiki/Dependency_inversion_principle))**
This says _“Depend upon Abstractions. Do not depend upon concretions”._  _**We can't abstract static classes so they are automatically concrete**_.


## When is static okay?


I've done a lot of grumping in this article about why Static Everything is bad but **as always in software development when asked if something is right or wrong the answer is almost always "it depends"**.  Static classes with static methods can definitely be useful in some cases; for example utility classes such as [System.Convert](http://msdn.microsoft.com/en-us/library/system.convert.aspx) which is defined as a static class is fine because its methods are very granular operations that do not necessarily make sense in the context of a larger object.

Its also important to mention [extension methods](http://msdn.microsoft.com/en-us/library/vstudio/bb383977.aspx) in C#; strictly speaking these little bundles of magic are static classes with static methods defined in them however they operate very differently. In some cases it may be possible to swap out static helper/manager/utility methods and replace them with extension methods; the best example of this is the implementation of LINQ which has allowed developers to banish utility methods for commonly used list operations.

It's okay to use static classes with static methods if what you need to write is a true utility.  Just don't abuse it and use it for everything.


## Arguments for Static Everything


Developers are an opinionated bunch; we have opinions on almost all aspects of software development (and computing in general). Some people love C#, some people hate it.  Some people love regions, [some people hate them](http://jason-mitchell.com/software-development/visual-studio-regions-make-me-cringe/). I know people who have argued that Static Everything is a great way to develop and say _**"I don't want to create an instance any time I want to do that"** _or _**"static method calls are faster"**_.

Why is creating an instance a hassle?  Sounds like laziness to me.  By having instances you increase the maintainability of your code; it _**allows you to easily use language features to extend and compose objects **_without causing a mess.  Arguing that static method calls are faster is being slightly pedantic.  Yes it's true that they are faster but the performance hit in creating a new instance is so tiny it should have a near-zero impact on the performance of you application (unless you are doing something insane).


## What's a developer to do?


In my mind the solution to these problems is very simple; object oriented languages give you the tools to deal with all of the problems I've talked about - use them! Create richer domains and entities, implement composable service classes, put simple utilities in extension methods where appropriate.  There's any number of ways to use the language features to avoid this situation.

If you are starting out on a new project then this shouldn't be a problem however if you are working on a project that already uses it then I feel for you; the refactoring effort for fixing the Static Everything pattern can be pretty huge (meaning there is likely no choice but to continue with it as it is).

The Static Everything approach seems like the path of least resistance for developers who just want to get the job done and don't necessarily care about [software craftsmanship](http://en.wikipedia.org/wiki/Software_Craftsmanship) or developers who don't like object oriented features - so why work with an object oriented language?
