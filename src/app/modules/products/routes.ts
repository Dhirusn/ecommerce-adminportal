import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: { title: 'Products' },
    children: [
      { path: '', redirectTo: 'product-list', pathMatch: 'full' },
      {
        path: 'product-list',
        loadComponent: () => import('./pages/product-list/product-list.component').then(m => m.ProductListComponent),
        data: { title: 'Product List' }
      },
      {
        path: 'create-product',
        loadComponent: () => import('./pages/create-product/create-product.component').then(m => m.CreateProductComponent),
        data: { title: 'Create Product' }
      },
      {
        path: 'edit-product/:id',
        loadComponent: () => import('./pages/edit-product/edit-product.component').then(m => m.EditProductComponent),
        data: { title: 'Edit Product' }
      },
      {
        path: 'product-details/:id',
        loadComponent: () => import('./pages/product-details/product-details.component').then(m => m.ProductDetailsComponent),
        data: { title: 'Product Details' }
      },
      {
        path: 'category-management',
        loadComponent: () => import('./pages/category-management/category-management.component').then(m => m.CategoryManagementComponent),
        data: { title: 'Category Management' }
      },
      {
        path: 'brand-management',
        loadComponent: () => import('./pages/brand-management/brand-management.component').then(m => m.BrandManagementComponent),
        data: { title: 'Brand Management' }
      },
      {
        path: 'tag-management',
        loadComponent: () => import('./pages/tag-management/tag-management.component').then(m => m.TagManagementComponent),
        data: { title: 'Tag Management' }
      },
      {
        path: 'inventory-management',
        loadComponent: () => import('./pages/inventory-management/inventory-management.component').then(m => m.InventoryManagementComponent),
        data: { title: 'Inventory Management' }
      },
      {
        path: 'bulk-import-export',
        loadComponent: () => import('./pages/bulk-import-export/bulk-import-export.component').then(m => m.BulkImportExportComponent),
        data: { title: 'Bulk Import/Export' }
      },
      {
        path: 'archived-products',
        loadComponent: () => import('./pages/archived-products/archived-products.component').then(m => m.ArchivedProductsComponent),
        data: { title: 'Archived Products' }
      },
      {
        path: 'variant-management',
        loadComponent: () => import('./pages/variant-management/variant-management.component').then(m => m.VariantManagementComponent),
        data: { title: 'Variant Management' }
      },
      {
        path: 'price-history/:id',
        loadComponent: () => import('./pages/price-history/price-history.component').then(m => m.PriceHistoryComponent),
        data: { title: 'Price History' }
      },
      {
        path: 'digital-products',
        loadComponent: () => import('./pages/digital-products/digital-products.component').then(m => m.DigitalProductsComponent),
        data: { title: 'Digital Products' }
      }
    ]
  }
];
