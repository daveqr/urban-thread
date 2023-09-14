import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../../models/CartItem';

interface CartState {
    cartItems: ReadonlyArray<CartItem>;
}

const initialState: CartState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,

    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            console.log('add to cart')
            state.cartItems = [...state.cartItems, action.payload];
        },

        removeFromCart: (state, action: PayloadAction<CartItem>) => {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
        },

        clearCart: (state) => {
            state.cartItems = [];
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
