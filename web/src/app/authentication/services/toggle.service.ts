import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToggleService {
  private showSignInForm: boolean = true;

  toggleForm(): void {
    this.showSignInForm = !this.showSignInForm;
  }

  isSignInFormVisible(): boolean {
    return this.showSignInForm;
  }
}
