import { Category } from "./category.model";

export interface Product {
  id: string | null;
  title: string | null;
  description: string | null;
  price: number | null;
  imageUrls: ProductImages[] | null;
  stock: number | null;
  brandId: string | null;
  category: Category[] | null;
}

export interface ProductCreateDto {
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
  stock: number;
  brandId?: string;
  categoryIds: string[];
}

export interface ApiResponse<T> {
  data: T;
  message: string | null;
  errorCode: string | null;
}

export interface ProductImages {
  ProductId: string | null;
  Url: string | null;
  IsMain: boolean | false;
}