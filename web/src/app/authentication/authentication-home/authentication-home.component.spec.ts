import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationHomeComponent } from './authentication-home.component';

describe('HomeComponent', () => {
  let component: AuthenticationHomeComponent;
  let fixture: ComponentFixture<AuthenticationHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenticationHomeComponent]
    });
    fixture = TestBed.createComponent(AuthenticationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
