import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import { idbPromise } from "../../utils/helpers";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateCartQuantity } from '../../features/cartSlice';

function ProductItem({ image, name, _id, price, quantity }) { // Use destructuring here
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  
  const handleAddToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);

    if (itemInCart) {
      dispatch(
        updateCartQuantity({
          _id: _id,
          purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
        })
      );
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch(
        addToCart({
          _id,
          image,
          name,
          price,
          quantity,
          purchaseQuantity: 1,
        })
      );
      idbPromise("cart", "put", {
        _id,
        image,
        name,
        price,
        quantity,
        purchaseQuantity: 1,
      });
    }
  };

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img alt={name} src={`/images/${image}`} />
        <p>{name}</p>
      </Link>
      <div>
        <div> {quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button onClick={handleAddToCart}>Add to cart</button>
    </div>
  );
};

export default ProductItem;