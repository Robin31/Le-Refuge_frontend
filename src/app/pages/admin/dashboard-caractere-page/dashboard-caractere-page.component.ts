import { Component } from '@angular/core';
import { DashboardMenuComponent } from 'src/app/components/admin/dashboard-menu/dashboard-menu.component';
import { MenuComponent } from 'src/app/components/menu/menu.component';

@Component({
  selector: 'app-dashboard-caractere-page',
  standalone: true,
  imports: [MenuComponent, DashboardMenuComponent],
  templateUrl: './dashboard-caractere-page.component.html',
  styleUrl: './dashboard-caractere-page.component.scss',
})
export class DashboardCaracterePageComponent {}
