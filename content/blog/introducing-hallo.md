---
subject: Open Source
title: Introducing Hallo
date: '2023-01-18T21:00:00.000Z'
tags:
  - open source
  - http api
  - hypermedia
coverImage: ./introducing-hallo.jpg

coverImageCredit: Julian Hochgesang on Unsplash
coverImageCreditUrl: https://unsplash.com/photos/XnX-vA4B9-0
---

Even though it may seem a bit late (given that it is currently on version
[3.0.2](https://www.nuget.org/packages/Hallo/3.0.2) at the time of writing), I'd like to introduce
my .NET package [Hallo](https://github.com/jasonmitchell/hallo). Hallo enables the generation of
[HAL](https://stateless.co/hal_specification.html) documents for HTTP
APIs through content negotiation.

The primary design goal of Hallo is to enable developers to add support for
[hypermedia](https://en.wikipedia.org/wiki/HATEOAS) to their APIs without needing to make changes to
their models or API endpoints. For every resource you want to generate a HAL document for, you can
create a new resource representation by deriving a new class from `Hal<T>` and implement one or more
of `IHalState<T>`, `IHalEmbedded<T>` or `IHalLinks<T>`:

```csharp
public class PersonRepresentation : Hal<Person>,
                                    IHalState<Person>,
                                    IHalLinks<Person>,
                                    IHalEmbedded<Person>
{
    public object StateFor(Person resource)
    {
        return new
        {
            resource.FirstName,
            resource.LastName
        };
    }

    public IEnumerable<Link> LinksFor(Person resource)
    {
        yield return new Link(Link.Self, $"/people/{resource.Id}");
        yield return new Link("contacts", $"/people/{resource.Id}/contacts");
    }

    public object EmbeddedFor(Person resource)
    {
        return new
        {
            Contacts = new List<Person>()
        };
    }
}
```

Given the example above and assuming we have an API to access the `Person` resource, then a HTTP
request such as:

```
GET http://localhost:5000/people/1
Accept: application/hal+json
```

will produce the result:

```json
{
  "firstName": "Geoffrey",
  "lastName": "Merrill",
  "_embedded": {
    "contacts": []
  },
  "_links": {
    "self": {
      "href": "/people/1"
    },
    "contacts": {
      "href": "/people/1/contacts"
    }
  }
}
```

Hallo also works with the standard ASP.NET approach to dependency injections which allows you to inject
additional services into the resource representation. For example, we could query a database for additional
data to use when populating the `_embedded` property of the HAL document:

```csharp
public class PersonRepresentation : Hal<Person>,
                                    IHalEmbeddedAsync<Person>
{
    private readonly ContactsLookup _contacts;

    public PersonRepresentation(ContactsLookup contacts)
    {
        _contacts = contacts;
    }

    public async Task<object> EmbeddedForAsync(Person resource)
    {
        var contacts = await _contacts.GetFor(resource.Id);

        return new
        {
            Contacts = contacts
        };
    }
}
```

To get started with Hallo, check out the
[README on GitHub](https://github.com/jasonmitchell/hallo/blob/master/README.md) which runs through
how to set the package up in your API. The repository also includes a functioning sample which can be
played with to get a feel for the project. If you have any questions or comments, I'm always open to
discussion in the GitHub issues and will happily take contributions. If you do use Hallo in your project,
I'd love to know so give me a shout!
