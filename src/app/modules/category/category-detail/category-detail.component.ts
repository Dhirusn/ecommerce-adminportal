import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models/category.model';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';
import { freeSet } from '@coreui/icons';

@Component({
  selector: 'app-category-detail',
  standalone: false,
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.scss'
})
export class CategoryDetailComponent implements OnInit {
  category: Category | null = null;
  icons = freeSet;
  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.categoryService.getById(id).subscribe({
        next: (response) => {
          this.category = response; // or just response if not wrapped
        },
        error: (err) => {
          console.error('Failed to fetch category:', err);
        }
      });
    }
  }

  togglePublished(category: Category): void {
    // Example toggle logic
    category.isPublished = !category.isPublished;
    // this.categoryService.update(category.id, { isPublished: category.isPublished }).subscribe();
  }

  deleteCategory(id: string): void {
    // Example delete logic
    this.categoryService.delete(id).subscribe(() => {
      console.log('Category deleted');
    });
  }

  editCategory(category: Category): void {
    // Navigate or open modal for editing
    console.log('Edit:', category);
  }

  createChild(parentId: string): void {
    // Navigate or open modal for creating new child category
    console.log('Create child for parent ID:', parentId);
  }
}