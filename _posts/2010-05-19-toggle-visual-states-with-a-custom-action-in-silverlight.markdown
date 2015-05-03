---
author: jmitch18
comments: true
date: 2010-05-19 21:12:07+00:00
layout: post
slug: toggle-visual-states-with-a-custom-action-in-silverlight
title: Toggle Visual States with a Custom Action in Silverlight
wordpress_id: 155
categories:
- Software Development
tags:
- c#
- sample
- silverlight
---

I was recently working on a project in [Silverlight](http://www.silverlight.net) and required the ability to toggle between two states in a UserControl.  When I started working with Silverlight, I would have handled click or mouse events to change the visual state but I soon moved on to work with behaviours and actions so I could remove such code from my code-behind files.  Since an to toggle between two visual states did not exist, this seemed like an ideal opportunity to make my first custom action.

<!-- more -->

This is just a quick article and since there is nothing too complex here I have just posted the code here:

    
    using System.Collections;
    using System.Windows;
    using System.Windows.Controls;
    using System.Windows.Interactivity;
    
    namespace IssueTracker.Actions
    {
        [DefaultTrigger(typeof(FrameworkElement), typeof(System.Windows.Interactivity.EventTrigger),
                        "MouseLeftButtonUp")]
        public class ToggleStateAction : TargetedTriggerAction
        {
            public static readonly DependencyProperty OffStateProperty;
            public static readonly DependencyProperty OnStateProperty;
            public static readonly DependencyProperty UseTransitionsProperty;
    
            private bool isOnStateActive;
    
            static ToggleStateAction()
            {
                OffStateProperty = DependencyProperty.Register("OffState", typeof(string), 
                                          typeof(ToggleStateAction), null);
                OnStateProperty = DependencyProperty.Register("OnState", typeof(string), 
                                           typeof(ToggleStateAction), null);
                UseTransitionsProperty = DependencyProperty.Register("UseTransitions", typeof(bool),
                                                  typeof(ToggleStateAction), null);
            }
    
            protected override void Invoke(object o)
            {
                Control control = FindTargetElement(Target) as Control;
    
                if (isOnStateActive)
                    VisualStateManager.GoToState(control, OffState, UseTransitions);
                else
                    VisualStateManager.GoToState(control, OnState, UseTransitions);
    
                isOnStateActive = !isOnStateActive;
            }
    
            private static FrameworkElement FindTargetElement(FrameworkElement element)
            {
                FrameworkElement parent = element;
    
                while (parent != null)
                {
                    IList vsgs = VisualStateManager.GetVisualStateGroups(parent);
                    if (vsgs != null && vsgs.Count > 0)
                    {
                        Control control = parent.Parent as Control;
                        if (control != null)
                            return control;
                        return parent;
                    }
                    parent = parent.Parent as FrameworkElement;
                }
    
                return null;
            }
    
            public string OffState
            {
                get { return (string)GetValue(OffStateProperty); }
                set { SetValue(OffStateProperty, value); }
            }
    
            public string OnState
            {
                get { return (string)GetValue(OnStateProperty); }
                set { SetValue(OnStateProperty, value); }
            }
    
            public bool UseTransitions
            {
                get { return (bool)GetValue(UseTransitionsProperty); }
                set { SetValue(UseTransitionsProperty, value); }
            }
        }
    }


One of the really nice things when using custom actions is that if you are using Expression Blend, the designer will pick up on your properties and provide you with the ability to edit them without needing to touch the XAML.  It's worth pointing out that I had to add the method "FindTargetElement" to return the control to use in the transition.  In fact, I nabbed this code right out of the source for the GoToState which can be seen at [http://expressionblend.codeplex.com](http://expressionblend.codeplex.com).
