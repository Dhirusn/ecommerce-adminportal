import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: { title: 'Settings' },
    children: [
      { path: '', redirectTo: 'store', pathMatch: 'full' },
      {
        path: 'store',
        loadComponent: () => import('./store-settings/store-settings.component').then(m => m.StoreSettingsComponent),
        data: { title: 'Store Settings' }
      },
      {
        path: 'payment',
        loadComponent: () => import('./payment-settings/payment-settings.component').then(m => m.PaymentSettingsComponent),
        data: { title: 'Payment Settings' }
      },
      {
        path: 'email',
        loadComponent: () => import('./email-settings/email-settings.component').then(m => m.EmailSettingsComponent),
        data: { title: 'Email Settings' }
      },
      {
        path: 'users',
        loadComponent: () => import('./user-management/user-management.component').then(m => m.UserManagementComponent),
        data: { title: 'User Management' }
      }
    ]
  }
];
