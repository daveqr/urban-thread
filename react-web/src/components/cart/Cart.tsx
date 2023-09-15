import { FC } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { CartItem } from "../../models/CartItem";
import { RootState } from "../../state/state";

const Cart: FC = () => {
  const cartItemsObj = useSelector((state: RootState) => state.cart.cartItems);
  const cartItems = cartItemsObj.map((item) => CartItem.of(item));

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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
