import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CategoryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that no unexpected requests were made
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch categories', () => {
    const mockCategories = [
      { name: 'Category 1', description: 'Description 1' },
      { name: 'Category 2', description: 'Description 2' },
    ];

    // Make a request to the service
    service.getCategories().subscribe((categories) => {
      expect(categories).toEqual(mockCategories);
    });

    // Expect a GET request to the specified URL
    const req = httpTestingController.expectOne('http://localhost:3000/categories');
    expect(req.request.method).toBe('GET');

    // Respond with mock data
    req.flush(mockCategories);
  });

  // TODO need to fix this.
  // it('should handle HTTP error', fakeAsync(() => {
  //   const errorMessage = 'Server Error';
  //   const status = 500;

  //   let errorResponse: HttpErrorResponse;

  //   // Make a request to the service
  //   service.getCategories().subscribe(
  //     () => {
  //       fail('Expected an error');
  //     },
  //     (error) => {
  //       errorResponse = error;
  //     }
  //   );

  //   const req = httpTestingController.expectOne('http://localhost:3000/categories');
  //   expect(req.request.method).toBe('GET');

  //   // Respond with an error status
  //   req.error(new HttpErrorResponse({ 
  //     error: errorMessage, 
  //     status, 
  //     statusText: 'Internal Server Error' 
  //   }));

  //   // Use tick to simulate passage of time
  //   tick();

  //   expect(errorResponse.status).toBe(status);
  //   expect(errorResponse.statusText).toBe('Internal Server Error');
  //   expect(errorResponse.error).toBe(errorMessage);
  // }));

});
