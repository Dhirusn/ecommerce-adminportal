import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ProductApiDto, ProductDto, ApiResponse, Product } from '../../dto/product.dto';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'https://localhost:7273/api/Products';

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${this.baseUrl}/getAll`);
  }


  getById(id: number): Observable<ApiResponse<Product>> {
    return this.http.get<ApiResponse<Product>>(`${this.baseUrl}/getById/${id}`);
  }

  create(product: Product): void {
    debugger;
    this.http.post(`${this.baseUrl}/create`, product).pipe(
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


  update(id: number, product: ProductDto): Observable<ProductApiDto> {
    return this.http.put<ProductApiDto>(`${this.baseUrl}/update/${id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
