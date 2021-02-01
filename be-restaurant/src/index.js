import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { ITEMS, schema } from './menu.js';

const mapPost = (item, id) => item && ({ id, ...item });

const root = {
  items: () => ITEMS.map(mapPost),
  item: ({ id }) => mapPost(ITEMS[id], id),
};

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

const port = process.env.PORT || 3000
app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/graphql`);
