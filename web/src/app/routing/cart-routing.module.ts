import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartHomeComponent } from '../cart/cart-home/cart-home.component';

const routes: Routes = [
  { path: '', component: CartHomeComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule { }
