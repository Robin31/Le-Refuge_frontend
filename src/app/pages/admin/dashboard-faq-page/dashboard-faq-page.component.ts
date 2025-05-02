import { Component } from '@angular/core';
import { DashboardMenuComponent } from 'src/app/components/admin/dashboard-menu/dashboard-menu.component';
import { MenuComponent } from 'src/app/components/menu/menu.component';

@Component({
  selector: 'app-dashboard-faq-page',
  standalone: true,
  imports: [MenuComponent, DashboardMenuComponent],
  templateUrl: './dashboard-faq-page.component.html',
  styleUrl: './dashboard-faq-page.component.scss',
})
export class DashboardFaqPageComponent {}
