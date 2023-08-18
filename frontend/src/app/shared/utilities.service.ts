import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  createSlug(input: string): string {
    return input
      .toLowerCase()
      .replace(/ /g, '_')
      .replace(/[^a-z0-9_]/g, '');
  }

}
