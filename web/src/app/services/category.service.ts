import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // TODO get from env config
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    const url = `${this.baseUrl}/api/store/categories`;
    return this.http.get(url);
  }

  getCategoryById(id: string): Observable<any> {
    // TODO fix the categories link to use the href from the response
    const url = `${this.baseUrl}/api/store/categories/${id}`;
    return this.http.get(url);
  }
}
