---
subject: Katas
title: HTTP API Kata
date: '2023-03-19T23:30:00.000Z'
tags:
  - kata
  - training
coverImage: ./http-api.jpg
coverImageCredit: Douglas Lopes on Unsplash
coverImageCreditUrl: https://unsplash.com/photos/ehyV_XOZ4iA
---

Code katas are exercises which are intended to be practised repetitively in order to help us improve
our skills in a given area. With each repetition we should aim to make small improvements and seek out
feedback. The goal of katas is not necessarily to arrive at the correct solution, but to provide an
approach for methodical practice. Good practice is the key to mastery.

This kata is quite large but intends to provide an exercise to help practice basic HTTP API development.

## Objective

Build an HTTP API backed by a database to support your team Kanban board. The API should follow REST
guidelines for URI naming, HTTP methods and status codes.

**Suggested Timebox:** 4 hours

## Requirements

You have been asked to build a backend to support the digitisation of your teams physical Kanban board.
Your board currently has the columns `To Do`, `In Progress`, `Testing`, and `Done` and your team has
the following types of work items:

- Stories
- Tasks
- Defects
- Spikes

This should be developed as an HTTP API which follows RESTful practices and should provide a full suite
of tests. The API should provide endpoints to add, edit, move and delete work items from the board.

The API must validate all requests and make logs available to aid in diagnosing issues.

## Additional Functionality

Time permitting, consider the following functionality:

- Assigning people to work items
- Provide history of changes to a work item
- Customisation of Kanban board columns
- WIP limits
- Hypermedia
