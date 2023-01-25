---
subject: Software Delivery
title: Never Release to Production on a Friday...or Should We?
date: '2023-03-09T20:45:00.000Z'
tags:
  - devops
  - software delivery
  - continuous deployment
  - practices & principles
coverImage: ./never-release-on-a-friday.jpg
coverImageCredit: Viktor Forgacs on Unsplash
coverImageCreditUrl: https://unsplash.com/photos/D8dT3yXZSUA
---

"Never release to production on a Friday!". It's a very common thing to hear and I've said it myself.
The idea is that we shouldn't release to production on a Friday to avoid the risk of releasing something
broken to production which may affect our users over the weekend and potentially require someone to be
called up to fix it over the weekend.

Why shoudn't we release on a Friday? What could possibly go wrong? You have a continuous integration build.
Your unit tests passed (lol). Your integration tests passed. Your team tested everything in a test environment
and gave it the thumbs up 👍.

However despite our best efforts problems will get through to production from time-to-time and when they do
we need to get a fix ready and deployed quickly. We don't want the reputational damage that comes with a
production-breaking bug which affects users all weekend. Nobody really wants to be on call over the weekend,
and if they are on call they want to spend their time without alerts from work. Nobody wants to prepare a
fix late on a Friday or over the weekend.

All this means we decide that we won't release a Friday.

### Does it have to be this way?

No, but as always the true answer is "it depends". I would generally advocate that you should have the
capability to safely release at any time but there are some caveats and environments where this may
not work well for the teams involved.

If you are doing large batch releases into production, such as releasing a 2 week (or more) sprint worth
of work, then not releasing on Fridays can be a wise decision. The larger the batch size of work being
released then the more risk is associated with the release and can be higher to triage any production issues.

Also, when your build and deployment processes are slow then your ability to react to any issues
caused by a release will be impacted. If takes three hours to produce a build and roll it out to
production then it's doubtful that there would be enough time in the standard working day to fix an
issue and deploy it. In the case of a critical issue then one or more people on your team are potentially
going to have their Friday evening (or maybe their weekend) ruined to get it fixed.

## Getting comfortable with releasing on a Friday

Maybe this title should be more general? Perhaps "Getting comfortable with releasing?" would be right? The
same patterns and practices which would help us to release on a Friday safely would help us release on any
day of the week.

Practices such as automated testing (both unit and integration testing) should be a fundamental part of
any release process to help assert the quality of the release. Beyond this, there are two key points
which I believe are critical to becoming comfortable with releasing any time:

1. Continuously release small, focused increments to production as they become ready
2. Ensure your build and release process is quick enough to enable a fast feedback loop

By releasing continuously releasing small increments, we reduce the batch size we deploy into production
at any time which helps to reduce risks associated with changes and it makes it easier to identify what has
caused any issues. Doing this regularly, potentially many times a day, will make releasing to production
so routine that releases will barely be something your team is concerned about.

But we all know that things can go wrong despite our best efforts and when we do we need to patch them
and get the release out. Having the capability to quickly build and release to a production environment
can reassure us that if something does go wrong, we can fix it and deploy changes with a fairly quickly
and minimise disruption to users.

For me these two things, combined with a good suite of automated tests, enables me to be comfortable
releasing at any time. There are obviously other things we can do such as practicing continuous integration
and designing software to be built from discrete components, but small batch sizes and a fast feedback
loop are so fundamental that I consider them key.

## Be a responsible developer

Even though I'm in favour of enabling development teams to deploy on Fridays, I'm not arguing that it
is always appropriate. I have a general expectation that teams act in a way where they take responsibility
and consider the context in what they are doing and this would apply to releasing software at any time.

- Is there enough time to deploy a fix before the end of day? No? Then don't deploy.
- Does the change have some inherent risk (like transforming some data on deploy)? Yes? Then don't deploy.
- Do your releases generally tend to introduce new problems? Yes? Then don't deploy (and fix that btw).
