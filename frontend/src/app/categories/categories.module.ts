import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CategoriesRoutingModule } from './categories-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule
  ],
  exports: [HomeComponent, ProductListComponent]
})
export class CategoriesModule { }
