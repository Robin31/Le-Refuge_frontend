import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardMenuComponent } from 'src/app/components/admin/dashboard-menu/dashboard-menu.component';
import { MenuComponent } from 'src/app/components/menu/menu.component';

@Component({
  selector: 'app-dashboard-chien-page',
  standalone: true,
  imports: [MenuComponent, DashboardMenuComponent, RouterModule],
  templateUrl: './dashboard-chien-page.component.html',
  styleUrl: './dashboard-chien-page.component.scss',
})
export class DashboardChienPageComponent {}
