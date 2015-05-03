---
author: jmitch18
comments: true
date: 2011-04-30 10:57:54+00:00
layout: post
slug: observable-properties-in-xna
title: Observable Properties in XNA
wordpress_id: 304
categories:
- Game Development
tags:
- c#
- infrastructure
- observable
- sample
- xna
---

I like to experiment a lot with XNA to try and find ways of doing things which I haven’t tried before.  Recently I have been doing some reading around the [.NET Reactive Extensions](http://msdn.microsoft.com/en-us/data/gg577609) and thought that it might be pretty useful to use something like that in an XNA game.  I played around with it a little bit and thought it was a little bit too “heavy” for what I wanted to do since it seems like I would need to define my observers as well as my observables. I was really looking for something that only required me to define my observable properties and subscribe to them using delegates without my other game engine classes needing to know anything about them.  By removing the knowledge of observers and observables from the other game engine classes it leaves the choice of whether or not to use a subscription-based approach open.

<!-- more -->

The implementation of this seemed pretty simple.  I create a new class called Observable which provides methods for (un)subscribing and a property to access the actual value held by the class.  It uses a generic type to define the the value property so it should work in most cases.  So here is the class:

    
    public class Observable<T>
    {
        private readonly List<Action<T>> subscriptions = new List<Action<T>>();
        private T observableValue;
    
        public Action<T> Subscribe(Action<T> callback)
        {
            subscriptions.Add(callback);
            return callback;
        }
    
        public void Unsubscribe(Action<T> callback)
        {
            subscriptions.Remove(callback);
        }
    
        public void UnsubscribeAll()
        {
            subscriptions.Clear();
        }
    
        private void NotifyValueChanged()
        {
            foreach (Action<T> callback in subscriptions)
                callback(observableValue);
        }
    
        public T Value
        {
            get { return observableValue; }
            set
            {
                observableValue = value;
                NotifyValueChanged();
            }
        }
    }


The class is really simple so I don’t think its worth stepping through the code and explaining it all.  The only thing I do want to point out is the Subscribe method.  It returns the exact same delegate as was passed into the method.  This is really just for convenience if you use a lambda expression to subscribe and need to hold on to it to unsubscribe from the Observable instance later.

To use this class all you need to do is define a new instance of the Observable type (you can see this in the attached demo project) and then use the Value property to set the data in the class.  For example if you wanted an observable Vector2 instance you would define it as “Observable<Vector2> position = new Observable<Vector2>()” and then set its value by using “position.Value = new Vector2(……)”.

I can see using an approach like this would be useful in a few situations.  First of all I think it would be great for separating a game’s logic from its graphics by allowing the graphics in the game to subscribe to the positions of logical entities however there is a bit of redundant data in this approach.  I have also thought that it could be very useful in developing an artificial intelligence framework.  Elements in the game could subscribe to changes in the state of an AI agent and run some code when it changes.  I’m really just throwing around some ideas here.

**Update:**
So I had a bit of a thought about the class in this post. It's all well and good when you want to be notified of _every_ change to a property but at the minute I can't think of a scenario in XNA when I would want that to happen.  Perhaps maybe a position gets modified multiple times in one update (e.g. moving player and finding a collision then "fixing" the players position) which in my sample would result in loads of code being executed for no real reason.  I'm currently playing with a different approach to implement this kind of process which makes use of a GameComponent to notify all interested objects once per update if something has changed.  I will probably post that when I am happy with it - so far I have removed the need for the Observable class in this article but the objects containing observable values must implement an interface for use with the game component.  At the minute I'm trying INotifyPropertyChanged to avoid adding a custom interface but there seems to be a couple of issues that I need to work out here.

**_Sample Project: [http://www.jason-mitchell.com/uploads/XNAObservableDemo-30_04_2011.zip](http://www.jason-mitchell.com/uploads/XNAObservableDemo-30_04_2011.zip)_**
