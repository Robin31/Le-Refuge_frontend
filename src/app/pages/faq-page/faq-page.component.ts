import { Component, inject, OnInit } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { FaqCardComponent } from '../../components/faq-card/faq-card.component';
import { FaqService } from '../../services/faq.service';
import { Faq } from 'src/app/models/faq-model';

@Component({
  selector: 'app-faq-page',
  standalone: true,
  imports: [MenuComponent, FaqCardComponent],
  templateUrl: './faq-page.component.html',
  styleUrl: './faq-page.component.scss',
})
export class FaqPageComponent implements OnInit {
  _faqService = inject(FaqService);

  get faqs(): Faq[] {
    return this._faqService.faqs();
  }

  ngOnInit(): void {
    this._faqService.loadFaqs();
  }
}
