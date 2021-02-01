import styled from 'styled-components';

const StyledItem = styled.div`
  display: flex;
  margin-bottom: 8px;
`;

const Info = ({value}) => {
  const StyledInfo = styled.div`
    margin-right: 8px;
  `;
  return (
    <StyledInfo>{value}</StyledInfo>
  )
}

export const Item = ({item, orderItems, addOrderItems, isOrder}) => {
  const { name, price, type } = item;
  const handleInputChange = (event) => {
    const items = [...orderItems];
    const orderedItem = orderItems.find(element => element.id === item.id) || item;
    const orderedItemIndex = orderItems.findIndex(element => element.id === item.id);
    orderedItem.quantity = parseInt(event.target.value);
    if (orderedItemIndex === -1) {
      items.push(orderedItem)
    }
    items[orderedItemIndex] = item;
    addOrderItems(items);
  }

  return (
    <StyledItem key={item.id}>
      <Info value={name} />
      <Info value={`£${price}`} />
      <Info value={type} />
      {isOrder && (
        <input
          type="number"
          id="quantity"
          name="quantity"
          onChange={handleInputChange}
          pattern='[0-9]{0,5}'
        />
      )}
    </StyledItem>
  );
}
