import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from 'src/environments/environment.development';

type DecodedToken = {
  sub: string;
  role: { authority: string }[];
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

  public register$(email: string, password: string): Observable<boolean> {
    return this._http.post<boolean>(`${this._apiUrl}/register`, { email, password });
  }

  public login$(email: string, password: string): Observable<{ token: string }> {
    return this._http.post<{ token: string }>(`${this._apiUrl}/login`, { email, password }).pipe(tap(response => this.saveToken(response.token)));
  }

  public saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public getToken(): string | null {
    return localStorage.getItem('token') as string;
  }

  public clearToken(): void {
    localStorage.removeItem('token');
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
    return jwtDecode<DecodedToken>(token);
  }

  getUserRole(): string | null {
    const decodedToken = this.getDecodedToken();
    if (!decodedToken || !decodedToken.role || decodedToken.role.length === NONE_VALEUR) {
      return null;
    }
    return decodedToken.role[NONE_VALEUR].authority;
  }
}
