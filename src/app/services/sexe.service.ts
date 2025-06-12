import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Sexe, SexeCreate } from '../models/sexe-model';

@Injectable({
  providedIn: 'root',
})
export class SexeService {
  private readonly _http = inject(HttpClient);
  private readonly _apiUrl = `${environment.apiUrl}/sexes`;

  private _sexes = signal<Sexe[]>([]);
  public sexes = this._sexes.asReadonly();

  loadSexes(): void {
    this.getAllSexes().subscribe(sexes => {
      this._sexes.set(sexes);
    });
  }

  getAllSexes(): Observable<Sexe[]> {
    return this._http.get<Sexe[]>(this._apiUrl);
  }

  add(sexe: SexeCreate): Observable<Sexe> {
    return this._http.post<Sexe>(this._apiUrl, sexe);
  }

  update(id: number, sexe: Sexe): Observable<Sexe> {
    return this._http.put<Sexe>(this._apiUrl + '/' + id, sexe);
  }

  delete(id: number): Observable<void> {
    return this._http.delete<void>(this._apiUrl + '/' + id);
  }

  getSexeById(sexe: Sexe): Observable<Sexe> {
    return this._http.get<Sexe>(this._apiUrl + '/' + sexe.id);
  }
}
