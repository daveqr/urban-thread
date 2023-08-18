import { Component, Input } from '@angular/core';
import { UtilitiesService } from '../../shared/utilities.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  @Input() categories: any;

  constructor(private utilitiesService: UtilitiesService) { }

  generateSlug(categoryName: string) {
    const slug = this.utilitiesService.createSlug(categoryName);
    return slug
  }
}