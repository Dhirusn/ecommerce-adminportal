import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models/category.model';
import { freeSet } from '@coreui/icons';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';


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
  categories: Category[] = [];

  filteredCategories: Category[] = [];

  public constructor(private categoryService: CategoryService, private router: Router) {

  }
  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next: (response) => {
        this.categories = response.data?.items ?? [];
        this.filteredCategories = this.categories.filter(c => c.parentId === null);
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
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


  viewCategory(id: number) {
    this.router.navigate(['/category/category-detail', id]);
  }
}
