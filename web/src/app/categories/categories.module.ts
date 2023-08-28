import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesHomeComponent } from './categories-home/categories-home.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryDetail } from './category-detail/category-detail.component';
import { CategoriesDetailComponent } from './categories-detail/categories-detail.component';



@NgModule({
  declarations: [
    CategoriesHomeComponent,
    CategoryDetail,
    CategoriesDetailComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
