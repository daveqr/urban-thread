import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CartState } from './cart.state';

export class CartSelectors {
    static selectCartFeature = createFeatureSelector<CartState>('cart');

    static selectCartItems = createSelector(
        CartSelectors.selectCartFeature,
        (state: CartState) => state.items
    );

    static selectCartTotalItems = createSelector(
        CartSelectors.selectCartItems,
        (items) => items.length
    );

    static selectCartTotalPrice = createSelector(
        CartSelectors.selectCartItems,
        (items) =>
            items.reduce((total, item) => total + item.price, 0)
    );
}
