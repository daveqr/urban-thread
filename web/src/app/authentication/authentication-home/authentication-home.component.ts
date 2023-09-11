import { Component, Inject } from '@angular/core';
import { ToggleService } from 'src/app/services/toggle.service';
import { SIGN_IN_TOGGLE_SERVICE } from 'src/app/services/toggle.service.token';

@Component({
  selector: 'app-authentication-home',
  templateUrl: './authentication-home.component.html',
  styleUrls: ['./authentication-home.component.css']
})
export class AuthenticationHomeComponent {
  constructor(@Inject(SIGN_IN_TOGGLE_SERVICE) private toggleService: ToggleService) {
  }

  isRegistrationFormVisible(): boolean {
    console.log(this.toggleService.isToggledState())
    return this.toggleService.isToggledState();
  }

  toggleSignIn() {
    console.log(this.toggleService.isToggledState())
    this.toggleService.toggle();
  }
}
