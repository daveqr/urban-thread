import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesHomeComponent } from './categories-home/categories-home.component';
import { CategoriesRoutingModule } from '../routing/categories-routing.module';
import { CategoryDetail } from './category-detail/category-detail.component';

@NgModule({
  declarations: [
    CategoriesHomeComponent,
    CategoryDetail,
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
