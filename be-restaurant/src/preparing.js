import { STAFF } from './staff.js';
import { ORDERS } from './orders.js';

const setOrderAvailable = (index, foodOrDrink) => ORDERS[index] = foodOrDrink;

const waitTillCompletion = async (totalTime, orderId, index, foodOrDrinks) => {
  await delay(totalTime*1000)
  console.log("Chef ", theChefThatWillCook.name, " has finished preparing order number ", orderId);
  setOrderAvailable(orderId, foodOrDrink)
}

export const prepareFood = (food, orderId) => {
  const theChefThatWillCook = STAFF.find(staff => (staff.type === "Chef") && (staff.available === true))
  const chefIndex = STAFF.findIndex(staff => staff.name === theChefThatWillCook.name)
  const totalTime = food.reduce((acc, element) => acc + (element.time * element.quantity), 0);
  const delay = ms => new Promise(res => setTimeout(res, ms));
  waitTillCompletion(totalTime, orderId, index, 'food')
}

export const prepareDrinks = (drinks, orderId) => {
  const theBarmanThatWillMakeDrinks = STAFF.find(staff => (staff.type === "Barman") && (staff.available === true))
  const barmanIndex = STAFF.findIndex(staff => staff.name === theBarmanThatWillMakeDrinks.name)
  const totalTime = food.reduce((acc, element) => acc + (element.time * element.quantity), 0);
  const delay = ms => new Promise(res => setTimeout(res, ms));
  waitTillCompletion(totalTime, orderId, index, 'drinks')
}

export const findAvailableWaiter = (orderId) => {
  const theWaiterThatWaits = STAFF.find(staff => (staff.type === "Waiter") && (staff.available === true))
  const waiterIndex = STAFF.findIndex(staff => staff.name === theWaiterThatWaits.name)
  STAFF[waiterIndex].orders.push(orderId);
}
