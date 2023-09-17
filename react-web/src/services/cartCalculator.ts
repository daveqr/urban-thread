import { CartItem } from "../models/CartItem";


export const calculateTotalCostForItem = (item: CartItem) => {
    const amount = item.price * item.quantity;

    return parseFloat(amount.toFixed(2)) * 100;
};

export const calculateCartSubtotal = (cartItems: CartItem[]) => {
    const amount = cartItems.reduce(
        (total, item) => total + calculateTotalCostForItem(item),
        0
    );

    return amount;
};

// TODO add tax and shipping
export const calculateCartTotal = (cartItems: CartItem[]) => {
    return cartItems.reduce((total, item) => total + calculateTotalCostForItem(item), 0);
};
