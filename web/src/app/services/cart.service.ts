import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: CartItem[] = [];

  addToCart(item: CartItem): Observable<void> {
    // TODO this is a dummy list for now. need to implement the call to the api
    this.items.push(item);

    return of(undefined);
  }
}
