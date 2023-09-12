import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CartItem } from '../state/cart.state';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];

  addToCart(item: CartItem): Observable<void> {
    // TODO this is a dummy list for now. need to implement the call to the api
    this.cartItems.push(item);

    return of(undefined);
  }
}
