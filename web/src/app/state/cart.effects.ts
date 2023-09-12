import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { CartActions } from './cart.actions';
import { CartService } from '../services/cart.service';

@Injectable()
export class CartEffects {
    constructor(private actions$: Actions, private cartService: CartService) { }

    addItemToCart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CartActions.addItemToCart),
            switchMap(action => {
                return this.cartService.addToCart(action.item).pipe(
                    map(() => CartActions.addItemToCartSuccess({ item: action.item })),
                    catchError(error => of(CartActions.addItemToCartFailure({ error })))
                );
            })
        )
    );

    // TODO this is a temporary effect for demonstration. Need to get rid of it.
    addItemToCart2$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CartActions.addItemToCart),
            tap(action => {
                console.log('Item added to cart:', action.item);
            })
        ), { dispatch: false }
    );
}
