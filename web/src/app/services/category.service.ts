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
   * Retrieves a list of categories from the server.
   *
   * This method sends an HTTP GET request to the server to fetch a list of categories.
   *
   * @returns An Observable that emits the category data when the HTTP request is successful.
   */
  getCategories(): Observable<any> {
    const url = `${this.baseUrl}/categories`;
    return this.http.get(url);
  }
}
