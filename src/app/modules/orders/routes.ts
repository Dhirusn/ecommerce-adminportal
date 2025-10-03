import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: { title: 'Orders' },
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        loadComponent: () => import('./components/order-list/order-list.component').then(m => m.OrderListComponent),
        data: { title: 'Order List' }
      },
      {
        path: 'new',
        loadComponent: () => import('./components/order-list/order-list.component').then(m => m.OrderListComponent),
        data: { title: 'New Orders', filter: { status: 'pending' } }
      },
      {
        path: 'pending',
        loadComponent: () => import('./components/order-list/order-list.component').then(m => m.OrderListComponent),
        data: { title: 'Pending Orders', filter: { status: 'processing' } }
      },
      {
        path: 'completed',
        loadComponent: () => import('./components/order-list/order-list.component').then(m => m.OrderListComponent),
        data: { title: 'Completed Orders', filter: { status: 'delivered' } }
      },
      {
        path: 'details/:id',
        loadComponent: () => import('./components/order-details/order-details.component').then(m => m.OrderDetailsComponent),
        data: { title: 'Order Details' }
      },
      {
        path: 'create',
        loadComponent: () => import('./components/order-create/order-create.component').then(m => m.OrderCreateComponent),
        data: { title: 'Create Order' }
      }
    ]
  }
];
