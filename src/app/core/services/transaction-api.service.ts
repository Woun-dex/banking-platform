import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../../evironments/environment';
import { CreateTransactionDto , TransactionResponse } from '../../shared/models/transaction.model';
import { Observable } from 'rxjs';

@Injectable({  providedIn: 'root'})
export class TransactionApiService {

    private readonly baseUrl = `${environment.apiUrl}/${environment.apiVersion}/transactions`;

    constructor( private http: HttpClient) { }

    initiateTransfer(dto: CreateTransactionDto): Observable<TransactionResponse> {
        return this.http.post<TransactionResponse>(`${this.baseUrl}/transfer`, dto);
    }

    getHistory(userId: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/history/user/${userId}`);
    }
}