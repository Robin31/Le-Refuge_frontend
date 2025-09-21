import { Component } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';

@Component({
  selector: 'app-accueil-page',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './accueil-page.component.html',
  styleUrl: './accueil-page.component.scss',
})
export class AccueilPageComponent {}
