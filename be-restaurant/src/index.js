import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';

import { schema } from './schema.js'
import { ITEMS } from './menu.js';
import { STAFF } from './users.js';
import { ORDERS } from './orders.js';

const mapElement = (element, id) => element && ({ id, ...element });

const loggingMiddleware = (req, res, next) => {
  console.log(req.id);
  next();
}

const root = {
  items: () => ITEMS.map(mapElement),
  item: ({ id }) => mapElement(ITEMS[id], id),
  user: ({id}) => mapElement(STAFF[id], id),
  createOrder: ({ input: { id, items } }) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const totalPrice = items.reduce((acc, element) => acc + element.price, 0);
    ORDERS.push({id: ORDERS.length, items})
    console.log("ORDERS", ORDERS);
    return {items, totalPrice};
  },
};

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

const port = process.env.PORT || 8080
app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/graphql`);
