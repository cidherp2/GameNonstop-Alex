import React from 'react';
import { useMutation } from '@apollo/client';
import { CHECKOUT } from '../graphql/mutations';
import { loadStripe } from '@stripe/stripe-js';
import CartItem from './CartItem';
import { useCartContext } from '../utils/CartContext';


const emptyCart = {}
const stripePromise = loadStripe('pk_test_51OCqBSIHMJDsY8j88LN9JLKg8pv9cpCgb7K0iVpns0sugelBGXK1LWtzHLciVNfe5elRq97LcTz3xnk1kcmb2zDk00xJySUXNk');

const Cart = () => {
  const { cart, setCart } = useCartContext();
  const [checkout] = useMutation(CHECKOUT);


  const handleCheckout = async () => {
    console.log('Checkout button clicked');
    try {
      if (cart?.items?.length > 0) {
        // Prepare line items for the Checkout Session
        const lineItems = cart.items.map((item) => ({
          name: item.name,
          price: item.price * 100, // Convert to cents
          quantity: item.quantity,
        }));
        setCart({ items: [] });
        console.log(lineItems);
        // Create a Checkout Session
        console.log('Before checkout mutation');
        const { data } = await checkout({
          variables: { lineItems },
        });
        console.log('After checkout mutation' +JSON.stringify(data, null, 2));

        const stripe = await stripePromise;
        const sessionId = data?.checkout?.sessionId;
        console.log("Hola buenas tardes " + data.checkout.sessionId);
        console.log(sessionId)

        if (sessionId) {
          // Redirect to Stripe Checkout using redirectToCheckout method
          const { error } = await stripe.redirectToCheckout({
            sessionId,
          });
         
          if (error) {
            console.error('Error redirecting to checkout:', error);
          }
        } else {
          console.error('Invalid session ID received from the server');
        }
      } else {
       
      }
    } catch (err) {
      console.error('Error during checkout:', err);
    }
   
    console.log(cart)
  };

  const handleRemove = (itemId) => {
    setCart({
      items: cart?.items?.filter((item) => item._id !== itemId) || [],
    });
  };

  // Function to update quantity
  const handleQuantityChange = (itemId, newQuantity) => {
    setCart({
      items: cart?.items?.map((item) =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      ),
    });
  };

  localStorage.setItem('cart', JSON.stringify(cart));

  // Calculate total price
  const totalPrice =
    cart?.items?.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    ) ?? 0;

  return (
    <div>
      <h1>Cart</h1>
      {cart?.items?.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart?.items?.map((item) => (
            <CartItem
              key={item._id}
              item={item}
              onRemove={handleRemove}
              onQuantityChange={handleQuantityChange}
            />
          ))}
          <div>
            <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
          </div>
          <button onClick={handleCheckout} >Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
