import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  createUser(userData: any): Observable<any> {
    const mockUser = {
      id: 1,
      username: 'john_doe',
      email: 'john@example.com',
    };

    return of(mockUser);
  }
}
