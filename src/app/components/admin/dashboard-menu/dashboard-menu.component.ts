import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';
import { dashboardMenuRoutesPath } from './dashboard-menu.routes';
import { TieredMenu } from 'primeng/tieredmenu';

type TabItem = {
  routerLink?: string;
  label: string;
  icon?: string;
  items?: TabItem[];
  route?: string;
};

@Component({
  selector: 'app-dashboard-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, TabsModule, TieredMenu],
  templateUrl: './dashboard-menu.component.html',
  styleUrl: './dashboard-menu.component.scss',
})
export class DashboardMenuComponent {
  _router: Router = inject(Router);
  tabs: TabItem[] = [
    { routerLink: dashboardMenuRoutesPath.benevole, label: 'Bénévoles', icon: 'fa fa-solid fa-hand-holding-heart' },
    { routerLink: dashboardMenuRoutesPath.user, label: 'Utilisateurs', icon: 'fa fa-solid fa-users' },
    { routerLink: dashboardMenuRoutesPath.faq, label: 'Faqs', icon: 'fa fa-solid fa-question' },
  ];

  chienMenu: MenuItem[] = [
    {
      label: 'Chiens',
      icon: 'fa fa-solid fa-dog',
      items: [
        { routerLink: ['/admin/dashboard', dashboardMenuRoutesPath.chien], label: 'Les chiens', icon: 'fa fa-solid fa-dog' },
        {
          routerLink: ['/admin/dashboard', dashboardMenuRoutesPath.chien, dashboardMenuRoutesPath.sexe],
          label: 'Les sexes',
          icon: 'fa fa-solid fa-venus-mars',
        },
        {
          routerLink: ['/admin/dashboard', dashboardMenuRoutesPath.chien, dashboardMenuRoutesPath.race],
          label: 'Les races',
          icon: 'fa fa-solid fa-paw',
        },
        {
          routerLink: ['/admin/dashboard', dashboardMenuRoutesPath.chien, dashboardMenuRoutesPath.caractere],
          label: 'Les caractères',
          icon: 'fa-solid fa-face-laugh-wink',
        },
      ],
    },
  ];
}
