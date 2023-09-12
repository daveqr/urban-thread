import { createAction, props } from '@ngrx/store';
import { CartItem } from './cart.state';

export class CartActions {

  static initCart = createAction('[Cart] Init');

  static addItemToCart = createAction(
    '[Cart] Add Item to Cart',
    props<{ item: CartItem }>()
  );

  static addItemToCartSuccess = createAction(
    '[Cart] Add Item to Cart Success',
    props<{ item: CartItem }>()
  );

  static addItemToCartFailure = createAction(
    '[Cart] Add Item to Cart Failure',
    props<{ error: any }>()
  );
}
