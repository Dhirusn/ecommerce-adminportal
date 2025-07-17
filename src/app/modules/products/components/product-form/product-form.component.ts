import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  OffcanvasBodyComponent,
  OffcanvasComponent,
  OffcanvasHeaderComponent
} from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { Product, ProductImages } from '../../../../models/product.model';
import { CategoryService } from '../../../category/category.service';
import { Category } from '../../../../models/category.model';
import { FilterCategoryPipe } from '../../../../pipes/filterCategory.pipe'
@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    OffcanvasBodyComponent,
    OffcanvasComponent,
    OffcanvasHeaderComponent,
    FilterCategoryPipe
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  @Input() visible = false;
  @Input() product: Product = {
    title: '',
    description: '',
    price: 0,
    imageUrls: null,
    stock: 0,
    brandId: null,
    category: null,
    id: null
  };

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() submit = new EventEmitter<any>();

  selectedFiles: File[] = [];
  allCategories: Category[] = []; // fetched from backend
  categorySearch = ''; // for filtering
  constructor(private categoryService: CategoryService) { }
  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next: (response) => {
        console.log(response)
        this.allCategories = response.data?.items ?? [];
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }
  handleImageUpload(event: any) {
    const files = Array.from(event.target.files);
    this.selectedFiles.push(...(files as File[]));
    for (let file of files as File[]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (!this.product.imageUrls) {
          this.product.imageUrls = [];
        }
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(index: number) {
    this.selectedFiles.splice(index, 1);
  }

  emitSubmit() {
    this.submit.emit(this.product);
    this.visible = false;
    this.visibleChange.emit(false);
  }

  cancel() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  getImagePreview(file: File): string {
    return URL.createObjectURL(file);
  }

  onPriceInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.product.price = parseFloat(input.value) || 0;
  }

  onStockInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.product.stock = parseInt(input.value, 10) || 0;
  }

  addCategory(category: Category) {
    if (!this.product.category) {
      this.product.category = [];
    }
    const alreadyExists = this.product.category.find(c => c.id === category.id);
    if (!alreadyExists) {
      this.product.category.push(category);
    }
  }

  removeCategory(index: number) {
    this.product.category?.splice(index, 1);
  }


}
