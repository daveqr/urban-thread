import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Cart } from '../models/cart.model';
import { CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = { items: [] };

  addToCart(item: CartItem): Observable<void> {
    // TODO this is a dummy list for now. need to implement the call to the api
    this.cart.items.push(item);

    return of(undefined);
  }
}
