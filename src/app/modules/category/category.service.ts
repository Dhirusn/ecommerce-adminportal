import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../models/category.model';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../dto/product.dto';
import { PaginatedResult, Result } from '../../models/PaginatedResult.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'https://localhost:7273/api/categories'; // update with actual backend URL
  constructor(private http: HttpClient) { }

  getAll(): Observable<Result<PaginatedResult<Category>>> {
    return this.http.get<Result<PaginatedResult<Category>>>(this.baseUrl);
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/${id}`);
  }

  getByParentId(parentId: string): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/parent/${parentId}`);
  }

  create(category: Category): Observable<Category> {
    return this.http.post<Category>(this.baseUrl, category);
  }

  update(id: string, category: Category): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, category);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
