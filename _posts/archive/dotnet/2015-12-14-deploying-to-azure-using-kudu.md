---
comments: true
date: 2015-12-14 21:20
layout: post
title: Deploying to Azure Using Kudu
---

At work we have been integrating our deployment process into our TeamCity builds; our applications are built as regular web projects running on Azure.  We want to avoid the lock in of using Azure projects so we can't make use of the deployment options around that and we don't want to use Web Deploy because it is a bit meh.  After a bit of googling we found the [Kudu API](https://github.com/projectkudu/kudu/wiki/REST-API) which made this really easy to implement our deployments using PowerShell.

The Kudu API provides the endpoint ```/api/zip/{path}``` which will accept a zip file in a ```PUT``` request and then unzip it into the specified path within the Azure web application.  The snippet below shows how this works:

{% gist jasonmitchell/9049af9c9e5ba06cc3e1 zip-api.ps1 %}

This endpoint makes it really easy to deploy whatever we want to our web applications.  However the downside of this endpoint is that the zip extraction will not remove old files.  Thankfully the Kudu API also provides a way to deal with this via the ```/api/command``` endpoint.

The command endpoint provides a way of performing command line operations against your Azure web application.  This means it can be used to delete the existing deployment prior to extracting the new zip allowing us to deploy to a clean environment.  This snippet shows an example of deleting all files within the ```site\wwwroot``` directory:

{% gist jasonmitchell/9049af9c9e5ba06cc3e1 command-api.ps1 %}

These two API endpoints do all of the hard work for our deployments; the rest of the our deployment script just retrieves the credentials and URL for the API using the [Azure PowerShell cmdlets](https://github.com/Azure/azure-powershell).  The following PowerShell snippet shows a basic example of a deployment script:

{% gist jasonmitchell/9049af9c9e5ba06cc3e1 deploy.ps1 %}

Kudu has made our deployment process really easy to implement however I found it difficult to find this solution as there is a lot of online information regarding Web Deploy and Azure projects and it required a lot of sifting through the same solutions.
