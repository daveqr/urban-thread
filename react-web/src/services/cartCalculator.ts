import { CartItem } from "../models/CartItem";

export const calculateTotalCostForItem = (item: CartItem) => {
    return item.price * item.quantity;
};

export const calculateCartSubtotal = (cartItems: CartItem[]) => {
    return cartItems.reduce((total, item) => total + calculateTotalCostForItem(item), 0);
};

// TODO add tax and shipping
export const calculateCartTotal = (cartItems: CartItem[]) => {
    return cartItems.reduce((total, item) => total + calculateTotalCostForItem(item), 0);
};
