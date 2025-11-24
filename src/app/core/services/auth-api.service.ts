import { Injectable } from '@angular/core';
import { environment } from '../../../evironments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs';
import { AuthResponse , LoginRequest } from '../../shared/models/user.model'



@Injectable({  providedIn: 'root'})
export class AuthApiService {

    private readonly baseUrl = `${environment.apiUrl}/users`;

    constructor(private http: HttpClient) { 
    }

    login(credentials: LoginRequest) : Observable<AuthResponse> {
        const url = `${this.baseUrl}/auth/login`;
        console.log('📤 POST request to:', url, 'with credentials:', credentials);
        return this.http.post<AuthResponse>(url, credentials).pipe(
            tap(response => console.log('✅ Login response:', response)),
            catchError(error => {
                console.error('❌ Login error:', error);
                throw error;
            })
        );
    }

    register(userData:any): Observable<any> {
        const url = `${this.baseUrl}/user`;
        console.log('📤 POST request to:', url, 'with data:', userData);
        return this.http.post<any>(url, userData).pipe(
            tap(response => console.log('✅ Register response:', response)),
            catchError(error => {
                console.error('❌ Register error:', error);
                throw error;
            })
        );
    }
}