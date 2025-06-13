import { Component, input } from '@angular/core';
import { Chien } from '../../models/chien-model';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chien-card',
  standalone: true,
  imports: [CardModule, CommonModule],
  templateUrl: './chien-card.component.html',
  styleUrl: './chien-card.component.scss',
})
export class ChienCardComponent {
  chien = input.required<Chien>();

  noPhoto = 'anonyme.jpg';
}
