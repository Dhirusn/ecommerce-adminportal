import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models/category.model';
import { freeSet } from '@coreui/icons';
import { CategoryService } from '../category.service';


@Component({
  selector: 'app-list-category',
  standalone: false,
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {
  searchQuery = '';
  showParentsOnly = false;
  icons = freeSet;
  categories: Category[] = [
    { id: '0C24', name: 'Fish & Meat', description: 'Fish & Meat', iconUrl: 'assets/icons/fish.png', isPublished: true },
    { id: '0BE8', name: 'Fruits & Vegetable', description: 'Fruits & Vegetable', iconUrl: 'assets/icons/fruit.png', isPublished: true },
    // Add more dummy items...
  ];

  filteredCategories: Category[] = [];

  public constructor(private categoryService: CategoryService){}
  ngOnInit() {
     this.categoryService.getAll().subscribe({
      next: (res) => this.categories = res,
      error: (err) => console.error('Error fetching categories', err)
    });
  }

  filterCategories() {
    this.filteredCategories = this.categories.filter(c =>
      c.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  resetFilters() {
    this.searchQuery = '';
    this.showParentsOnly = false;
    this.filteredCategories = this.categories;
  }

  togglePublished(category: Category) {
    category.isPublished = !category.isPublished;
  }

  deleteCategory(id: string) {
    if (confirm('Are you sure?')) {
      this.categories = this.categories.filter(c => c.id !== id);
      this.filteredCategories = this.categories;
    }
  }
}
