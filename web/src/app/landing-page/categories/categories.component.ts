import { Component, Input } from '@angular/core';
import { UtilitiesService } from '../../services/utilities.service';
import { SimplifiedCategory } from '../../models/simplified-category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  @Input()
  categories: SimplifiedCategory[] = [];

  constructor(private utilitiesService: UtilitiesService) { }

  generateSlug(categoryName: string) {
    const slug = this.utilitiesService.createSlug(categoryName);
    return slug
  }
}