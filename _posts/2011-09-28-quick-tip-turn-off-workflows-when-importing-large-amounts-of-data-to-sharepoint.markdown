---
date: 2011-09-28 21:49:24+00:00
layout: post
slug: quick-tip-turn-off-workflows-when-importing-large-amounts-of-data-to-sharepoint
title: 'Quick Tip: Turn off workflows when importing large amounts of data to SharePoint'
wordpress_id: 381
tags:
- data migration
- performance
- powershell
- quick tip
---

Recently at work I’ve been working on a script to import large amounts of data (~800,000 list items) into a SharePoint site.  The first version of the script had obvious performance issues and I had estimated it to run for 29 hours.  **Turning off workflows which start automatically when a new list item is created cut this time to around 3 hours.**


<!-- more -->


The following PowerShell code shows a basic function which can be used to toggle workflows on a list off and on.  It shouldn’t take much work to convert this to C# if needed.





    $snapin = "Microsoft.SharePoint.PowerShell"
    if((Get-PSSnapin -Name $snapin -ErrorAction SilentlyContinue) -eq $null)
    {
        Add-PsSnapin $snapin
    }

    $spWeb = Get-SPWeb http://sharepoint-site-url

    function toggle-workflows($listName, $enabled)
    {
        $prevVersionPattern = ".+`(Previous.+`)"
        $spList = $spWeb.GetList("/Lists/$listName")
        $spListWorkflows = $spList.WorkflowAssociations

        $latestWorkflow = $spListWorkflows | where-object {
              -not ($_.Name -match $prevVersionPattern) } | select-object -first 1
        if($latestWorkflow)
        {
            write-host "$listname workflow: $enabled" -fore yellow
            $latestWorkflow.AutoStartCreate = $enabled
            $spListWorkflows.Update($latestWorkflow)
        }
    }




This function retrieves the specified list finds the **first** associated workflow which doesn’t have the “(Previous.. )” text in its name and sets it to the specified enabled status.  If you have more than one active associated workflow on your list this code will need to be update to handle an array of workflows instead of just a single result.
