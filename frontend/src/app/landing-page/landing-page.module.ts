import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LandingPageRoutingModule } from './landing-page-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    LandingPageRoutingModule
  ],
  exports: [HomeComponent]
})
export class LandingPageModule { }
