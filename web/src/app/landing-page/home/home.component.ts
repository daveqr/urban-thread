import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { SimplifiedCategory } from '../../models/simplified-category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  categories: SimplifiedCategory[] = [];
  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }
}