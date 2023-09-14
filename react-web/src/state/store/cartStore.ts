import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CartItem } from '../../models/CartItem';


const initialState: CartItem[] = [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            state.push(action.payload);
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            return state.filter((item) => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.splice(0, state.length);
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
