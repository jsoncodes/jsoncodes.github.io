---
comments: true
date: 2013-02-26 20:40:44+00:00
layout: post
slug: using-winmerge-with-git-in-windows
title: Using WinMerge with Git in Windows
wordpress_id: 595
tags:
- git
- tools
---

Recently I've started using Git as my main source control system after several months of very vocally complaining about it.  I liked the idea of Git and distributed source control in theory but my limited practical experiences had been full of difficulties.  I figured this was simply due to me not really knowing how to work with it; turned out I was right.  After learning the basics I started to really enjoy using Git, so I decided to move a couple of my projects from SVN to Git and have never looked back since!  Now all my code is in Git.

<!-- more -->

My one major gripe with using Git was the lack of an integrated visual diff tool; I just couldn't make sense of the git bash diff output.  A little bit of Googling found some StackOverflow questions that roughly pointed me in the right direction but didn't quite get things working for me.  In the end I toyed around with the settings in my .gitconfig file and came up with the following configuration which works for me:


    [user]
        name = Jason Mitchell
        email = <email address>
    [core]
        autocrlf = true
        editor = notepad.exe
    [diff]
        tool = winmerge
    [difftool "winmerge"]
        cmd = winmergeu.exe -e -ub -x -wl -u -maximise -dl "base" -dr "mine" \"$LOCAL\" \"$REMOTE\"
    [difftool]
        prompt = false
    [push]
        default = simple


Now I could happily use the Git difftool command and would get my diffs presented for me in the WinMerge GUI.  Note: the above config requires WinMerge to be added to your PATH environment variable.
