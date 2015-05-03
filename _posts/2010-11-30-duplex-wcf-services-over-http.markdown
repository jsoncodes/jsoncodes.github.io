---
comments: true
date: 2010-11-30 13:11:51+00:00
layout: post
slug: duplex-wcf-services-over-http
title: Duplex WCF Services Over HTTP
wordpress_id: 220
tags:
- sample
- wcf
- web services
---

I have recently been spending a lot of time working with [WCF](http://msdn.microsoft.com/en-us/netframework/aa663324.aspx) for my final year project which requires frequent and efficient communication between different types of devices including smartphones.  My initial approach was to occasionally and asynchronously poll the services to see if there was any new data available.  The problem with this is immediately obvious – constantly polling the server will impact the overall performance and will also drain the battery of any smartphone utilising the services so I began looking into duplex WCF services over HTTP.  I found it to be pretty easy to dig up some useful information on the subject and I must give credit to [Frank Quednau](http://realfiction.net/) for his “[no frills, bare-bones example to Duplex WCF](http://realfiction.net/go/113)” article which served as the foundation to my own work.

<!-- more -->

The service and callback interface of my code deviates very little from Franks’ so I’m not going to discuss those parts again.  How my code does differ is the use of HTTP in place of TCP, how the service is hosted and how it is consumed.  See the end of the article for a Visual Studio 2010 download of my project.

Essentially, I was looking to host my service in IIS and consume it via the proxy class which is generated when you add a new service reference to a project.  I created a basic service that would use a callback interface to send data back to the client.  As far as I was concerned, I was good to go, so I built the project and tried to add the service reference to my client project only to be faced with the following error when trying to download the service metadata:


> _Contract requires Duplex, but Binding ‘BasicHttpBinding’ doesn’t support it or isn’t configured properly to support it._


The solution to this problem was to configure my service to use wsDualHttpBinding instead of basicHttpBinding.  To do this, I added the following configuration to my WCF application’s web.config file:

    <services>
        <service name="Framework.Networking.Services.ServiceWithCallback">
            <endpoint address="ServiceWithCallback" binding="wsDualHttpBinding" contract="Framework.Networking.Services.IServiceWithCallback" />
            <host>
                <baseAddresses>
                    <add baseAddress="http://localhost:1688">
                </baseAddresses>
            </host>
        </service>
    </services>

The important bit here is the binding attribute in the endpoint element for my service.  Presumably if no configuration exists for a service then WCF will use some default settings which setup a service using basicHttpBinding.  With this configuration in place I could now add my service reference and have my proxy classes generated for me.

In order to prevent any port conflicts, I edited the binding for the service in the app.config file in my client application to set the clientBaseAddress attribute to http://localhost:1689".  Note the different port number to the service configuration.  This is the address that the application will use to create the required callback channel.

To consume this service I created a class which implements the service’s callback interface (or implement it on the class calling the service) and created a new InstanceContext object to give to the proxy class when instantiating it.

Implementing the callback interface threw me a bit because I couldn’t use my interface defined in the services project (called IDataOutputCallback).  I tried to add a reference in my client project to my services project and used the interface from there and got the following exception when you try to consume the service:


_The InstanceContext provided to the ChannelFactory contains a UserObject that does not implement the CallbackContractType 'ConsoleApplication1.ServiceReference1.IServiceWithCallbackCallback'._


This showed that by adding a new service reference, we not only get a proxy class generated but also a new callback interface with a different name to the original one.  This new name is of the format “&lt;ServiceContractName&gt;Callback” hence the confusing generated interface name in my exception above.

The biggest benefit I have found in using duplex WCF services is that it allows for a publish-subscribe approach to exchanging data between devices.  When an application starts up it could call a service method called Subscribe and supply some form of identifier to associate it’s callback channel in a dictionary.  Then clients could communicate via a service method called Publish which would iterate the callbacks stored in the dictionary and send the message through each of them.

**Download:** [/uploads/WCFDuplexHTTP.zip](/uploads/WCFDuplexHTTP.zip)
