import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiResponse, Product, ProductCreateDto, ProductUpdateDto } from '../../models/product.model';
import { PaginatedResult, Result } from '../../models/PaginatedResult.model';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'https://localhost:7260/products';

  constructor(private http: HttpClient) { }

  getAll(pageNumber: number, pageSize: number): Observable<Result<PaginatedResult<Product>>> {
    return this.http.get<Result<PaginatedResult<Product>>>(`${this.baseUrl}/getAll?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }


  getById(id: string): Observable<ApiResponse<Product>> {
    return this.http.get<ApiResponse<Product>>(`${this.baseUrl}/getById/${id}`);
  }

  create(product: Product): void {
    if (product.id === undefined) {
      return
    }


    const createProduct: ProductCreateDto = {
      title: product.title!,
      description: product.description!,
      price: product.price ?? 0,
      // imageUrl: product.imageUrl!,
      stock: product.stock ?? 0,
      brandId: product.brandId!,
      categoryIds: product.categories?.map(c => c.id)!,
    };

    this.http.post(`${this.baseUrl}/create`, createProduct).pipe(
      catchError(error => {
        console.error('Error creating product:', error);
        return throwError(() => new Error('Failed to create product'));
      })
    ).subscribe({
      next: (response) => {
        console.log('Product created successfully:', response);
        // Optionally show success message or navigate
      },
      error: (err) => {
        // Already handled in catchError, but you can handle it here too
        console.error('Error creating product:', err);
      }
    });
  }


  // Update existing product
  update(product: Product): void {
    if (!product.id) {
      throwError(() => new Error('Product ID is required for update'));
      return;
    }

    // Map Product → ProductUpdateDto
    const updateDto: ProductUpdateDto = {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      imageUrls: product.imageUrls,
      stock: product.stock,
      brandId: product.brandId,
      CategoryIds: product.categories?.map(c => c.id) ?? []  // map to IDs
    };

    this.http.put<Product>(`${this.baseUrl}/update`, updateDto).pipe(
      catchError((error) => {
        console.error('Error updating product:', error);
        return throwError(() => new Error('Failed to update product'));
      })
    ).subscribe({
      next: (response) => {
        console.log('Product updated successfully:', response);
        // Optionally show success message or navigate
      },
      error: (err) => {
        // Already handled in catchError
        console.error('Error updating product:', err);
      }
    });
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
