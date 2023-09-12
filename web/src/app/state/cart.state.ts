import { CartItem } from "../models/cart-item.model";

export interface CartState {
    items: CartItem[]
}

export const initialCartState: CartState = {
    items: [],
};
