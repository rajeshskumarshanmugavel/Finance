import { Routes } from '@angular/router';


export const content: Routes = [
  {
   path: 'dashboard',
   loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
   path: 'apps',
   loadChildren: () => import('../../components/apps/apps.module').then(m => m.AppsModule)
  },
  {
   path: 'elements',
   loadChildren: () => import('../../components/elements/elements.module').then(m => m.ElementsModule)
  },
  {
   path: 'advanced-ui',
   loadChildren: () => import('../../components/advanced-ui/advanced-ui.module').then(m => m.AdvancedUiModule)
  },
  {
   path: 'pages',
   loadChildren: () => import('../../components/pages/pages.module').then(m => m.PagesModule)
  },
  {
   path: 'eCommerce',
   loadChildren: () => import('../../components/pages/ecommerce/ecommerce.module').then(m => m.EcommerceModule)
  },
  {
   path: 'mail',
   loadChildren: () => import('../../components/pages/mail/mail.module').then(m => m.MailModule)
  },
  {
   path: 'utilities',
  loadChildren: () => import('../../components/utilities/utilities.module').then(m => m.UtilitiesModule)
  },
  {
   path: 'icons',
   loadChildren: () => import('../../components/icons/icons.module').then(m => m.IconsModule)
  },
  {
   path: 'charts',
   loadChildren: () => import('../../components/charts/charts.module').then(m => m.ChartsModule)
  },
  {
   path: 'forms',
   loadChildren: () => import('../../components/forms/forms.module').then(m => m.FormModule)
  },
  {
   path: 'tables',
   loadChildren: () => import('../../components/tables/tables.module').then(m => m.TablesModule)
  },
  {
   path: 'widgets',
   loadChildren: () => import('../../components/widgets/widgets.module').then(m => m.WidgetsModule)
  },
  {
   path: 'maps',
   loadChildren: () => import('../../components/maps/maps.module').then(m => m.MapsModule)
  },
];
