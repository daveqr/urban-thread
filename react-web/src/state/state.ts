import { CartItem } from "../models/CartItem";


export interface RootState {
    cart: {
        cartItems: Array<CartItem>;
    };
    // TODO implement this
    // user: {
    //   currentUser: User | null;
    // };
}
