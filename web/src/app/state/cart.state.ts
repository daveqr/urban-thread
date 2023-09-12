import { Cart } from "../models/cart.model";

export interface CartState {
    cart: Cart
}

export const initialCartState: CartState = {
    cart: {
        items: [],
    }
};
