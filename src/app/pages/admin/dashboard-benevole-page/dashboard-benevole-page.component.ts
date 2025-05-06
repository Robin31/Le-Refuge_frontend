import { Component } from '@angular/core';
import { DashboardMenuComponent } from 'src/app/components/admin/dashboard-menu/dashboard-menu.component';
import { MenuComponent } from 'src/app/components/menu/menu.component';

@Component({
  selector: 'app-dashboard-benevole-page',
  standalone: true,
  imports: [MenuComponent, DashboardMenuComponent],
  templateUrl: './dashboard-benevole-page.component.html',
  styleUrl: './dashboard-benevole-page.component.scss',
})
export class DashboardBenevolePageComponent {}
