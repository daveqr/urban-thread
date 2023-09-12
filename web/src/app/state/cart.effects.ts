import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
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
}
