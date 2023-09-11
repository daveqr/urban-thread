import { InjectionToken } from '@angular/core';
import { ToggleService } from './toggle.service';

export const SIGN_IN_TOGGLE_SERVICE = new InjectionToken<ToggleService>('ToggleService');
