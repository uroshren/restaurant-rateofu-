import styled from 'styled-components';
import { useQuery } from 'graphql-hooks'

import { Item } from './Item.jsx';

const ITEMS = `query {
  orders {
    id
    items {
      name
      price
      type
      time
    }
  }
}`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

export const Orders = () => {
  const { loading, error, data } = useQuery(ITEMS, {})
  if (loading) return 'Loading...'
  if (error) {
    console.error("error", error)
    return 'Something bad happened'
  }
  const { orders } = data;
  return (
    <List>
      {orders && orders.map(({id, order}) => {
        return (
          <List>
            {id}
            {order.items.map(((item) => {
              return (<Item
                item={item}
                isOrder
              />)
            }))}
          </List>
        )
      })}
    </List>
  )
}
