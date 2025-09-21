import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Faq, FaqCreate } from '../models/faq-model';
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

  add(faq: FaqCreate): Observable<Faq> {
    return this._http.post<Faq>(this._apiUrl, faq);
  }

  update(id: number, faq: Faq): Observable<Faq> {
    return this._http.put<Faq>(this._apiUrl + '/' + id, faq);
  }

  delete(id: number): Observable<void> {
    return this._http.delete<void>(this._apiUrl + '/' + id);
  }

  getFaqById(faq: Faq): Observable<Faq> {
    return this._http.get<Faq>(this._apiUrl + '/' + faq.id);
  }
}
