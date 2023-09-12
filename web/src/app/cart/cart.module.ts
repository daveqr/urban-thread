import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartHomeComponent } from './cart-home/cart-home.component';
import { CartRoutingModule } from '../routing/cart-routing.module';

import { EffectsModule } from '@ngrx/effects';
import { CartEffects } from '../state/cart.effects';


@NgModule({
  declarations: [
    CartHomeComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    EffectsModule.forFeature([CartEffects])
  ]
})
export class CartModule { }
