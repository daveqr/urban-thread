import { Component } from '@angular/core';
import { ToggleService } from '../services/toggle.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-authentication-home',
  templateUrl: './authentication-home.component.html',
  styleUrls: ['./authentication-home.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate(300)),
    ]),
  ],  
})
export class AuthenticationHomeComponent {
  constructor(private toggleService: ToggleService) {}

  isSignInFormVisible(): boolean {
    return this.toggleService.isSignInFormVisible();
  }

  toggleForm(): void {
    this.toggleService.toggleForm();
  }
}
