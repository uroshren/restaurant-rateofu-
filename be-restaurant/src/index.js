import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';

import { schema } from './schema.js'
import { ITEMS } from './menu.js';
import { STAFF } from './staff.js';
import { ORDERS } from './orders.js';
import { prepareFood, prepareDrinks } from './preparing.js';

const mapElement = (element, id) => element && ({ id, ...element });

const loggingMiddleware = (req, res, next) => {
  console.log(req.id);
  next();
}

const root = {
  items: () => ITEMS.map(mapElement),
  item: ({ id }) => mapElement(ITEMS[id], id),
  orders: ({ id }) => mapElement(ORDERS[id], id),
  staff: ({id}) => mapElement(STAFF[id], id),
  createOrder: ({ input: { items } }) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const totalPrice = items.reduce((acc, element) => acc + element.price, 0);
    const orderId = ORDERS.length
    const order = {orderId, items}
    ORDERS.push(order)
    const food = items.filter(item => item.type === "Food")
    const drinks = items.filter(item => item.type === "Drink")
    findAvailableWaiter(orderId);
    prepareDrinks(drinks);
    prepareFood(food, orderId);
    return {items, totalPrice};
  },
  login: ({ input: { name } }) => {
    const waiterIndex = STAFF.findIndex(staff => staff.name === name)
    STAFF[waiterIndex].available = true;

    return "Authorized";
  },
  logout: ({ input: { name } }) => {
    const waiterIndex = STAFF.findIndex(staff => staff.name === name)
    STAFF[waiterIndex].available = false;

    return "Non-Authorized";
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
