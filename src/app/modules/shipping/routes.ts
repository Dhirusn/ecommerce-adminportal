import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: { title: 'Shipping' },
    children: [
      { path: '', redirectTo: 'rules', pathMatch: 'full' },
      {
        path: 'rules',
        loadComponent: () => import('./shipping-rules/shipping-rules.component').then(m => m.ShippingRulesComponent),
        data: { title: 'Shipping Rules' }
      },
      {
        path: 'carriers',
        loadComponent: () => import('./carriers/carriers.component').then(m => m.CarriersComponent),
        data: { title: 'Carriers' }
      },
      {
        path: 'tracking',
        loadComponent: () => import('./tracking/tracking.component').then(m => m.TrackingComponent),
        data: { title: 'Tracking' }
      }
    ]
  }
];
