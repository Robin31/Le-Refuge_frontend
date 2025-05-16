import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Chien, ChienCreate } from '../models/chien-model';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChienService {
  private readonly _apiUrl = `${environment.apiUrl}/chiens`;
  private readonly _http = inject(HttpClient);

  private _chiens = signal<Chien[]>([]);
  public chiens = this._chiens.asReadonly();

  loadChiens(): void {
    this.getAllChiens().subscribe(chiens => {
      this._chiens.set(chiens);
    });
  }

  getAllChiens(): Observable<Chien[]> {
    return this._http.get<Chien[]>(this._apiUrl);
  }

  add(chien: ChienCreate): Observable<Chien> {
    return this._http.post<Chien>(this._apiUrl, chien);
  }

  update(id: number, chien: Chien): Observable<Chien> {
    return this._http.put<Chien>(this._apiUrl + '/' + id, chien);
  }

  delete(id: number): Observable<void> {
    return this._http.delete<void>(this._apiUrl + '/' + id);
  }

  getChienById(chien: Chien): Observable<Chien> {
    return this._http.get<Chien>(this._apiUrl + '/' + chien.id);
  }
}
