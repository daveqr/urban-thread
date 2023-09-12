import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartHomeComponent } from './cart-home.component';

describe('CartHomeComponent', () => {
  let component: CartHomeComponent;
  let fixture: ComponentFixture<CartHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartHomeComponent]
    });
    fixture = TestBed.createComponent(CartHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
