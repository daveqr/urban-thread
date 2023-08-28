import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Service for retrieving category-related data.
 *
 * This service provides methods for fetching category data from a remote server.
 */
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  /**
   * Retrieves a list of categories from the API.
   *
   * @returns An Observable that emits the category data when the HTTP request is successful.
   */
  getCategories(): Observable<any> {
    const url = `${this.baseUrl}/categories`;
    return this.http.get(url);
  }

  /**
   * Retrieves a single category from the API.
   *
   * @returns An Observable that emits the category data when the HTTP request is successful.
   */
  getCategoryById(id: string): Observable<any> {
    const url = `${this.baseUrl}/categories/${id}`;
    return this.http.get(url);
  }
}
