import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesHomeComponent } from './categories-home/categories-home.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: '', component: CategoriesHomeComponent },
  { path: ':id', component: ProductsComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
