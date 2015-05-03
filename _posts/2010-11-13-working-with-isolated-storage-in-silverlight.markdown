---
author: jmitch18
comments: true
date: 2010-11-13 15:59:35+00:00
layout: post
slug: working-with-isolated-storage-in-silverlight
title: Working with Isolated Storage in Silverlight
wordpress_id: 211
categories:
- Mobile Development
tags:
- c#
- data access
- Isolated Storage
- sample
- silverlight
- windows phone
---

When using [Silverlight](http://www.silverlight.net/), developers have no direct access to the file system on a user’s computer.  However Silverlight does use [isolated storage](http://www.silverlight.net/learn/quickstarts/isolatedstorage/http://www.silverlight.net/learn/quickstarts/isolatedstorage/) as a virtual file system to store data on machines providing the application has the correct file permissions to do so.  Additionally, Windows Phone 7 uses isolated storage for saving data to the phone which prevents applications interfering with each others data.

Since the Windows Phone 7 developer tools were released, I have playing around with developing little apps for the phone to get to grips with the basics of app development for the platform.  When I got around to playing with isolated storage on the phone, I quickly got tired of writing the same code over and over again (I like to try and keep my code [DRY](http://en.wikipedia.org/wiki/Don%27t_repeat_yourself)).  For this reason, I decided to create a short helper class which uses delegates to help reduce the amount of repeated code I was writing.

<!-- more -->

**IsolatedStorageHelper**

    
    public static class IsolatedStorageHelper
    {
        public static object FileOperation(string fileName, FileMode fileMode, FileAccess fileAccess, Func<Stream, object> fileOperation)
        {
            using (IsolatedStorageFile userStore = IsolatedStorageFile.GetUserStoreForApplication())
            {
                using (IsolatedStorageFileStream stream = new IsolatedStorageFileStream(fileName, fileMode, fileAccess, userStore))
                {
                    return fileOperation(stream);
                }
            }
        }
    
        public static void FileOperation(string fileName, FileMode fileMode, FileAccess fileAccess, Action<Stream> fileOperation)
        {
            FileOperation(fileName, fileMode, fileAccess, stream =>
                                                                {
                                                                    fileOperation(stream);
                                                                    return null;
                                                                });
        }
    }


Using this class is pretty simple.  I use it frequently in my test Windows Phone 7 applications to load and save XML.  Here’s an example:

    
    xDoc = IsolatedStorageHelper.FileOperation("myFile.xml", FileMode.Open, FileAccess.Read, stream => XDocument.Load(stream)) as XDocument;
