import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// TODO should this be moved to products module and not root?
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  // TODO get from env config
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getProductById(id: string): Observable<any> {
    const url = `${this.baseUrl}/api/store/products/${id}`;
    return this.http.get(url);
  }
}
