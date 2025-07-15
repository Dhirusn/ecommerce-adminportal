import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { freeSet } from '@coreui/icons';
import { IconDirective, IconModule } from '@coreui/icons-angular';
import { ProductService } from '../../../../services/product/product.service';
import { Product, ProductApiDto } from '../../../../dto/product.dto';
import { HttpClientModule } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { PaginatedResult, Result } from '../../../../models/PaginatedResult.model';
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
  pageSize = 5;
  currentPage = 1;

  products: Product[] | undefined = [];
  res :Result<PaginatedResult<Product>> | null = null;
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe({
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

  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  get endIndex(): number {
    const end = this.startIndex + this.pageSize;
    return end > (this.res?.data?.totalCount || 0) ? (this.res?.data?.totalCount || 0) : end;
  }

  get paginatedProducts() {
    return this.res?.data?.items.slice(this.startIndex, this.endIndex);
  }

  // get pages(): number[] {
  //   return Array(this.totalPages)
  //     .fill(0)
  //     .map((_, i) => i + 1);
  // }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  viewProduct(id: any) {
    this.router.navigate(['/products/product-details', id]);
  }

  public showForm = false;
  public selectedProduct!: Object;

  openCreateForm() {
    this.selectedProduct = {
      title: '',
      description: '',
      images: [],
      sku: '',
      price: 0
    };
    this.showForm = true;
  }

  openEditForm(product: any) {
    this.selectedProduct = { ...product }; // clone to avoid binding issues
    this.showForm = true;
  }

  handleSubmit(data: any) {
    if (data.id) {
      this.productService.update(data.id, data);
    } else {
      debugger
      this.productService.create(data as Product);
    }
  }

  deleteProduct(id: any) {

  }
}
