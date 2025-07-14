export interface ProductDto {
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
}

export interface ProductApiDto {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
  stock: number;
  categoryId: string;
  brandId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string | null;
  errorCode: string | null;
}

export interface Product {
  id: string| null;
  title: string| null;
  description: string| null;
  price: number| null;
  imageUrl: string| null;
  stock: number| null;
  brandId: string | null;
  category: Category | null;
}

export interface Category {
  id: string;
  name: string;
}