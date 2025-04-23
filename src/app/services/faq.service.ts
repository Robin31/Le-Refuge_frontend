import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Faq } from '../models/faq-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FaqService {
  private readonly _http = inject(HttpClient);
  private readonly _apiUrl = `${environment.apiUrl}/faqs`;

  private _faqs = signal<Faq[]>([]);
  public faqs = this._faqs.asReadonly();

  loadFaqs(): void {
    this.getAllFaqs().subscribe(faqs => {
      this._faqs.set(faqs);
    });
  }

  getAllFaqs(): Observable<Faq[]> {
    return this._http.get<Faq[]>(this._apiUrl);
  }
}
