import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthenticationHomeComponent } from './authentication-home/authentication-home.component';

@NgModule({
  declarations: [
    RegistrationComponent,
    SignInComponent,
    AuthenticationHomeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AuthenticationHomeComponent
  ]
})
export class AuthenticationModule { }
