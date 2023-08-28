import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesDetailComponent } from './categories-detail.component';

describe('CategoriesDetailComponent', () => {
  let component: CategoriesDetailComponent;
  let fixture: ComponentFixture<CategoriesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriesDetailComponent]
    });
    fixture = TestBed.createComponent(CategoriesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
