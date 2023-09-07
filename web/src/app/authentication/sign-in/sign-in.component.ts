import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToggleService } from '../services/toggle.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private toggleService: ToggleService
  ) { }

  toggleSignIn() {
    this.toggleService.toggleForm();
  }

  signIn() {
    throw new Error('Method not implemented.');
  }  
}
