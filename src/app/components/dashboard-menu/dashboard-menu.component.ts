import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';

type TabItem = {
  route: string;
  label: string;
  icon: string;
};

@Component({
  selector: 'app-dashboard-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, TabsModule],
  templateUrl: './dashboard-menu.component.html',
  styleUrl: './dashboard-menu.component.scss',
})
export class DashboardMenuComponent {
  _router: Router = inject(Router);
  tabs: TabItem[] = [
    { route: 'chiens', label: 'Chiens', icon: 'fa fa-solid fa-dog' },
    { route: 'bénévoles', label: 'Bénévoles', icon: 'fa fa-solid fa-hand-holding-heart' },
    { route: 'utilisateurs', label: 'Utilisateurs', icon: 'fa fa-solid fa-users' },
    { route: 'faq', label: 'Faqs', icon: 'fa fa-solid fa-question' },
  ];

  activeTab: MenuItem = this.tabs[0];

  onTabChange(tab: MenuItem): void {
    this.activeTab = tab;
    if (tab.routerLink) {
      this._router.navigate([tab.routerLink]);
    }
  }
}
