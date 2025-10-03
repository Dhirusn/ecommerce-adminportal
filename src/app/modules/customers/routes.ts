import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: { title: 'Customers' },
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        loadComponent: () => import('./components/customer-list/customer-list.component').then(m => m.CustomerListComponent),
        data: { title: 'Customer List' }
      },
      {
        path: 'groups',
        loadComponent: () => import('./components/customer-groups/customer-groups.component').then(m => m.CustomerGroupsComponent),
        data: { title: 'Customer Groups' }
      },
      {
        path: 'reviews',
        loadComponent: () => import('./components/customer-reviews/customer-reviews.component').then(m => m.CustomerReviewsComponent),
        data: { title: 'Customer Reviews' }
      },
      {
        path: 'details/:id',
        loadComponent: () => import('./components/customer-details/customer-details.component').then(m => m.CustomerDetailsComponent),
        data: { title: 'Customer Details' }
      },
      {
        path: 'create',
        loadComponent: () => import('./components/customer-create/customer-create.component').then(m => m.CustomerCreateComponent),
        data: { title: 'Create Customer' }
      }
    ]
  }
];
