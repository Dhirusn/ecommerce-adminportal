import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategoryComponent } from './list-category/list-category.component';

const routes: Routes = [
  {
    path: '',
    data: { title: 'Category' },
    children: [
      { path: '', redirectTo: 'category-list', pathMatch: 'full' },
      {
        path: 'category-list',
        component: ListCategoryComponent,
        data: { title: 'Product List' }
      },
      {
        path: 'create-product',
        loadComponent: () => import('./add-category/add-category.component').then(m => m.AddCategoryComponent),
        data: { title: 'Create Product' }
      },
      {
        path: 'edit-product/:id',
        loadComponent: () => import('./edit-category/edit-category.component').then(m => m.EditCategoryComponent),
        data: { title: 'Edit Product' }
      },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
