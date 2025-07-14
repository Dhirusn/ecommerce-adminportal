import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategoryComponent } from './list-category/list-category.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';

const routes: Routes = [
  {
    path: '',
    data: { title: 'Category' },
    children: [
      { path: '', redirectTo: 'category-list', pathMatch: 'full' },
      {
        path: 'category-list',
        component: ListCategoryComponent,
        data: { title: 'Category List' }
      },
       {
        path: 'category-detail/:id',
        component: CategoryDetailComponent,
        data: { title: 'Category Detail' }
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
