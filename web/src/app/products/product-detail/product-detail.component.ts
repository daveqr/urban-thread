import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { ProductServiceService as ProductService } from '../../services/product-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model'
import { CartActions } from 'src/app/state/cart.actions';
import { CartItem } from 'src/app/models/cart-item.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  id: string | null = null;
  product: Product = {
    id: '',
    name: '',
    description: '',
    price: '',
    color: ''
  };

  item: CartItem;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private productService: ProductService
  ) {

    this.item = {
      id: 1,
      name: 'Sample Product',
      price: 10.99,
      quantity: 1
    };

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    if (this.id !== null) {
      this.loadProduct();
    } else {
      console.error('Invalid category ID');
      this.router.navigate(['/error']);
    }
  }

  loadProduct(): void {
    this.productService.getProductById(this.id!).subscribe({
      next: (product) => {
        this.product = product;
      },
      error: (error) => {
        console.error('Error fetching product:', error);
        this.router.navigate(['/error']);
      }
    });
  }

  addToCart(item: CartItem) {
    this.store.dispatch(CartActions.addItemToCart({ item }));
    this.router.navigate(['/cart']);
  }
}
