import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Race, RaceCreate } from '../models/race-model';

@Injectable({
  providedIn: 'root',
})
export class RaceService {
  private readonly _apiUrl = `${environment.apiUrl}/races`;
  private readonly _http = inject(HttpClient);

  private _races = signal<Race[]>([]);
  public races = this._races.asReadonly();

  loadRaces(): void {
    this.getAllRaces().subscribe(races => {
      this._races.set(races);
    });
  }

  getAllRaces(): Observable<Race[]> {
    return this._http.get<Race[]>(this._apiUrl);
  }

  add(race: RaceCreate): Observable<Race> {
    return this._http.post<Race>(this._apiUrl, race);
  }

  update(id: number, race: Race): Observable<Race> {
    return this._http.put<Race>(this._apiUrl + '/' + id, race);
  }

  delete(id: number): Observable<void> {
    return this._http.delete<void>(this._apiUrl + '/' + id);
  }

  getRaceById(race: Race): Observable<Race> {
    return this._http.get<Race>(this._apiUrl + '/' + race.id);
  }
}
