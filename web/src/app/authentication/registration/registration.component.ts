import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToggleService } from '../services/toggle.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private toggleService: ToggleService
  ) { }

  toggleSignIn() {
    this.toggleService.toggleForm();
  }

  createUser() {
    // use userService
    console.log('create user');
  }
}
