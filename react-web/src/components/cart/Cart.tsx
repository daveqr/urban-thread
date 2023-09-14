import { FC } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

import { useCart } from "../../contexts/CartContext";
import { CartItem } from "../../models/CartItem";

const Cart: FC = () => {
  const { cartItems, emptyCart } = useCart();

  return (
    <div>
      <h2>Cart</h2>
      <p>
        <Link to={`/`}>Home</Link>
      </p>

      <button onClick={emptyCart}>Empty Cart</button>

      {cartItems.size === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item: CartItem) => (
            <li key={item.id}>
              {item.name} - Quantity: {item.quantity} - Price: {item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
