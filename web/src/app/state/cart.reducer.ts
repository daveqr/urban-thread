import { createReducer, on } from '@ngrx/store';
import { CartActions } from './cart.actions';
import { initialCartState } from './cart.state';

export const cartReducer = createReducer(
    initialCartState,

    on(CartActions.initCart, (state) => {
        if (state.items.length === 0) {
            console.log('initCart action dispatched');
            return {
                ...state,
                items: [],
            };
        }

        return state;
    }),

    on(CartActions.addItemToCart, (state, { item }) => {
        console.log('addItemToCart action dispatched');
        return {
            ...state,
            items: [...state.items, item],
        };
    })
);