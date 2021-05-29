import session from 'express-session';
import express from 'express';
import expressGraphQL from 'express-graphql';
import graphqlM from 'graphql';
import supabaseJS from '@supabase/supabase-js';
import schema from './src/schema/index.js';
import populateDatabase from './src/populateDatabase.js';

const { printSchema } = graphqlM;

// We put objects in our database
const SUPABASE_URL = "https://yjvdjakagoiqxidfscvn.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMjEyMDYxOCwiZXhwIjoxOTM3Njk2NjE4fQ.bZh0eOwJ8jrEia5ZnXx3kREhvbUclk3Wfve5jTNqb7M";
const { createClient } = supabaseJS;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const port = process.env.PORT || 3000;
await populateDatabase(supabase);

console.log('Dumping GraphQL schema :\n');
console.log(printSchema(schema));

const { graphqlHTTP } = expressGraphQL;

const buildContext = (req) => {
  // Access the session to fetch the viewer…
  let viewer = null;
  if (req.session && req.session.viewer) {
    viewer = req.session.viewer;
  }

  return { req, viewer, supabase };
};

var app = express();

app.use(
  session({
    secret: 'A super secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000, secure: false },
  })
);

app.use(
  '/graphql',
  graphqlHTTP((req) => ({
    schema,
    context: buildContext(req),
    graphiql: {
      defaultQuery: `{
        logements {
          id
          name
        }
      }
      `,
    },
  }))
);

app.use('/login', (req, res) => {
  req.session.viewer = { username: 'Spyl' };
  res.send('Bienvenue Spyl ! <a href="/graphql">Retourner sur GraphiQL.</a>');
});

app.use('/logout', (req, res) => {
  req.session.destroy();
  res.send('Aurevoir ! <a href="/graphql">Retourner sur GraphiQL.</a>');
});

app.use('/', (_, res) => {
  res.send(`
    <a href="/graphql">GraphiQL</a>
    <a href="/login">Login</a>
    <a href="/logout">Logout</a>
  `);
});

app.listen(port);
console.log('Running index at http://localhost:3000/');
console.log('Running a GraphQL API server at http://localhost:3000/graphql');
