import React from 'react';
import { useDispatch } from 'react-redux';
import { idbPromise } from "../../utils/helpers";
import { removeFromCart, updateCartQuantity } from '../../features/cartSlice';

const CartItem = ({ item }) => {

  const dispatch = useDispatch();

const handleRemoveFromCart = (item) => {
dispatch(removeFromCart({ _id: item._id }));
idbPromise('cart', 'delete', { ...item });
}

const handleQuantityChange = (e) => {

  const value = parseInt(e.target.value, 10);
  if (value === 0) {
    dispatch(removeFromCart({ _id: item._id }));
    idbPromise('cart', 'delete', { ...item });
  }else {
    dispatch(updateCartQuantity({ _id: item._id, purchaseQuantity: value }));
    idbPromise('cart', 'put', { ...item, purchaseQuantity: value });
  } 
}



  return (
    <div className="flex-row">
      <div>
        <img
          src={`/images/${item.image}`}
          alt={item.name}
        />
      </div>
      <div>
        <div>{item.name}, ${item.price}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={handleQuantityChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => handleRemoveFromCart(item)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
};
export default CartItem;