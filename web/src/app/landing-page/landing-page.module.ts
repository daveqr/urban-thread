import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { SignInComponent } from '../sign-in/sign-in.component';

@NgModule({
  declarations: [HomeComponent, CategoriesComponent, SignInComponent],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
  ],
  exports: [HomeComponent, CategoriesComponent]
})
export class LandingPageModule { }
