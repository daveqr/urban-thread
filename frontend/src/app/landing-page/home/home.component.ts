import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-homex',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    // call the service
  }
}