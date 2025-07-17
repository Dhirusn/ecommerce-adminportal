import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { freeSet } from '@coreui/icons';
import { IconDirective, IconModule } from '@coreui/icons-angular';
import { ProductService } from '../../../../services/product/product.service';
import { HttpClientModule } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { PaginatedResult, Result } from '../../../../models/PaginatedResult.model';
import { Product } from '../../../../models/product.model';
@Component({
  selector: 'app-product-list',
  imports: [CommonModule,
    FormsModule,
    IconModule,    // ✅ Add this
    HttpClientModule,
    ProductFormComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  icons = freeSet;
  pageSize = 10;
  currentPage = 1;

  products: Product[] | undefined = [];
  res: Result<PaginatedResult<Product>> | null = null;
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.updatePageList(1, this.pageSize);

  }

  updatePageList(pageNumber: number, pageSize: number) {
    this.productService.getAll(pageNumber, pageSize).subscribe({
      next: (response) => {
        console.log(response);
        this.products = response.data?.items; // ✅ This is where the array is
        this.res = response;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  get totalPages(): number {
    return Math.ceil(this.res?.data?.totalPages!);
  }

  get paginatedProducts() {
    return this.products;
  }

  nextPage() {
    if (this.res?.data?.hasNext && this.res?.data?.nextPageNumber) {
      this.updatePageList(this.res?.data?.nextPageNumber, this.pageSize)
    }
  }

  prevPage() {
    if (this.res?.data?.hasPrevious && this.res?.data?.previousPageNumber) {
      this.updatePageList(this.res?.data?.previousPageNumber, this.pageSize);
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  viewProduct(id: any) {
    this.router.navigate(['/products/product-details', id]);
  }

  public showForm = false;
  public selectedProduct!: Product;

  openCreateForm() {
    this.selectedProduct = {
      id: null,
      title: '',
      description: '',
      imageUrls: [],
      price: 0,
      brandId: '',
      category: null,
      stock: 0,
    };
    this.showForm = true;
  }

  openEditForm(product: Product) {
    this.selectedProduct = { ...product }; // clone to avoid binding issues
    this.showForm = true;
  }

  handleSubmit(data: Product) {
    if (data.id) {
      this.productService.update(data.id, data);
    } else {
      this.productService.create(data as Product);
    }
  }

  deleteProduct(id: any) {

  }
}
