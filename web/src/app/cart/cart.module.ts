import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartHomeComponent } from './cart-home/cart-home.component';
import { CartRoutingModule } from '../routing/cart-routing.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { cartReducer } from '../state/cart.reducer';
import { CartEffects } from '../state/cart.effects';


@NgModule({
  declarations: [
    CartHomeComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    
    StoreModule.forFeature('cart', cartReducer),
    EffectsModule.forFeature([CartEffects])
  ]
})
export class CartModule { }
