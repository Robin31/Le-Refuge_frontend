import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from 'src/environments/environment.development';

type DecodedToken = {
  sub: string;
  roles: { authority: string }[];
  iat: number;
  exp: number;
};

const NONE_VALEUR = 0;
const CONNEXION_TIMEOUT = 1000;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http: HttpClient = inject(HttpClient);
  private readonly _apiUrl = `${environment.apiUrl}/auth`;
  private _loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  loggedIn$ = this._loggedIn.asObservable();

  public register$(email: string, password: string): Observable<boolean> {
    return this._http.post<boolean>(`${this._apiUrl}/register`, { email, password });
  }

  public login$(email: string, password: string): Observable<{ token: string }> {
    return this._http.post<{ token: string }>(`${this._apiUrl}/login`, { email, password }).pipe(tap(response => this.saveToken(response.token)));
  }

  public hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  public saveToken(token: string): void {
    localStorage.setItem('token', token);
    this._loggedIn.next(true);
  }

  public getToken(): string | null {
    return localStorage.getItem('token') as string;
  }

  public clearToken(): void {
    localStorage.removeItem('token');
    this._loggedIn.next(false);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);
    const expiryDate = new Date(decodedToken.exp * CONNEXION_TIMEOUT);
    if (expiryDate < new Date()) {
      this.clearToken();
      return false;
    }
    return true;
  }

  getDecodedToken(): DecodedToken | null {
    const token = this.getToken();
    if (!token) return null;
    const decoded = jwtDecode<DecodedToken>(token);
    console.log('Decoded Token:', decoded);
    return decoded;
  }

  getUserRole(): string | null {
    const decodedToken = this.getDecodedToken();
    if (!decodedToken || !decodedToken.roles || decodedToken.roles.length === NONE_VALEUR) {
      return null;
    }
    return decodedToken.roles[NONE_VALEUR].authority;
  }
}
