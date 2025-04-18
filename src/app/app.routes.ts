import { Routes } from '@angular/router';
import { AccueilPageComponent } from './pages/accueil-page/accueil-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';

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
];
