import { Route } from '@angular/router';

export const dashboardMenuRoutesPath = {
  chien: 'chien',
  sexe: 'sexe',
  race: 'race',
  caractere: 'caractere',
  user: 'user',
  benevole: 'benevole',
  faq: 'faq',
  dashboard: 'dashboard',
};

export const dashboardMenuRoutes: Route[] = [
  {
    path: 'admin/dashboard',
    loadComponent: () => import('../../../pages/admin/dashboard-page/dashboard-page.component').then(m => m.DashboardPageComponent),
    children: [
      {
        path: dashboardMenuRoutesPath.chien,
        loadComponent: () =>
          import('../../../pages/admin/dashboard-chien-page/dashboard-chien-page.component').then(m => m.DashboardChienPageComponent),
        children: [
          {
            path: dashboardMenuRoutesPath.sexe,
            loadComponent: () =>
              import('../../../pages/admin/dashboard-sexe-page/dashboard-sexe-page.component').then(m => m.DashboardSexePageComponent),
          },
          {
            path: dashboardMenuRoutesPath.race,
            loadComponent: () =>
              import('../../../pages/admin/dashboard-race-page/dashboard-race-page.component').then(m => m.DashboardRacePageComponent),
          },
          {
            path: dashboardMenuRoutesPath.caractere,
            loadComponent: () =>
              import('../../../pages/admin/dashboard-caractere-page/dashboard-caractere-page.component').then(m => m.DashboardCaracterePageComponent),
          },
        ],
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
