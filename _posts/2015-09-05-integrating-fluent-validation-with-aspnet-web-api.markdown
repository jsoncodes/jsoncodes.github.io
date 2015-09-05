---
comments: true
date: 2015-09-05 22:01
layout: post
title: Integrating Fluent Validation with ASP.NET Web API using Autofac
---

[Fluent Validation](https://github.com/JeremySkinner/FluentValidation) is an excellent open source library for implementing
validation of models in a flexible and powerful way.  It also provides support for integrating with model state in ASP.NET MVC
and Web API and will set the ```ModelState.IsValid``` property in controllers based on the rules defined in the projects validators
making validation checks in web projects simple and straight forward.

This article will describe how to integrate Fluent Validation with ASP.NET Web API so that models can be validated using the same
method as when data annotations are used:

{% gist jasonmitchell/bf3890f234c0a19db551 PeopleController.cs %}

For reference the ```Person``` class looks like:

{% gist jasonmitchell/bf3890f234c0a19db551 Person.cs %}

And the validator for this class looks like:

{% gist jasonmitchell/bf3890f234c0a19db551 PersonValidator.cs %}

It isn't difficult to setup the validators to hook into ```ModelState.IsValid``` however the implementation may not be immediately
obvious.  The implementation in this article resolves the model validator instances using **Autofac** so we have the potential to
inject dependencies into the them; this has an impact on how the integration between Fluent Validation and Web API is setup.

This implementation requires the following steps:

1. Implement a custom validator factory by extending ```ValidatorFactoryBase```
2. Register the new factory with Autofac as ```IValidatorFactory```
3. Register the type ```FluentValidationModelValidatorProvider``` with Autofac as ```ModelValidatorProvider```
4. Register the validators with Autofac

Below is an example implementation of a custom validator factory which uses Autofacs ```IComponentContext``` to try to resolve
an instance of the requested validator type:

{% gist jasonmitchell/bf3890f234c0a19db551 AutofacValidatorFactory.cs %}

The Autofac module below will then take care of steps 2, 3 and 4.  It will automatically discover validators within the modules
assembly based on naming conventions and will register the ```IValidatorFactory``` and ```ModelValidatorProvider``` instances.

{% gist jasonmitchell/bf3890f234c0a19db551 ValidationModule.cs %}

Once this has been done the ```ModelState``` within the controllers should be set according to the Fluent Validation rules.  For
a complete example see [this Github repository](https://github.com/jasonmitchell/fluentvalidation-webapi-autofac).
