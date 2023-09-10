import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  /**
   * Creates a slug from a given string.
   *
   * A slug is a URL-friendly version of a string. It converts the input string to lowercase, replaces spaces with underscores and removes non-alphanumeric characters.
   *
   * @example
   * ```
   * const inputString = 'Hello World Example';
   * const slug = utilitiesService.createSlug(inputString); // Returns 'hello_world_example'
   * ``` 
   */
  createSlug(input: string): string {
    return input
      .toLowerCase()
      .replace(/ /g, '_')
      .replace(/[^a-z0-9_]/g, '');
  }
}