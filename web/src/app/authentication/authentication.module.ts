import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthenticationHomeComponent } from './authentication-home/authentication-home.component';
import { RegistrationComponent } from './registration/registration.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SharedModule } from '../shared/shared.module';
import { ToggleService } from '../services/toggle.service';
import { SIGN_IN_TOGGLE_SERVICE } from '../services/toggle.service.token';

@NgModule({
  declarations: [
    RegistrationComponent,
    SignInComponent,
    AuthenticationHomeComponent
  ],
  imports: [CommonModule, FormsModule, SharedModule],
  exports: [AuthenticationHomeComponent],
  providers: [
    { provide: SIGN_IN_TOGGLE_SERVICE, useClass: ToggleService }
  ],  
})
export class AuthenticationModule { }
