import React from 'react';
import styled from 'styled-components';

// Styled components for better aesthetics
const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const ItemDetails = styled.div`
  display: flex;
  align-items: center;
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 15px;
`;

const ItemName = styled.h4`
  margin: 0;
`;

const ItemPrice = styled.p`
  margin: 0;
`;

const QuantityInput = styled.input`
  width: 50px;
  margin-left: 20px;
`;

const RemoveButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const GameTitle = styled.h4`
  color: #1a1aff;
  font-weight: bold;
  margin-bottom: 5px;
`;

const PriceTag = styled.span`
  background-color: #ffcc00;
  color: #000;
  padding: 3px 8px;
  border-radius: 4px;
  font-weight: bold;
`;

const ActionButton = styled.button`
  background-color: #4CAF50; 
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-right: 10px;

  &:hover {
    background-color: #45a049;
  }
`;



const CartItem = ({ item, onRemove, onQuantityChange }) => {
  // console.log('Item:', JSON.stringify(item, null, 2));
  return (
    <ItemContainer>
      <ItemDetails>
        <ItemImage src={item.image} alt={item.name} />
        <div>
          <GameTitle>{item.name}</GameTitle>
          <PriceTag>${item.price.toFixed(2)}</PriceTag>
        </div>
      </ItemDetails>
      <div>
        <QuantityInput
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => onQuantityChange(item._id, parseInt(e.target.value, 10))}
        />
        <RemoveButton onClick={() => onRemove(item._id)}>Remove</RemoveButton>
      </div>
    </ItemContainer>
  );
};

export default CartItem;
