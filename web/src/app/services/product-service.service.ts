import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  /**
   * Retrieves a single product from the API.
   *
   * @returns An Observable that emits the product data when the HTTP request is successful.
   */
  getProductById(id: string): Observable<any> {
    const url = `${this.baseUrl}/products/${id}`;
    return this.http.get(url);
  }
}
