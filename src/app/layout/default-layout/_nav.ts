import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Theme'
  },
  {
    name: 'Catalog',
    url: '',
    iconComponent: { name: 'cil-box' },
    children: [
      {
        name: 'Product',
        url: '/products',
        icon: 'nav-icon-bullet'
      },
       {
        name: 'Category',
        url: '/category',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    name: 'Orders',
    url: '/orders',
    iconComponent: { name: 'cil-basket' },
    children: [
      {
        name: 'Order List',
        url: '/orders/list',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'New Orders',
        url: '/orders/new',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Pending Orders',
        url: '/orders/pending',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Completed Orders',
        url: '/orders/completed',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    name: 'Customers',
    url: '/customers',
    iconComponent: { name: 'cil-people' },
    children: [
      {
        name: 'Customer List',
        url: '/customers/list',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Customer Groups',
        url: '/customers/groups',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Customer Reviews',
        url: '/customers/reviews',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    name: 'Shipping',
    url: '/shipping',
    iconComponent: { name: 'cil-truck' },
    children: [
      {
        name: 'Shipping Rules',
        url: '/shipping/rules',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Carriers',
        url: '/shipping/carriers',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Tracking',
        url: '/shipping/tracking',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    name: 'Settings',
    url: '/settings',
    iconComponent: { name: 'cil-settings' },
    children: [
      {
        name: 'Store Settings',
        url: '/settings/store',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Payment Settings',
        url: '/settings/payment',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Email Templates',
        url: '/settings/email',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'User Management',
        url: '/settings/users',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  // {
  //   name: 'Typography',
  //   url: '/theme/typography',
  //   linkProps: { fragment: 'headings' },
  //   iconComponent: { name: 'cil-pencil' }
  // },
  // {
  //   name: 'Components',
  //   title: true
  // },
  // {
  //   name: 'Base',
  //   url: '/base',
  //   iconComponent: { name: 'cil-puzzle' },
  //   children: [
  //     {
  //       name: 'Accordion',
  //       url: '/base/accordion',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Breadcrumbs',
  //       url: '/base/breadcrumbs',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Cards',
  //       url: '/base/cards',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Carousel',
  //       url: '/base/carousel',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Collapse',
  //       url: '/base/collapse',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'List Group',
  //       url: '/base/list-group',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Navs & Tabs',
  //       url: '/base/navs',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Pagination',
  //       url: '/base/pagination',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Placeholder',
  //       url: '/base/placeholder',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Popovers',
  //       url: '/base/popovers',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Progress',
  //       url: '/base/progress',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Spinners',
  //       url: '/base/spinners',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Tables',
  //       url: '/base/tables',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Tabs',
  //       url: '/base/tabs',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Tooltips',
  //       url: '/base/tooltips',
  //       icon: 'nav-icon-bullet'
  //     }
  //   ]
  // },
  // {
  //   name: 'Buttons',
  //   url: '/buttons',
  //   iconComponent: { name: 'cil-cursor' },
  //   children: [
  //     {
  //       name: 'Buttons',
  //       url: '/buttons/buttons',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Button groups',
  //       url: '/buttons/button-groups',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Dropdowns',
  //       url: '/buttons/dropdowns',
  //       icon: 'nav-icon-bullet'
  //     }
  //   ]
  // },
  // {
  //   name: 'Forms',
  //   url: '/forms',
  //   iconComponent: { name: 'cil-notes' },
  //   children: [
  //     {
  //       name: 'Form Control',
  //       url: '/forms/form-control',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Select',
  //       url: '/forms/select',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Checks & Radios',
  //       url: '/forms/checks-radios',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Range',
  //       url: '/forms/range',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Input Group',
  //       url: '/forms/input-group',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Floating Labels',
  //       url: '/forms/floating-labels',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Layout',
  //       url: '/forms/layout',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Validation',
  //       url: '/forms/validation',
  //       icon: 'nav-icon-bullet'
  //     }
  //   ]
  // },
  // {
  //   name: 'Charts',
  //   iconComponent: { name: 'cil-chart-pie' },
  //   url: '/charts'
  // },
  // {
  //   name: 'Icons',
  //   iconComponent: { name: 'cil-star' },
  //   url: '/icons',
  //   children: [
  //     {
  //       name: 'CoreUI Free',
  //       url: '/icons/coreui-icons',
  //       icon: 'nav-icon-bullet',
  //       badge: {
  //         color: 'success',
  //         text: 'FREE'
  //       }
  //     },
  //     {
  //       name: 'CoreUI Flags',
  //       url: '/icons/flags',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'CoreUI Brands',
  //       url: '/icons/brands',
  //       icon: 'nav-icon-bullet'
  //     }
  //   ]
  // },
  // {
  //   name: 'Notifications',
  //   url: '/notifications',
  //   iconComponent: { name: 'cil-bell' },
  //   children: [
  //     {
  //       name: 'Alerts',
  //       url: '/notifications/alerts',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Badges',
  //       url: '/notifications/badges',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Modal',
  //       url: '/notifications/modal',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Toast',
  //       url: '/notifications/toasts',
  //       icon: 'nav-icon-bullet'
  //     }
  //   ]
  // },
  // {
  //   name: 'Widgets',
  //   url: '/widgets',
  //   iconComponent: { name: 'cil-calculator' },
  //   badge: {
  //     color: 'info',
  //     text: 'NEW'
  //   }
  // },
  // {
  //   title: true,
  //   name: 'Extras'
  // },
  // {
  //   name: 'Pages',
  //   url: '/login',
  //   iconComponent: { name: 'cil-star' },
  //   children: [
  //     {
  //       name: 'Login',
  //       url: '/login',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Register',
  //       url: '/register',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Error 404',
  //       url: '/404',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Error 500',
  //       url: '/500',
  //       icon: 'nav-icon-bullet'
  //     }
  //   ]
  // },
  // {
  //   title: true,
  //   name: 'Links',
  //   class: 'mt-auto'
  // },
  // {
  //   name: 'Docs',
  //   url: 'https://coreui.io/angular/docs/',
  //   iconComponent: { name: 'cil-description' },
  //   attributes: { target: '_blank' }
  // }
];
