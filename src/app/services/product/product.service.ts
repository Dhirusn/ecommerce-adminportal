import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiResponse, Product, ProductCreateDto } from '../../models/product.model';
import { PaginatedResult, Result } from '../../models/PaginatedResult.model';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'https://localhost:7273/api/Products';

  constructor(private http: HttpClient) { }

  getAll(pageNumber: number, pageSize: number): Observable<Result<PaginatedResult<Product>>> {
    return this.http.get<Result<PaginatedResult<Product>>>(`${this.baseUrl}/getAll?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }


  getById(id: string): Observable<ApiResponse<Product>> {
    return this.http.get<ApiResponse<Product>>(`${this.baseUrl}/getById/${id}`);
  }

  create(product: Product): void {
    debugger;
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
      categoryIds: product.category?.map(c => c.id)!,
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


  update(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/update/${id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
