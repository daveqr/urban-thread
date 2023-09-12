import { createReducer, on } from '@ngrx/store';
import { CartActions } from './cart.actions';
import { initialCartState } from './cart.state';

export const cartReducer = createReducer(
    initialCartState,

    on(CartActions.initCart, (state) => {
        if (state.cart.items.length === 0) {
            return {
                ...state,
                cart: {
                    ...state.cart,
                    items: [],
                },
            };
        }

        return state;
    }),

    on(CartActions.addItemToCart, (state, { item }) => ({
        ...state,
        cart: {
            ...state.cart,
            items: [...state.cart.items, item],
        },
    }))
);
