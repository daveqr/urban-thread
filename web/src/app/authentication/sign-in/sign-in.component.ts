import { Component, Inject } from '@angular/core';

import { UserService } from '../../services/user.service';
import { ToggleService } from 'src/app/services/toggle.service';
import { SIGN_IN_TOGGLE_SERVICE } from 'src/app/services/toggle.service.token';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    @Inject(SIGN_IN_TOGGLE_SERVICE) private toggleService: ToggleService
  ) { }

  toggleSignIn() {
    this.toggleService.toggle();
  }

  signIn() {
    throw new Error('Method not implemented.');
  }  
}
