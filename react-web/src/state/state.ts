import { CartItem } from "../models/CartItem";


export interface RootState {
    cart: {
        cartItems: ReadonlyArray<CartItem>;
    };
    // TODO implement this
    // user: {
    //   currentUser: User | null;
    // };
}
