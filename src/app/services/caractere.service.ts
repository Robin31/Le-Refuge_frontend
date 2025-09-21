import { inject, Injectable, signal } from '@angular/core';
import { Caractere, CaractereCreate } from '../models/caractere-model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CaractereService {
  private readonly _http = inject(HttpClient);
  private readonly _apiUrl = `${environment.apiUrl}/caracteres`;

  private _caracteres = signal<Caractere[]>([]);
  public caracteres = this._caracteres.asReadonly();

  loadCaracteres(): void {
    this.getAllCaracteres().subscribe(caracteres => {
      this._caracteres.set(caracteres);
    });
  }

  getAllCaracteres(): Observable<Caractere[]> {
    return this._http.get<Caractere[]>(this._apiUrl);
  }

  add(caractere: CaractereCreate): Observable<Caractere> {
    return this._http.post<Caractere>(this._apiUrl, caractere);
  }

  update(id: number, caractere: Caractere): Observable<Caractere> {
    return this._http.put<Caractere>(this._apiUrl + '/' + id, caractere);
  }

  delete(id: number): Observable<void> {
    return this._http.delete<void>(this._apiUrl + '/' + id);
  }

  getCaractereById(caractere: Caractere): Observable<Caractere> {
    return this._http.get<Caractere>(this._apiUrl + '/' + caractere.id);
  }
}
