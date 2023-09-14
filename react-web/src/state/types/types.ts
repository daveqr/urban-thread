import { CartItem } from "../../models/CartItem";


export interface RootState {
    cart: {
        cartItems: ReadonlyArray<CartItem>;
    };
    // user: {
    //   currentUser: User | null;
    // };
}
