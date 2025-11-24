import { Injectable } from '@angular/core';
import { environment } from '../../../evironments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateAccountDto , AccountResponse } from '../../shared/models/account.model';


@Injectable({  providedIn: 'root'})
export class AcountApiService {
    private readonly baseUrl = `${environment.apiUrl}/accounts`;

    constructor(private http: HttpClient) { }

    createAccount(accountData: CreateAccountDto): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/create`, accountData);
    }

    getAccountDetails(userId: string): Observable<AccountResponse> {
        return this.http.get<AccountResponse>(`${this.baseUrl}/user/${userId}`);
    }
}