import { CartItem } from "../../models/CartItem";

export const addToCart = (item: CartItem) => ({
    type: 'ADD_TO_CART',
    payload: item,
});

export const removeFromCart = (itemId: string) => ({
    type: 'REMOVE_FROM_CART',
    payload: itemId,
});

export const clearCart = () => ({
    type: 'CLEAR_CART',
});