import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartSelectors } from 'src/app/state/cart.selectors';

@Component({
  selector: 'app-cart-home',
  templateUrl: './cart-home.component.html',
  styleUrls: ['./cart-home.component.css']
})
export class CartHomeComponent {
  cartItems$ = this.store.select(CartSelectors.selectCartItems);
  totalItems$ = this.store.select(CartSelectors.selectCartTotalItems);
  totalPrice$ = this.store.select(CartSelectors.selectCartTotalPrice);

  constructor(private store: Store) {}
}