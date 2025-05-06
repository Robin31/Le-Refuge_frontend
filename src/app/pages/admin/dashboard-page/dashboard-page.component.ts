import { Component } from '@angular/core';
import { MenuComponent } from '../../../components/menu/menu.component';
import { DashboardMenuComponent } from '../../../components/admin/dashboard-menu/dashboard-menu.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [MenuComponent, DashboardMenuComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {}
