import { STAFF } from './staff.js';
import { ORDERS } from './orders.js';

const setOrderAvailable = ({ orderId, foodOrDrink }) => ORDERS[orderId] = foodOrDrink;
const delay = ms => new Promise(res => setTimeout(res, ms));
const waitTillCompletion = async (totalTime, orderId, index, foodOrDrink) => {
  await delay(totalTime*1000)
  setOrderAvailable({ orderId, foodOrDrink })
}

export const prepareFood = (food, orderId) => {
  const theChefThatWillCook = STAFF.find(staff => (staff.type === "Chef") && (staff.available === true))
  const chefIndex = STAFF.findIndex(staff => staff.name === theChefThatWillCook.name)
  const totalTime = food.reduce((acc, element) => acc + (element.time * element.quantity), 0);
  waitTillCompletion({ totalTime, orderId, index: chefIndex, foodOrDrink: 'food' })
}

export const prepareDrinks = (drinks, orderId) => {
  const theBarmanThatWillMakeDrinks = STAFF.find(staff => (staff.type === "Barman") && (staff.available === true))
  const barmanIndex = STAFF.findIndex(staff => staff.name === theBarmanThatWillMakeDrinks.name)
  const totalTime = drinks.reduce((acc, element) => acc + (element.time * element.quantity), 0);
  waitTillCompletion({ totalTime, orderId, index: barmanIndex, foodOrDrink: 'drinks' })
}

export const findAvailableWaiter = (orderId) => {
  const theWaiterThatWaits = STAFF.find(staff => (staff.type === "Waiter") && (staff.available === true))
  const waiterIndex = STAFF.findIndex(staff => staff.name === theWaiterThatWaits.name)
  STAFF[waiterIndex].orders.push(orderId);
}
