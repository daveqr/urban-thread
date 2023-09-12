import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsRoutingModule } from './products-routing.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { cartReducer } from 'src/app/state/cart.reducer';
import { CartEffects } from 'src/app/state/cart.effects';
import { CartActions } from 'src/app/state/cart.actions';

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
