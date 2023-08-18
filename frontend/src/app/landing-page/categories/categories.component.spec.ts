import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UtilitiesService } from '../../shared/utilities.service';
import { SimplifiedCategory } from '../../models/simplified-category.model';
import { CategoriesComponent } from './categories.component';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriesComponent],
      providers: [UtilitiesService]
    });
    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display categories', () => {
    const categories: SimplifiedCategory[] = [
      {
        name: 'Category 1',
        description: 'Description 1',
        editionName: 'Edition 1'
      },
      {
        name: 'Category 2',
        description: 'Description 2',
        editionName: 'Edition 2'
      }
    ];

    component.categories = categories;
    fixture.detectChanges();

    const categoryElements = fixture.nativeElement.querySelectorAll('.category');
    expect(categoryElements.length).toBe(categories.length);

    expect(categoryElements[0].textContent).toContain('Category 1');
    expect(categoryElements[1].textContent).toContain('Category 2');
  });

  it('should generate correct slugs', () => {
    const categoryName = 'Test Category';
    const slug = component.generateSlug(categoryName);
    expect(slug).toBe('test_category');
  });

  it('should not display categories when input is empty', () => {
    component.categories = [];
    fixture.detectChanges();

    const categoryElements = fixture.nativeElement.querySelectorAll('.category');
    expect(categoryElements.length).toBe(0);
  });

  it('should display slugs for each category', () => {
    const categories: SimplifiedCategory[] = [
      {
        name: 'Category 1',
        description: 'Description 1',
        editionName: 'Edition 1'
      },
      {
        name: 'Category 2',
        description: 'Description 2',
        editionName: 'Edition 2'
      }
    ];

    component.categories = categories;
    fixture.detectChanges();

    const slugElements = fixture.nativeElement.querySelectorAll('.slug');
    expect(slugElements.length).toBe(categories.length);

    expect(slugElements[0].textContent).toContain('category_1');
    expect(slugElements[1].textContent).toContain('category_2');
  });

  it('should not display invalid slugs', () => {
    const categories: SimplifiedCategory[] = [
      {
        name: 'Category 1',
        description: 'Description 1',
        editionName: 'Edition 1'
      },
      {
        name: 'Category @2',
        description: 'Description 2',
        editionName: 'Edition 2'
      }
    ];

    component.categories = categories;
    fixture.detectChanges();

    const slugElements = fixture.nativeElement.querySelectorAll('.slug');
    expect(slugElements.length).toBe(1);

    // Verify that only the valid slug is displayed
    expect(slugElements[0].textContent).toContain('category_1');
  });
});
