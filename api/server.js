require('dotenv').config();
const express = require('express');
const { connectToDb } = require('./db.js');
const { installHandler } = require('./api_handler.js');

const app = express();

installHandler(app);

const port = process.env.API_SERVER_PORT || 3000;

(async function unnamed() {
  try {
    await connectToDb();
    app.listen(port, () => {
      console.log(`API server started on port ${port}`);
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
}());

// const { MongoClient } = require('mongodb');


// const fs = require('fs');
// require('dotenv').config();

// const url = process.env.DB_URL || 'mongodb://localhost/issuetracker';

// const port = process.env.API_SERVER_PORT || 3000;

// let db;

// async function connectToDb() {
//   const client = new MongoClient(url, { useNewUrlParser: true });
//   await client.connect();
//   console.log('Connected to MongoDB at', url);
//   db = client.db();
// }

// const express = require('express');
// const { ApolloServer, UserInputError } = require('apollo-server-express');

// const { GraphQLScalarType } = require('graphql');
// const { Kind } = require('graphql/language');

// const GraphQLDate = new GraphQLScalarType({
//   name: 'GraphQLDate',
//   description: 'A Date() type in GraphQL as a scalar',
//   serialize(value) {
//     return value.toISOString();
//   },

//   parseValue(value) {
//     const dateValue = new Date(value);
//     return Number.isNaN(dateValue.getTime()) ? undefined : dateValue;
//   },

//   parseLiteral(ast) {
//     if (ast.Kind === Kind.STRING) {
//       const value = new Date(ast.value);
//       return Number.isNaN(value.getTime()) ? undefined : value;
//     }
//     return undefined;
//   },
// });

// let aboutMessage = 'Issue Tracker API v1.0';

// // const issuesDB = [
// //   {
// //     id: 1, status: 'New', owner: 'Ravan', effort: 5,
// //     created: new Date('2019-01-15'), due: undefined,
// //     title: 'Error in console when clicking Add',
// //   },
// //   {
// //     id: 2, status: 'Assigned', owner: 'Eddie', effort: 14,
// //     created: new Date('2019-01-16'), due: new Date('2019-02-01'),
// //     title: 'Missing bottom borderon panel',
// //   }
// // ];


// async function getNextSequence(name) {
//   const result = await db.collection('counters').findOneAndUpdate(
//     { _id: name },
//     { $inc: { current: 1 } },
//     { returnOriginal: false },
//   );
//   return result.value.current;
// }

// function issueValidate(issue) {
//   const errors = [];
//   if (issue.title.length < 3) {
//     errors.push('Field "title" must be at least 3 characters long.');
//   }
//   if (issue.status === 'Assigned' && !issue.owner) {
//     errors.push('Field "owner" is required when status is "Assigned"');
//   }
//   if (errors.length > 0) {
//     throw new UserInputError('Invalid input(s)', { errors });
//   }
// }

// async function issueAdd(_, { issue }) {
//   issueValidate(issue);
//   const newIssue = Object.assign({}, issue);
//   newIssue.created = new Date();
//   newIssue.id = await getNextSequence('issues');
//   if (issue.status === undefined) newIssue.status = 'New';
//   const result = await db.collection('issues').insertOne(newIssue);
//   const savedIssue = await db.collection('issues')
//     .findOne({ _id: result.insertedId });
//   return savedIssue;
// }

// async function issueList() {
//   const issues = await db.collection('issues').find({}).toArray();
//   return issues;
// }

// function setAboutMessage(_, { message }) {
//   aboutMessage = message;
//   return aboutMessage;
// }

// const resolvers = {
//   Query: {
//     about: () => aboutMessage,
//     issueList,
//   },
//   Mutation: {
//     setAboutMessage,
//     issueAdd,
//   },
//   GraphQLDate,
// };

// const server = new ApolloServer({
//   typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
//   resolvers,
//   formatError: (error) => {
//     console.log(error);
//     return error;
//   },
// });

// const app = express();

// const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
// console.log('CORS setting:', enableCors);
// server.applyMiddleware({ app, path: '/graphql', cors: enableCors });

// // app.listen(3000, function(){
// //     console.log('App started on port 3000');
// // });

// (async function start() {
//   try {
//     await connectToDb();
//     app.listen(port, () => {
//       console.log(`API server started on port ${port}`);
//     });
//   } catch (err) {
//     console.log('ERROR:', err);
//   }
// }());
