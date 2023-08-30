import { Component, OnInit } from '@angular/core';
import { ProductServiceService as ProductService } from '../../services/product-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model'

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log('Product ID:', this.id);
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
}
