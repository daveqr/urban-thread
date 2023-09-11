import { StoreModule } from '@ngrx/store';
import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { initialCartState } from './cart.state';

export const cartReducer = createReducer(
    initialCartState,
    on(CartActions.initCart, (state) => ({
        ...state,
        items: [],
    }))
);
