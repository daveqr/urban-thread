import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsRoutingModule } from '../routing/products-routing.module';

import { cartReducer } from '../state/cart.reducer';
import { CartEffects } from '../state/cart.effects';
import { CartActions } from '../state/cart.actions';

@NgModule({
  declarations: [ProductDetailComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    StoreModule.forFeature('cart', cartReducer),
    EffectsModule.forFeature([CartEffects]),
  ],
  providers: [CartActions],
})
export class ProductsModule { }
