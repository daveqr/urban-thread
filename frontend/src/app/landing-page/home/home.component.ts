import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { SimplifiedCategory } from '../../models/simplified-category.model'; 

@Component({
  selector: 'app-homex',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  categories: SimplifiedCategory[] = [];
  constructor(private categoryService: CategoryService) { }

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