import { Component } from '@angular/core';
import { DashboardMenuComponent } from 'src/app/components/admin/dashboard-menu/dashboard-menu.component';
import { MenuComponent } from 'src/app/components/menu/menu.component';

@Component({
  selector: 'app-dashboard-user-page',
  standalone: true,
  imports: [MenuComponent, DashboardMenuComponent],
  templateUrl: './dashboard-user-page.component.html',
  styleUrl: './dashboard-user-page.component.scss',
})
export class DashboardUserPageComponent {}
