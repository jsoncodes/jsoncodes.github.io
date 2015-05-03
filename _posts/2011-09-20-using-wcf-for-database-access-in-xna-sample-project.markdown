---
author: jmitch18
comments: true
date: 2011-09-20 20:38:20+00:00
layout: post
slug: using-wcf-for-database-access-in-xna-sample-project
title: 'Using WCF for database access in XNA: Sample Project'
wordpress_id: 378
categories:
- Game Development
tags:
- c#
- data access
- database
- wcf
- web services
- xna
---

I spent a bit of time this evening on the phone talking to a friend about life, the universe and work.  We got around to talking a bit about accessing a database from within an XNA application so I thought I would make a quick sample and post it on here.


<!-- more -->


This project uses a simple WCF service to get some text from the database on the server and to store details of clicks within the game in the database.  On the server-side it uses LINQ to SQL to interact with the database for retrieving and adding records.




Before running this sample you should probably do a full rebuild of the solution and then update the service reference in the WindowsGame1 project.  Get it from the link below:




**_Download: [http://www.jason-mitchell.com/Uploads/XNAWCFSample-20_09_2011.zip](http://www.jason-mitchell.com/Uploads/XNAWCFSample-20_09_2011.zip)_**
