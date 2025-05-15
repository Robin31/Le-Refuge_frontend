import { Component } from '@angular/core';
import { DashboardMenuComponent } from 'src/app/components/admin/dashboard-menu/dashboard-menu.component';
import { MenuComponent } from 'src/app/components/menu/menu.component';

@Component({
  selector: 'app-dashboard-race-page',
  standalone: true,
  imports: [MenuComponent, DashboardMenuComponent],
  templateUrl: './dashboard-race-page.component.html',
  styleUrl: './dashboard-race-page.component.scss',
})
export class DashboardRacePageComponent {}
