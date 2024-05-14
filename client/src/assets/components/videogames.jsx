import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/queries';
import { useCartContext } from '../utils/CartContext';

const Div = styled.div /*style*/`
  position: relative;
  bottom: 1rem;
`;

const AddToCartButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 15px;
  margin-top: 10px;
  margin-left: 10px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #45a049;
  }
`;

const AddToWishlistButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 15px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #45a049;
  }
`;

const GameCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
  cursor: pointer; 
`;

const GameImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const GameDetails = styled.div`
  padding: 0.5rem;
`;

const GameName = styled.h3`
  margin: 0;
`;

const GameListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-bottom: 1rem;
  margin-top: 2rem;
`;

const ModalOverlay = styled.div /*style*/`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  display: flex;
`;

const ModalContent = styled.div/*style*/`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  position: relative;
  padding-top: 3rem;

  &.details {
   
    background: green;
  }
`;

const Button = styled.button /*style*/`
  background-color: #4CAF50; 
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer; 
  align-self: flex-start;

  &.exit {
    position: absolute;;
    top: 0;
    right: 0;
    background-color: #e74c3c; /* Use a different color for the exit button */
  }
`;

const GameList = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [selectedGame, setSelectedGame] = useState(null);
  const { cart, setCart } = useCartContext();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const games = data.products;

  const openModal = (game) => {
    setSelectedGame(game);
  };

  const closeModal = () => {
    setSelectedGame(null);
  };

  const addToCart = () => {
    // console.log(selectedGame._id)
    // console.log('Added to cart:', selectedGame);
    setCart({items:[...cart?.items ?? [],selectedGame]})
    console.log(cart);
    closeModal();
  };

  const addToWishlist = () => {
    console.log('Added to wishlist:', selectedGame);
    closeModal();
  };

  return (
    <div>
      <GameListContainer>
        {games.map((game) => (
          <GameCard key={game._id} onClick={() => openModal(game)}>
            <GameImage src={game.image} alt={game.name} />
            <GameDetails >
              <GameName>{game.name}</GameName>
              <p>Price: ${game.price}</p>
              {game.quantity && <p>Quantity: {game.quantity}</p>}
              <p>Category: {game.category}</p>
            </GameDetails>
          </GameCard>
        ))}
      </GameListContainer>

      {selectedGame && (
        <ModalOverlay>
          <ModalContent>
            <Button className= "exit" onClick={closeModal}>x</Button>
            <Div className='details'>
              <h2>{selectedGame.name}</h2>
              <p>Price: ${selectedGame.price}</p>
              {selectedGame.quantity && <p>Quantity: {selectedGame.quantity}</p>}
              <p>Category: {selectedGame.category}</p>
              </Div>
              <Button onClick={addToCart}>Add to Cart</Button>
              <Button onClick={addToWishlist}>Add to Wishlist</Button>
          </ModalContent>
        </ModalOverlay>
      )}
    </div>
  );
};

export default GameList;
