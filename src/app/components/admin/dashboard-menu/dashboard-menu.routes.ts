import { Route } from '@angular/router';

export const dashboardMenuRoutesPath = {
  chien: 'chien',
  user: 'user',
  benevole: 'benevole',
  faq: 'faq',
  dashboard: 'dashboard',
};

export const dashboardMenuRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('../../../pages/admin/dashboard-page/dashboard-page.component').then(m => m.DashboardPageComponent),
    children: [
      {
        path: dashboardMenuRoutesPath.chien,
        loadComponent: () =>
          import('../../../pages/admin/dashboard-chien-page/dashboard-chien-page.component').then(m => m.DashboardChienPageComponent),
      },
      {
        path: dashboardMenuRoutesPath.benevole,
        loadComponent: () =>
          import('../../../pages/admin/dashboard-benevole-page/dashboard-benevole-page.component').then(m => m.DashboardBenevolePageComponent),
      },
      {
        path: dashboardMenuRoutesPath.user,
        loadComponent: () => import('../../../pages/admin/dashboard-user-page/dashboard-user-page.component').then(m => m.DashboardUserPageComponent),
      },
      {
        path: dashboardMenuRoutesPath.faq,
        loadComponent: () => import('../../../pages/admin/dashboard-faq-page/dashboard-faq-page.component').then(m => m.DashboardFaqPageComponent),
      },
    ],
  },
];
