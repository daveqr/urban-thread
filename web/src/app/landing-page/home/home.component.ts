import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { SimplifiedCategory } from '../../models/simplified-category.model';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-landing-page-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate(300)),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  showSignIn: boolean = false;
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

  toggleSignIn() {
    this.showSignIn = !this.showSignIn;

    if (this.showSignIn) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
}