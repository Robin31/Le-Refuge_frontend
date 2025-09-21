import { Component, computed, input } from '@angular/core';
import { Chien } from '../../models/chien-model';
import { TransformCaracterePipe } from '../chien-card/transform-caractere.pipe';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-chien-modal',
  standalone: true,
  imports: [TransformCaracterePipe, CommonModule, PanelModule],
  templateUrl: './chien-modal.component.html',
  styleUrl: './chien-modal.component.scss',
})
export class ChienModalComponent {
  chien = input.required<Chien | null>();

  noPhoto = 'anonyme.jpg';

  readonly imageUrl = computed(() => {
    const value = this.chien();
    const image = value?.image;
    if (!image) return 'assets/no-photo.jpg';

    if (image.startsWith('http://') || image.startsWith('https://')) {
      return image;
    }

    return `http://localhost:8080/chiens/images/${image}`;
  });
}
