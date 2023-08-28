import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDetail } from './category-detail.component';

describe('CategoryDetailComponent', () => {
  let component: CategoryDetail;
  let fixture: ComponentFixture<CategoryDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryDetail]
    });
    fixture = TestBed.createComponent(CategoryDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
