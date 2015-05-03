---
author: jmitch18
comments: true
date: 2010-05-16 18:26:49+00:00
layout: post
slug: mvvm-for-silverlight-windows-phone-7-app
title: MVVM for Silverlight (Windows Phone 7 App)
wordpress_id: 136
categories:
- Mobile Development
tags:
- c#
- mvvm
- sample
- silverlight
- windows phone
---

For a little while now I've had a bit of interest in the Model View ViewModel ([MVVM](http://en.wikipedia.org/wiki/MVVM)) pattern for [Silverlight](http://www.silverlight.net) and [WPF](http://msdn.microsoft.com/en-us/library/ms754130.aspx) so I thought I would finally give it a go and see if I could get an understanding of how to use this pattern.


<!-- more -->[![Twitter timeline application](http://www.jason-mitchell.com/images/blog/MVVMforSilverlightWindowsPhone7App_E533/image_thumb.png)](http://www.jason-mitchell.com/images/blog/MVVMforSilverlightWindowsPhone7App_E533/image.png)


I had no prior knowledge of the details of MVVM so I needed to do a bit of research.  Thankfully, there seems to be no shortage of information on the web about it.  I found Wikipedia to have a useful article about it at [http://en.wikipedia.org/wiki/MVVM](http://en.wikipedia.org/wiki/MVVM) (especially the "Pattern Description" section) and also an article on [MSDN](http://msdn.microsoft.com/) by [Shawn Wildermuth](http://wildermuth.com/) at [http://msdn.microsoft.com/en-us/magazine/dd458800.aspx](http://msdn.microsoft.com/en-us/magazine/dd458800.aspx).  The second article is for Silverlight 2 so it's a little bit outdated, however I still found it incredibly useful.




In this article I'm going to walkthrough the creation of the basic Windows Phone 7 Twitter application pictured to the right.  If you do not have the tools for Windows Phone 7 development, you can find some information about them at [t](http://developer.windowsphone.com)he [App Hub](http://create.msdn.com).  If you have no interest in getting the tools, then you should find that most of the content in this article is applicable to a regular Silverlight project as well.  For this project, I used Expression Blend 4 RC and the Windows Phone add-in (see [here](http://electricbeach.org/?p=671) for the April 2010 refresh) and Visual Studio 2010 Ultimate (but any version should do).




I created a new Windows Phone Application project in Blend 4 and called it TwitterTimelineDemo and began by making some minor changes to the application and page titles as seen in the picture of my application.  Since this is just a quick application for experimentation, I have simply hardcoded my name into the TextBlock for the page title.




Next I added a simple class called Tweet to represent all tweets in the user's timeline:




    
    using System;
    
    namespace TwitterTimelineDemo
    {
        public class Tweet
        {
            public string Status { get; set; }
            public DateTime Date { get; set; }
        }
    }




This class would act as the **Model** in my application.  The Model is an object that represents the content to be displayed.  In this example I am keeping this very basic and only pulling in the user's status and the date it was posted.




Now we will create our **ViewModel** class called TweetViewModel.  The ViewModel is an abstraction of our View and will present our Model in a consumable manner appropriate to the View.  Our ViewModel will populate and hold a collection of Tweet objects (our Model) that we can bind to in the View to present them to the user.  Here is the initial code for the basic ViewModel:




    
    using System.Collections.ObjectModel;
    
    namespace TwitterTimelineDemo
    {
        public class TweetViewModel
        {
            private readonly ObservableCollection<Tweet> tweets = new ObservableCollection<Tweet>();
    
            public ObservableCollection<Tweet> Tweets
            {
                get { return tweets; }
            }
        }
    }




[![image](http://www.jason-mitchell.com/images/blog/MVVMforSilverlightWindowsPhone7App_E533/image_thumb_3.png)](http://www.jason-mitchell.com/images/blog/MVVMforSilverlightWindowsPhone7App_E533/image_3.png) Next, I created the **View** for my application.  The View refers to all our visual elements and will bind to our ViewModel.  At this point, we can now use Blend's sample data feature to style our View without needing to write any code to download tweets.  This is a great feature for designing an application in Blend.  We can create our sample data from an existing class in our project but first we will need to build it from Blend's project menu.  Once it has been built, we can open the Data pane on the right-hand side, click the second button from the right, and then select "Create Sample Data from Class..." and then select our TweetViewModel class from the list.




In order to display our sample data, expand the TweetViewModel source and drag the Tweets collection to the controls LayoutRoot grid.  This will create a ListBox containing the sample data; reset it's margins to make it fill the entire grid.  You can now style the individual list items by editing the ListBox's ItemTemplate.




Now we need to add our TweetView control to MainPage.xaml.  Drag TweetView from the Project section in the Assets pane on the left-hand side of the screen onto the ContentGrid of MainPage.xaml (if it is not there, try rebuilding the project).  Select the newly added control and reset the width and height, change the horizontal and vertical alignments to stretch and reset the margins so it fills the grid.  I don't see my sample data when I drag the control to MainPage.xaml and I suspect you can only see it in the control it was added to (**any confirmation?**).  At this stage, I am now done with MainPage.xaml and my XAML looks like:




    
    <phoneNavigation:PhoneApplicationPage
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:phoneNavigation="clr-namespace:Microsoft.Phone.Controls;assembly=Microsoft.Phone.Controls.Navigation"
        xmlns:local="clr-namespace:TwitterTimelineDemo"
        x:Class="TwitterTimelineDemo.MainPage"
        FontFamily="{StaticResource PhoneFontFamilyNormal}"
        FontSize="{StaticResource PhoneFontSizeNormal}"
        Foreground="{StaticResource PhoneForegroundBrush}">
    
        <Grid x:Name="LayoutRoot" Background="{StaticResource PhoneBackgroundBrush}">
            <Grid.RowDefinitions>
                <RowDefinition Height="Auto"/>
                <RowDefinition Height="*"/>
            </Grid.RowDefinitions>
    
            <Grid x:Name="TitleGrid" Grid.Row="0">
                <TextBlock Text="Twitter Timeline" x:Name="textBlockPageTitle" Style="{StaticResource PhoneTextPageTitle1Style}"/>
                <TextBlock Text="jmitch18" x:Name="textBlockListTitle" Style="{StaticResource PhoneTextPageTitle2Style}"/>
            </Grid>
    
            <Grid x:Name="ContentGrid" Grid.Row="1">
                <local:TweetView/>
            </Grid>
        </Grid>
    
    </phoneNavigation:PhoneApplicationPage>




Now, we need to populate the ViewModel's tweet collection with real data.  Twitter feeds are downloaded in an XML format so I used LINQ to extract Tweets.  I added a project reference to System.Xml.Linq and created the following method called GetTwitterEntries in TweetViewModel.cs to return my tweets.  **Be sure to add "using System.Linq;" and any other required using statements at the top of the class to prevent build errors.**




    
    private IEnumerable<Tweet> GetTwitterEntries(string twitterFeed)
    {
        XNamespace atomNS = "http://www.w3.org/2005/Atom";
        XDocument feed = XDocument.Parse(twitterFeed);
    
        IEnumerable<Tweet> entries = from tweet in feed.Descendants(atomNS + "entry")
                                     select new Tweet
                                     {
                                         Status = (string)tweet.Element(atomNS + "title"),
                                         Date = DateTime.Parse((string)tweet.Element(atomNS + "published"))
                                     };
    
        return entries;
    }




To get tweets for my username (jmitch18) I would use the URL [http://search.twitter.com/search.atom?q=from%3Ajmitch18](http://search.twitter.com/search.atom?q=from%3Ajmitch18).  To get tweets for any other user, just replace my name.  In production code, we would get the username from some more dynamic source, but for the purposes of experimentation I have opted for hard coding it.  I added the following constructor and event handler to my TweetViewModel class to populate it's collection with real data:




    
    public TweetViewModel()
    {
        WebClient webClient = new WebClient();
        webClient.DownloadStringCompleted += new DownloadStringCompletedEventHandler(DownloadStringCompleted);
        webClient.DownloadStringAsync(new Uri("http://search.twitter.com/search.atom?q=from%3Ajmitch18", UriKind.Absolute));
    }
    
    private void DownloadStringCompleted(object sender, DownloadStringCompletedEventArgs e)
    {
        foreach (Tweet tweet in GetTwitterEntries(e.Result))
            tweets.Add(tweet);
    }




The last required step is to bind the ViewModel to the View.  I opened TweetView.xaml in Blend and selected it's LayoutRoot grid in the Objects pane.  Under the Common Properties section on the Properties pane, you will see a heading "DataContext"; click the "New" button next to it and select TweetViewModel from the list.  Now if you run the application, after a brief second for loading, you should see a list of real tweets displayed.




This article is based on my current understanding of the MVVM pattern.  I would not say this code is production ready but I am open to constructive feedback and suggested improvements on the topic of this article.  Please feel free to contact me or use the comments section.


**Sample project: **[http://www.jason-mitchell.com/uploads/TwitterTimelineDemo.zip](http://www.jason-mitchell.com/uploads/TwitterTimelineDemo.zip)
