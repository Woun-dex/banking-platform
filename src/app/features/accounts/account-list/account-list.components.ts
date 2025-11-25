import { Component , inject, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { RouterLink } from '@angular/router';
import { selectAllAccounts , selectAccountsLoading } from "../../../state/accounts/account.selectors";
import { loadAccounts } from "../../../state/accounts/account.actions";
import { selectCurrentUser } from "../../../state/auth/auth.selectors";
import { AsyncPipe , CurrencyPipe, SlicePipe } from "@angular/common";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-account-list',
    standalone: true,
    imports: [RouterLink, AsyncPipe, CurrencyPipe, SlicePipe],
    templateUrl: './account-list.html'
})

export class AccountListComponent implements OnInit, OnDestroy {
    private store = inject(Store);
    private subscription?: Subscription;

    accounts$ = this.store.select(selectAllAccounts);
    loading$ = this.store.select(selectAccountsLoading);
    currentUser$ = this.store.select(selectCurrentUser);

    ngOnInit() {
        this.subscription = this.currentUser$.subscribe(user => {
            if (user) {
                this.store.dispatch(loadAccounts({ userId: user.id }));
            }
        });
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}