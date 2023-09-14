import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { List } from "immutable";

import { CartItem } from "../models/CartItem";
import { useAuth } from "./AuthContext";
import { fetchCartData } from "../services/cartService";

interface CartContextType {
  cartItems: List<CartItem>;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  emptyCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

function mapToCartItems(jsonData: any) {
  return jsonData.map((item: any) => {
    return new CartItem(item.id, item.name, item.price, item.quantity);
  });
}

export const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState(List<CartItem>([]));

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const data = await fetchCartData(user.id);
          const cartItems = data ? mapToCartItems(data) : [];
          console.log(data);
          setCartItems(List(cartItems));
          localStorage.setItem(`cart-${user.id}`, JSON.stringify(cartItems));
        }
      } catch (error) {
        // Handle the error
        console.error(error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const addToCart = async (item: CartItem) => {
    try {
      if (user) {
        const data = await fetchCartData(user.id);
        const cartItemsFromService = data ? mapToCartItems(data) : [];

        const existingItemIndex = cartItemsFromService.findIndex(
          (cartItem: CartItem) => cartItem.id === item.id
        );

        let updatedCart = cartItemsFromService;

        if (existingItemIndex !== -1) {
          updatedCart = cartItemsFromService.update(
            existingItemIndex,
            (cartItem: CartItem) => {
              if (cartItem) {
                const updatedCartItem = cartItem.copy(cartItem);
                updatedCartItem.quantity += 1;
                return updatedCartItem;
              }
              return cartItem;
            }
          ) as List<CartItem>;
        } else {
          const newItem = new CartItem(item.id, item.name, item.price, 1);
          updatedCart = cartItemsFromService.push(newItem);
        }

        setCartItems(updatedCart);
        localStorage.setItem(`cart-${user.id}`, JSON.stringify(updatedCart));
      } else {
        const newItem = new CartItem(item.id, item.name, item.price, 1);
        const updatedCart = List<CartItem>([newItem]);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCartItems(updatedCart);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromCart = (itemId: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem(`cart-${user?.id}`, JSON.stringify(updatedCart));
    console.log("bbb");
  };

  const emptyCart = () => {
    const updatedCart = List<CartItem>([]);
    setCartItems(updatedCart);
    localStorage.removeItem(`cart-${user?.id}`);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, emptyCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
