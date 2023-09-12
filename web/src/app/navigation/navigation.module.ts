import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { AuthenticationModule } from '../authentication/authentication.module';
import { SIGN_IN_TOGGLE_SERVICE } from '../services/toggle.service.token';
import { ToggleService } from '../services/toggle.service';


@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    AuthenticationModule,
    RouterModule
  ],
  exports: [
    NavbarComponent
  ],
  providers: [
    { provide: SIGN_IN_TOGGLE_SERVICE, useClass: ToggleService }
  ],
})
export class NavigationModule { }
