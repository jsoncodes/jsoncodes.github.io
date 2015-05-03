---
author: jmitch18
comments: true
date: 2011-09-02 19:43:57+00:00
layout: post
slug: asp-net-the-incoming-tabular-data-stream-tds-remote-procedure-call-rpc-protocol-stream-is-incorrect
title: The incoming tabular data stream (TDS) remote procedure call (RPC) protocol
  stream is incorrect
wordpress_id: 374
categories:
- Software Development
tags:
- asp.net
- debugging
- exceptions
- linq to sql
---

While working on my current ASP.NET project at work I encountered the following error when trying to call the SubmitChanges method on my LINQ to SQL data context:





<blockquote>

> 
> _The incoming tabular data stream (TDS) remote procedure call (RPC) protocol stream is incorrect. Parameter 3 ("@p0"): The supplied value is not a valid instance of data type float. Check the source data for invalid values. An example of an invalid value is data of numeric type with scale greater than precision._
> 
> 
</blockquote>


<!-- more -->


This error message was accompanied with the following stack trace showing the exception being thrown from deep within the bowels of LINQ to SQL:





<blockquote>System.Data.SqlClient.SqlConnection.OnError(SqlException exception, Boolean breakConnection) +2062078
System.Data.SqlClient.SqlInternalConnection.OnError(SqlException exception, Boolean breakConnection) +5050204
System.Data.SqlClient.TdsParser.ThrowExceptionAndWarning() +234
System.Data.SqlClient.TdsParser.Run(RunBehavior runBehavior, SqlCommand cmdHandler, SqlDataReader dataStream, BulkCopySimpleResultSet bulkCopyHandler, TdsParserStateObject stateObj) +2275
System.Data.SqlClient.SqlDataReader.ConsumeMetaData() +33
System.Data.SqlClient.SqlDataReader.get_MetaData() +86
System.Data.SqlClient.SqlCommand.FinishExecuteReader(SqlDataReader ds, RunBehavior runBehavior, String resetOptionsString) +311
System.Data.SqlClient.SqlCommand.RunExecuteReaderTds(CommandBehavior cmdBehavior, RunBehavior runBehavior, Boolean returnStream, Boolean async) +987
System.Data.SqlClient.SqlCommand.RunExecuteReader(CommandBehavior cmdBehavior, RunBehavior runBehavior, Boolean returnStream, String method, DbAsyncResult result) +162
System.Data.SqlClient.SqlCommand.RunExecuteReader(CommandBehavior cmdBehavior, RunBehavior runBehavior, Boolean returnStream, String method) +32
System.Data.SqlClient.SqlCommand.ExecuteReader(CommandBehavior behavior, String method) +141
System.Data.SqlClient.SqlCommand.ExecuteDbDataReader(CommandBehavior behavior) +12
System.Data.Common.DbCommand.ExecuteReader() +12
System.Data.Linq.SqlClient.SqlProvider.Execute(Expression query, QueryInfo queryInfo, IObjectReaderFactory factory, Object[] parentArgs, Object[] userArgs, ICompiledSubQuery[] subQueries, Object lastResult) +1266
System.Data.Linq.SqlClient.SqlProvider.ExecuteAll(Expression query, QueryInfo[] queryInfos, IObjectReaderFactory factory, Object[] userArguments, ICompiledSubQuery[] subQueries) +113
System.Data.Linq.SqlClient.SqlProvider.System.Data.Linq.Provider.IProvider.Execute(Expression query) +344
System.Data.Linq.StandardChangeDirector.DynamicInsert(TrackedObject item) +151
System.Data.Linq.StandardChangeDirector.Insert(TrackedObject item) +235
System.Data.Linq.ChangeProcessor.SubmitChanges(ConflictMode failureMode) +336
System.Data.Linq.DataContext.SubmitChanges(ConflictMode failureMode) +378
System.Data.Linq.DataContext.SubmitChanges() +23</blockquote>




The exception message is very specific about what the problem actually was: _“The supplied value is not a valid instance of data type float”.  _After a bit of searching the internet I found that the issue could be caused by trying to insert a double with an actual value of “NaN” or negative/positive infinity.  After a bit of investigation I was able to confirm that a value of “NaN” was being passed in therefore causing this exception.




After a bit more searching I found out that that **_a “NaN” value is generated as the result of dividing 0 by 0_**.  In the project I’ve been working on this calculation is entirely possible as it performs calculations using external data.  To fix the issue I determined what calculation was generating the “NaN” values and used the **double.IsNaN** method to check for any invalid values and replaced them with 0.
