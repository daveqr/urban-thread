import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthenticationHomeComponent } from './authentication-home/authentication-home.component';
import { RegistrationComponent } from './registration/registration.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RegistrationComponent,
    SignInComponent,
    AuthenticationHomeComponent
  ],
  imports: [CommonModule, FormsModule, SharedModule],
  exports: [AuthenticationHomeComponent],
})
export class AuthenticationModule { }
