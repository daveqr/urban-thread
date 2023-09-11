import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToggleService {
  private isToggled: boolean = false;

  constructor() { }

  toggle(): void {
    this.isToggled = !this.isToggled;
  }

  isToggledState(): boolean {
    return this.isToggled;
  }
}
