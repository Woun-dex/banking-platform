import { Component , Input , OnInit , inject, signal } from "@angular/core";
import { TransactionApiService } from "../../../core/services/transaction-api.service";
import { AsyncPipe, CurrencyPipe, DatePipe, SlicePipe } from "@angular/common";

@Component({
    selector: 'app-transaction-history',
    standalone: true,
    imports: [AsyncPipe, CurrencyPipe, DatePipe, SlicePipe],
    templateUrl: './transaction-history.html'
})
export class TransactionHistoryComponent implements OnInit {
    @Input() accountId!: string;
    private txService = inject(TransactionApiService);
    
    transactions = signal<any[]>([]);
    loading = signal(true);
    filter = signal<'all' | 'completed' | 'pending' | 'failed'>('all');

    ngOnInit() {
        this.txService.getHistory(this.accountId).subscribe({
            next: (data) => {
                this.transactions.set(data);
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
            }
        });
    }

    setFilter(filter: 'all' | 'completed' | 'pending' | 'failed') {
        this.filter.set(filter);
    }

    get filteredTransactions() {
        const all = this.transactions();
        if (this.filter() === 'all') return all;
        return all.filter(tx => tx.status?.toLowerCase() === this.filter());
    }
}
    