import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-faq-card',
  standalone: true,
  imports: [CardModule],
  templateUrl: './faq-card.component.html',
  styleUrl: './faq-card.component.scss',
})
export class FaqCardComponent {
  @Input() question!: string;
  @Input() answer!: string;
  isOpen: boolean = false;

  toggleAnswer(): void {
    this.isOpen = !this.isOpen;
  }
}
