import { useQuery } from 'graphql-hooks'
import styled from 'styled-components';

const ITEMS = `query {
  items {
    id
    name
    price
    type
  }
}`

const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const Item = styled.div`
  margin-bottom: 8px;
`;

export const GetMenu = () => {
  const { loading, error, data } = useQuery(ITEMS, {})
  console.log("data", data);

  if (loading) return 'Loading...'
  if (error) {
    //console.error("error", error)
    return 'Something bad happened'
  }
  const { items } = data;
  return (
    <List>
      {items.map(({name, price, type}) => {
        return (
          <Item>
            {name} £{price} {type}
          </Item>
        )
      })}
    </List>
  );
}
