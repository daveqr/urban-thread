import { CartItem } from "../models/CartItem";


export const calculateTotalCostForItem = (item: CartItem) => {
    const totalPriceInCents = item.price * item.quantity;
    return totalPriceInCents;
};

export const calculateCartSubtotal = (cartItems: CartItem[]) => {
    const totalInCents = cartItems.reduce(
        (total, item) =>
            total + calculateTotalCostForItem(item),
        0
    );

    return totalInCents;
};

// TODO add tax and shipping
export const calculateCartTotal = (cartItems: CartItem[]) => {

    const totalInCents = cartItems.reduce(
        (total, item) =>
            total + calculateTotalCostForItem(item),
        0
    );

    return totalInCents;
};
