// category-names.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../models/category.model';

@Pipe({
  name: 'categoryNames'
})
// category-names.pipe.ts
export class CategoryNamesPipe implements PipeTransform {
  transform(categories: Category[]): string { // Remove null/undefined from type
    return categories.map(category => category.name).join(', ');
  }
}