import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleCart,
  addMultipleToCart,
  selectCart,
  selectCartOpen,
} from '../../features/cartSlice';
import './style.css';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const cartOpen = useSelector(selectCartOpen);

  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
  if (data) {
    if (data.checkout) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    } else {
      console.error("Checkout session is null:", data);
    }
  }
}, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch(addMultipleToCart(cart));
    }

    if (!cart.length) {
      getCart();
    }
  }, [cart.length, dispatch]);

  function handleToggleCart() {
    dispatch(toggleCart());
  }

  function calculateTotal() {
    return cart
      .reduce((sum, item) => sum + item.price * item.purchaseQuantity, 0)
      .toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];

    cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }

  if (!cartOpen) {
    return (
      <div className="cart-closed" onClick={handleToggleCart}>
        <span role="img" aria-label="cart">
          🛒
        </span>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="close" onClick={handleToggleCart}>
        [close]
      </div>
      <h2>Shopping Cart</h2>
      {cart.length ? (
        <div>
          {cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>

            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
            😱
          </span>
          You haven't added anything to your cart yet!
        </h3>
      )}
    </div>
  );
};

export default Cart;