export interface Category {
  id: string;
  name: string;
  description?: string;
  iconUrl?: string;
  parentId: string | null;
  parent: Category | null;
  children: Category[];
  products: any[]; // Adjust if you have a specific Product model
  productCategories: any[]; // Adjust if you have a ProductCategory model
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  isPublished?: boolean; // Optional: add this if you're tracking publication
}
