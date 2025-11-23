import { Injectable } from '@angular/core';
import { environment } from '../../../evironments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse , LoginRequest } from '../../shared/models/user.model'



@Injectable({  providedIn: 'root'})
export class AuthApiService {

    private readonly baseUrl = `${environment.apiUrl}/${environment.apiVersion}/users`;

    constructor(private http: HttpClient) { }

    login(credentials: LoginRequest) : Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.baseUrl}/auth/token`, credentials);
    }

    register(userData:any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/user`, userData);
    }
}