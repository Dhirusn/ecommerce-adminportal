import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { AuthResponse, LoginDto, RefreshDto, RegisterDto, RevokeDto } from '../../../../src/app/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private readonly ACCESS_KEY = 'accessToken';
  private readonly REFRESH_KEY = 'refreshToken';

  private readonly apiUrl = 'https://localhost:7260/account'; // update with your API base URL
  private _isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

  public isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private http: HttpClient) {}

  ngOnDestroy(): void {
    this._isLoggedIn$.complete();
  }

  register(model: RegisterDto): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/register`, model);
  }

  login(model: LoginDto): Observable<AuthResponse> {

    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, model);
  }

  refresh(model: RefreshDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, model);
  }

  revoke(model: RevokeDto): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/revoke`, model);
  }

  // Helpers
  private hasToken(): boolean {
    return !!localStorage.getItem(this.ACCESS_KEY);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.ACCESS_KEY);
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now(); // not expired
    } catch {
      return false;
    }
  }

  saveTokens(tokens: AuthResponse) {
    localStorage.setItem(this.ACCESS_KEY, tokens.accessToken);
    localStorage.setItem(this.REFRESH_KEY, tokens.refreshToken);
    this._isLoggedIn$.next(true);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_KEY);
  }

  clearTokens() {
    localStorage.removeItem(this.ACCESS_KEY);
    localStorage.removeItem(this.REFRESH_KEY);
    this._isLoggedIn$.next(false);
  }

  logout(reload: boolean = true) {
    // optional: call backend revoke endpoint here (fire-and-forget)
    this.clearTokens();

    if (reload) {
      window.location.reload();
    }
  }
}
