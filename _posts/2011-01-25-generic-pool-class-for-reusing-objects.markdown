---
comments: true
date: 2011-01-25 19:29:48+00:00
layout: post
slug: generic-pool-class-for-reusing-objects
title: Generic Pool Class for Reusing Objects
wordpress_id: 227
tags:
- c#
- data structures
- sample
- windows phone
- xna
---

When I am working with [XNA](http://create.msdn.com), I frequently found myself writing the same code in order to maintain lists of objects in memory and track free items that can be reinitialized to reduce garbage collection.  Eventually I had enough of doing this and decided to implement a generic Pool class in C# that would take care of this for me.

<!-- more -->

**Source for Pool class:**


    public class Pool<T>
    {
        private readonly List<T> items = new List<T>();
        private readonly Queue<T> freeItems = new Queue<T>();

        private readonly Func<T> createItemAction;

        public Pool(Func<T> createItemAction)
        {
            this.createItemAction = createItemAction;
        }

        public void FlagFreeItem(T item)
        {
            freeItems.Enqueue(item);
        }

        public T GetFreeItem()
        {
            if (freeItems.Count == 0)
            {
                T item = createItemAction();
                items.Add(item);

                return item;
            }

            return freeItems.Dequeue();
        }

        public List<T> Items
        {
            get { return items; }
        }

        public void Clear()
        {
            items.Clear();
            freeItems.Clear();
        }
    }


What this class is doing is maintaining all of the items in memory in a List and tracking all of the free items in a Queue.  When a new Pool is being created, a delegate is passed to the constructor which is then used to create a new item in the pool if no free items are available.

The code here is fairly simple; call GetFreeItem() to get a free item in the pool and call FlagFreeItem(objectInstance) to return an object to the free items queue.

And lastly, an example of how to use this code:


    private Pool<GameObject> objectPool = new Pool<GameObject>(() => new GameObject());

    public void Initialize()
    {
        GameObject gameObject = objectPool.GetFreeItem();
        gameObject.Initialize();
    }
