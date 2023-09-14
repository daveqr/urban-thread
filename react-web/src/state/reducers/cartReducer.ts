import { createSlice } from '@reduxjs/toolkit';
import { CartItem } from '../../models/CartItem';
import { createAction } from '@reduxjs/toolkit';

// Actions
export const addToCart = createAction<CartItem>('ADD_TO_CART');
export const removeFromCart = createAction<string>('REMOVE_FROM_CART');
export const clearCart = createAction('CLEAR_CART');

// Slice
export const cartSlice = createSlice({
    name: 'cart',
    initialState: { cartItems: [] as ReadonlyArray<CartItem> },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCart, (state, action) => {
                const cartItem = action.payload as CartItem;
                state.cartItems = [...state.cartItems, cartItem];
            })
            .addCase(removeFromCart, (state, action) => {
                const id = action.payload;
                state.cartItems = state.cartItems.filter((item) => item.id !== id);
            })
            .addCase(clearCart, (state, _action) => {
                state.cartItems = [];
            });
    },
});

export default cartSlice.reducer;