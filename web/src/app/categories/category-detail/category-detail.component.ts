import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetail implements OnInit {
  category: Category = {
    id: '',
    name: '',
    description: '',
    editionName: '',
    editionDescription: '',
    _links: {
      self: {
        href: ''
      }
    },
    _embedded: {
      products: []
    }
  };
  id: string | null = null;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    if (this.id !== null) {
      this.loadCategory();
    } else {
      console.error('Invalid category ID');
      this.router.navigate(['/error']);
    }
  }

  loadCategory(): void {
    this.categoryService.getCategoryById(this.id!).subscribe({
      next: (category) => {
        this.category = category;
      },
      error: (error) => {
        console.error('Error fetching category:', error);
        this.router.navigate(['/error']);
      }
    });
  }
}

