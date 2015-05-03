---
comments: true
date: 2012-01-22 21:10:38+00:00
layout: post
slug: getting-started-with-fluent-nhibernate-and-auto-mapping-in-c
title: Getting Started With Fluent NHibernate and Auto Mapping in C#
wordpress_id: 457
tags:
- data access
- nhibernate
- sample
---

I always hear good things about NHibernate and how it is better than alternatives such as Entity Framework so I decided to try it out for myself; not being a fan of large XML configuration files I went the route of using Fluent NHibernate which provides a [fluent interface](http://en.wikipedia.org/wiki/Fluent_interface) for configuration purposes.  Even though I've recently become a big fan of ASP.NET MVC 3 I decided to try out NHibernate in an ASP.NET Web Forms application since that's what I work with every day.




<!-- more -->




**Note: I've provided a download link to my code at the end of this article.**




I started out by creating an empty ASP.NET project and added a basic web form which creates a GridView to display some results from the database (which I've included in the App_Data folder).  Next using [NuGet](http://nuget.org/) (one of the best tools ever!) I installed the Fluent NHibernate package and all of its dependencies in my web application.




I created the following class to represent a single record from tUser in my application:





    public class User
    {
        public virtual int ID { get; set; }
        public virtual string EmailAddress { get; set; }
        public virtual string Password { get; set; }
    }




Note the use of the virtual keyword here.  Without it we would get an NHibernate.InvalidProxyTypeException with an error message similar to:





<blockquote>The following types may not be used as proxies:
WebApplication1.Entities.User: method get_Password should be 'public/protected virtual' or 'protected internal virtual'
WebApplication1.Entities.User: method set_Password should be 'public/protected virtual' or 'protected internal virtual'</blockquote>




The next step was to set up and configure NHibernate for my application.  For database access using NHibernate we need two objects; ISessionFactory and ISession.  The ISessionFactory interface is created during the fluent configuration of NHibernate and allows us to "open" a session by calling mySessionFactory.OpenSession().  This method call returns an instance of ISession which can then be used to create queries, handle transactions and add/remove/update items in the database.




I wanted to only create a single session factory for the entire application and a open a single session per request so I added a Global.asax file to my project in order to take advantage of the Application_Start and Application_BeginRequest events.  This is where I configured my application using the code below:





    public class Global : System.Web.HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            Application["NHSessionFactory"] = CreateSessionFactory();
        }

        private static ISessionFactory CreateSessionFactory()
        {
            return Fluently.Configure()
                .Database(MsSqlConfiguration.MsSql2008
                    .ConnectionString(ConfigurationManager.AppSettings["ConnectionString"]))
                .Mappings(m => m.AutoMappings.Add(CreateAutomappings))
                .BuildSessionFactory();
        }

        private static AutoPersistenceModel CreateAutomappings()
        {
            return AutoMap
                .AssemblyOf<AutomappingConfiguration>(new AutomappingConfiguration())
                .Override<User>(u => u.Table("tUser"));
        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            ISessionFactory sessionFactory = (ISessionFactory) Application["NHSessionFactory"];
            Context.Items["NHSession"] = sessionFactory.OpenSession();
        }

        protected void Application_EndRequest(object sender, EventArgs e)
        {
            ISession session = (ISession) Context.Items["NHSession"];
            session.Dispose();
        }

        protected void Application_End(object sender, EventArgs e)
        {
            ISessionFactory sessionFactory = (ISessionFactory)Application["NHSessionFactory"];
            sessionFactory.Dispose();
        }
    }




The Application_Start method is responsible for creating my session factory by calling the CreateSessionFactory method and storing it at the application level.  The CreateSessionFactory method sets the connection string and sets up the auto mapping by calling the CreateAutomappings.  This method sets the auto mapping configuration which defines what classes to automatically and overrides the table name that my User class should map to.  The auto mapping configuration provides quite a lot of functionality not covered in this article but you can find some examples of configuration at [http://wiki.fluentnhibernate.org/Auto_mapping](http://wiki.fluentnhibernate.org/Auto_mapping).




In the Application_BeginRequest method I retrieve the my application's session factory, open a new session and attach it to the current requests context so it can be accessed in my ASP.NET pages:





    protected void Page_Load(object sender, EventArgs e)
    {
        ISession session = (ISession) Context.Items["NHSession"];
        CreateUsers(session);

        var users = from u in session.Query<User>()
                    select u;

        grdUsers.DataSource = users;
        grdUsers.DataBind();
    }

    private void CreateUsers(ISession session)
    {
        if(session.Query<User>().Count() < 3)
        {
            using(ITransaction transaction = session.BeginTransaction())
            {
                for (int i = 1; i <= 3; i++)
                {
                    User user = new User
                    {
                        EmailAddress = string.Format("user{0}@test.com", i),
                        Password = "password"
                    };
                    session.Save(user);
                }

                transaction.Commit();
            }
        }
    }




The first line of this method retrieves the session from the request context and can then be used to query the database.  The "CreateUsers" method shows a simple insert into the database using a transaction.  This is followed by a really simple Linq expression which queries the database for all of the User records.  I should point out that in order to use Linq expressions for queries I needed add a using statement for the NHibernate.Linq namespace.




This basic set up of Fluent NHibernate is okay but it could be improved upon so I'm going to write a follow up article on using Fluent NHibernate with dependency injection to improve the structure of the code.  And as promised the download link for the code can be found below; in order to build this project **you will need to have NuGet installed** as I'm using the [NuGetPowerTools](http://nuget.org/packages/NuGetPowerTools) package to retrieve all of the required DLLs when the project is built.




**Download Link:** [http://www.jason-mitchell.com/Uploads/Fluent_NHibernate_Getting_started.zip](http://www.jason-mitchell.com/Uploads/Fluent_NHibernate_Getting_started.zip)
