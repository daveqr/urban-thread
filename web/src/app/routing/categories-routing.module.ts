import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesHomeComponent } from '../categories/categories-home/categories-home.component';
import { CategoryDetail } from '../categories/category-detail/category-detail.component';

const routes: Routes = [
  { path: '', component: CategoriesHomeComponent },
  { path: ':id', component: CategoryDetail },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
