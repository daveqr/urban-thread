import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    const url = `${this.baseUrl}/categories`;
    return this.http.get(url);
  }
}
