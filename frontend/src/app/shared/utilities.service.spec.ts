import { TestBed } from '@angular/core/testing';
import { UtilitiesService } from './utilities.service';

describe('UtilitiesService', () => {
  let service: UtilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create slug with spaces replaced by underscores', () => {
    const input = 'Hello World';
    const expectedOutput = 'hello_world';
    const result = service.createSlug(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should remove special characters from slug', () => {
    const input = 'Hello @#World 123';
    const expectedOutput = 'hello_world_123';
    const result = service.createSlug(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should convert uppercase letters to lowercase in slug', () => {
    const input = 'HELLO';
    const expectedOutput = 'hello';
    const result = service.createSlug(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle empty input', () => {
    const input = '';
    const expectedOutput = '';
    const result = service.createSlug(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle input with only special characters', () => {
    const input = '@#$%';
    const expectedOutput = '';
    const result = service.createSlug(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle input with spaces and special characters', () => {
    const input = '   @#Hello World 123  !   ';
    const expectedOutput = 'hello_world_123';
    const result = service.createSlug(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle leading and trailing spaces', () => {
    const input = '   Hello World   ';
    const expectedOutput = 'hello_world';
    const result = service.createSlug(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle consecutive special characters', () => {
    const input = 'Hello!!World!!!123';
    const expectedOutput = 'hello_world_123';
    const result = service.createSlug(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle mixed input', () => {
    const input = 'M!x3d   1nput$';
    const expectedOutput = 'mx3d_1nput';
    const result = service.createSlug(input);
    expect(result).toEqual(expectedOutput);
  });
});
