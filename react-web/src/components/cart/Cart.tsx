import { FC } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { CartItem } from "../../models/CartItem";
import { RootState } from "../../state/state";
import {
  decrementCartItemAction,
  incrementCartItemAction,
} from "../../state/reducers/cartReducer";

const Cart: FC = () => {
  const dispatch = useDispatch();

  const cartItemsObj = useSelector((state: RootState) => state.cart.cartItems);
  const cartItems = cartItemsObj.map((item) => CartItem.copy(item));

  const incrementCartItemQuantity = (id: string) => {
    dispatch(incrementCartItemAction(id));
  };

  const decrementCartItemQuantity = (id: string) => {
    dispatch(decrementCartItemAction(id));
  };

  return (
    <div>
      <h2>Cart</h2>
      <p>
        <Link to={`/`}>Home</Link>
      </p>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item: CartItem) => (
            <li key={item.id}>
              {item.name} - Quantity: {item.quantity} - Price: {item.price} -
              Total: {item.getTotalCost()}
              <button onClick={() => decrementCartItemQuantity(item.id)}>
                -
              </button>
              <button onClick={() => incrementCartItemQuantity(item.id)}>
                +
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
