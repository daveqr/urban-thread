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
  user: any = {
    email: '',
    password: '',
    fname: '',
    lname: ''
  }; // TODO use class/interface


  constructor(
    private userService: UserService,
    private toggleService: ToggleService
  ) { }

  toggleSignIn() {
    this.toggleService.toggleForm();
  }

  createUser() {
    this.isLoading = true;
    this.userService.createUser(this.user).subscribe({
      next: (response) => {
        this.isLoading = false;
        const { message, token } = response;
        localStorage.setItem('jwtToken', token);        
        console.log('User created:', message);
        alert('User created: ' + JSON.stringify(message));
      },
      error: (error) => {
        this.isLoading = false;
        alert('Error creating user:' + JSON.stringify(error));
        console.error('Error creating user:', error);
      }
    });
  }

}
