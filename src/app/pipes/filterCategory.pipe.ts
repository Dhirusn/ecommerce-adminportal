import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../models/category.model';


@Pipe({
  name: 'filterCategory'
})
export class FilterCategoryPipe implements PipeTransform {
  transform(categories: Category[], search: string): Category[] {
    if (!search) return categories;
    return categories.filter(cat =>
      cat.name.toLowerCase().includes(search.toLowerCase())
    );
  }
}
