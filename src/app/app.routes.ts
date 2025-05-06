import { Routes } from '@angular/router';
import { AccueilPageComponent } from './pages/accueil-page/accueil-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { FaqPageComponent } from './pages/faq-page/faq-page.component';
import { DashboardPageComponent } from './pages/admin/dashboard-page/dashboard-page.component';
import { DashboardFaqPageComponent } from './pages/admin/dashboard-faq-page/dashboard-faq-page.component';
import { DashboardUserPageComponent } from './pages/admin/dashboard-user-page/dashboard-user-page.component';
import { DashboardChienPageComponent } from './pages/admin/dashboard-chien-page/dashboard-chien-page.component';
import { DashboardBenevolePageComponent } from './pages/admin/dashboard-benevole-page/dashboard-benevole-page.component';

export const routes: Routes = [
  {
    path: '',
    component: AccueilPageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'signup',
    component: SignupPageComponent,
  },
  {
    path: 'faq',
    component: FaqPageComponent,
  },
  {
    path: 'admin/dashboard',
    component: DashboardPageComponent,
  },
  {
    path: 'admin/dashboard/faq',
    component: DashboardFaqPageComponent,
  },
  {
    path: 'admin/dashboard/benevole',
    component: DashboardBenevolePageComponent,
  },
  {
    path: 'admin/dashboard/user',
    component: DashboardUserPageComponent,
  },
  {
    path: 'admin/dashboard/chien',
    component: DashboardChienPageComponent,
  },
];
