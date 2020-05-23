---
comments: true
date: 2011-03-12 21:49:21+00:00
layout: post
slug: using-the-bing-maps-silverlight-control
title: Using the Bing Maps Silverlight Control
wordpress_id: 260
tags:
- bing
- c#
- sample
- silverlight
---

This week I played around with the Bing Maps [Silverlight](http://www.silverlight.net/) Control to find out how easy it would be to get a map up and running in an application, place pins on said map and get the name of the country that the user has clicked on.  I soon discovered that achieving this functionality was incredibly easy!

The simple application I created can be found at [http://jason-mitchell.com/uploads/bingmaps/bingmapstestpage.html](http://jason-mitchell.com/uploads/bingmaps/bingmapstestpage.html)

<!-- more -->

Naturally the first thing that needed to be done was to download and install the Bing Maps Silverlight Control from [here](http://www.microsoft.com/downloads/en/details.aspx?displaylang=en&FamilyID=beb29d27-6f0c-494f-b028-1e0e3187e830).  I also needed to create a Bing Maps Key; see how to do this on [MSDN](http://msdn.microsoft.com/en-us/library/ff428642.aspx).  During the brief time I spent searching for information on this topic I also came across an “Interactive SDK” provided by Microsoft.  This turned out to be very useful in figuring out how to work the map control and you can find it at [http://www.microsoft.com/maps/isdk/silverlight/](http://www.microsoft.com/maps/isdk/silverlight/).

Once this was done I created a new Silverlight application project in Visual Studio 2010 and added the reference to Microsoft.Maps.MapControl.dll that I had just installed.  In my MainPage.xaml markup I added a new namespace inside the UserControl tag by adding:


    xmlns:bing="clr-namespace:Microsoft.Maps.MapControl;assembly=Microsoft.Maps.MapControl


I’m not going to provide a full code listing in this article so if you aren’t sure on how to do this then check out the zip file at the end of this article.

My next step was to add the markup to display the map control in my LayoutRoot.  I was pleasantly surprised when this was just a simple one line tag as shown below:


    <bing:Map x:Name="MapControl" CredentialsProvider="your Bing maps key" />


In order to create the functionality in my demo application I added a handler for the Map’s MouseClick event.  This handler will call one of two methods based on what radio button has been checked.  Again I’m not putting the code in the article but it is in the download.

In order to place a push pin it took **three lines of code** without mushing it all together and not counting the method signature.  See it below:


    private void PlacePinOnMap(MapMouseEventArgs e)
    {
        Location worldCoords = MapControl.ViewportPointToLocation(e.ViewportPoint);
        Pushpin pushpin = new Pushpin {Location = worldCoords};

        MapControl.Children.Add(pushpin);
    }


There’s nothing complicated here.  MapMouseEventArgs.ViewportPoint returns the click location on the screen which can then be passed to the MapControl.ViewportPointToLocation method which will convert the click location to a **geocode** (longitude and latitude) representing the location on the map.   Next I create a new Pushpin control, give it the geocode and add it to the map.  Pretty easy!

In order to get the location information such as street and country we have to **use Microsoft’s Geocode web service**.  The address for this is:

[http://dev.virtualearth.net/webservices/v1/GeocodeService/GeocodeService.svc](http://dev.virtualearth.net/webservices/v1/GeocodeService/GeocodeService.svc)

I added a new Service Reference to my Silverlight application which pointed to this service.  This will generate a proxy class called **GeocodeServiceClient** which provides a **ReverseGeocodeAsync method** which will convert a geocode into a real address.  The proxy class also provides a GeocodeAsync method which presumably converts an address to a geocode (I haven’t tried it).  The code below shows how to get the name of the country that has been clicked on using this web service.


    private void GetCountryFromClickLocation(MapMouseEventArgs e)
    {
        Location worldCoords = MapControl.ViewportPointToLocation(e.ViewportPoint);

        GeocodeServiceClient geocodeClient = new GeocodeServiceClient("BasicHttpBinding_IGeocodeService");
        geocodeClient.ReverseGeocodeCompleted += ReverseGeocodeCompleted;

        ReverseGeocodeRequest request = new ReverseGeocodeRequest();
        request.Culture = MapControl.Culture;
        request.Location = worldCoords;
        request.ExecutionOptions = new ExecutionOptions();
        request.ExecutionOptions.SuppressFaults = true;

        MapControl.CredentialsProvider.GetCredentials(credentials =>
                   {
                      request.Credentials = credentials;
                      geocodeClient.ReverseGeocodeAsync(request);
                   });
    }

    private void ReverseGeocodeCompleted(object sender, ReverseGeocodeCompletedEventArgs e)
    {
        ResultTextBlock.Text = "Country: " + e.Result.Results[0].Address.CountryRegion;
    }


Again we have to convert our click location into a geocode to give to the web service.  This code is pretty straightforward so I’m not going to go through it.

That’s basically it!  Overall I’m very impressed with Microsoft’s Bing Maps support in Silverlight both in terms of the SDK and the documentation available online.  The demo application took no time at all to whip up after a few minutes spent researching.

**_Demo Project Download:_** [/uploads/BingMapsDemo-12_03_11.zip](/uploads/BingMapsDemo-12_03_11.zip)
