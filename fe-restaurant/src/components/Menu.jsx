import { useState } from 'react';
import { useQuery, useMutation } from 'graphql-hooks'

import styled from 'styled-components';

import { Item } from './Item.jsx';

const ITEMS = `query {
  items {
    id
    name
    price
    type
    time
  }
}`;

const SUBMIT_ORDER = `mutation CreateOrder(
  $input: OrderInput!
) {
  createOrder(input: $input) {
    items {
      name
      price
    }
    totalPrice
  }
}`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

export const Menu = () => {
  const { loading, error, data } = useQuery(ITEMS, {})
  const [submitOrder] = useMutation(SUBMIT_ORDER)

  const [orderItems, setOrderItems] = useState([])

  const addOrderItems = (items) => {
    setOrderItems(items)
  };

  if (loading) return 'Loading...'
  if (error) {
    //console.error("error", error)
    return 'Something bad happened'
  }
  const { items } = data;
  return (
    <List>
      {items.map((item) => {
        return (
          <Item
            item={item}
            orderItems={orderItems || []}
            addOrderItems={addOrderItems}
            isOrder
          />
        )
      })}
      <button
        type="submit"
        onClick={() => submitOrder({ variables: { input: {items: orderItems} } })}
      >Order</button>
    </List>
  );
}
