import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

interface SignupData {
  fullName: string;
  email: string;
  password: string;
  gender?: string | null;
  phoneNumber?: string | null;
}

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/auth`; // backend url


  signup(user: SignupData): Observable<boolean> {
  return this.http.post(`${this.apiUrl}/signup`, user).pipe(
    // .post returns Obs<Object> but func excepts Obs<bool> so convert it using map
    map(() => true),
    catchError((error) => {
      console.error('Signup failed:', error);
      return of(false);
    })
  );
}

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      // Backend returns token
      map((response) => {
        if (response?.token) {
          localStorage.setItem('token', response.token);
          return true;
        }
        return false;
      }),

      // pretend the observable returned false, don't crash the app.
      catchError((error) => {
        console.error('Login failed:', error);
        return of(false);
      }),
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');  // !! converts to boolean
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
