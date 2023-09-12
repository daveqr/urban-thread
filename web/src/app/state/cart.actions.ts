import { createAction, props } from '@ngrx/store';
import { CartItem } from '../models/cart.model';

export class CartActions {

  static initCart = createAction(
    '[Cart] Init Cart',
    props<{ items: CartItem[] }>()
  );

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
