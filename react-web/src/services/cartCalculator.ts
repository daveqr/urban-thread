import { CartItem } from "../models/CartItem";

export const calculateTotalCostForItem = (item: CartItem, dineroMultiplier = false) => {
    const totalPrice = item.price * item.quantity;

    if (dineroMultiplier) {
        return totalPrice * 100;
    }

    return totalPrice;
};

export const calculateCartSubtotal = (cartItems: CartItem[]) => {
    const totalInCents = cartItems.reduce(
        (total, item) =>
            total + calculateTotalCostForItem(item, true),
        0
    );

    console.log(totalInCents);
    return (totalInCents);
};

// TODO add tax and shipping
export const calculateCartTotal = (cartItems: CartItem[]) => {
    const totalInCents = cartItems.reduce(
        (total, item) =>
            total + calculateTotalCostForItem(item, true),
        0
    );
    return (totalInCents);
};
