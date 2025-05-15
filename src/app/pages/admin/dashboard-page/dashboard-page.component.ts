import { Component } from '@angular/core';
import { MenuComponent } from '../../../components/menu/menu.component';
import { DashboardMenuComponent } from '../../../components/admin/dashboard-menu/dashboard-menu.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [MenuComponent, DashboardMenuComponent, RouterModule],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {}
