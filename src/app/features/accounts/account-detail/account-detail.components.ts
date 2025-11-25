import { AsyncPipe, CurrencyPipe, SlicePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { loadAccounts } from '../../../state/accounts/account.actions';
import { selectAllAccounts, selectAccountsLoading } from '../../../state/accounts/account.selectors';
import { selectCurrentUser } from '../../../state/auth/auth.selectors';

@Component({
  selector: 'app-account-detail',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, SlicePipe, RouterLink],
  templateUrl: './account-detail.html'
})
export class AccountDetailComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);

  loading$ = this.store.select(selectAccountsLoading);

  account$ = combineLatest([
    this.route.paramMap,
    this.store.select(selectAllAccounts)
  ]).pipe(
    map(([params, accounts]) => {
      const id = params.get('id');
      return accounts?.find(account => account.accountId === id);
    })
  );

  ngOnInit(): void {
    this.store
      .select(selectCurrentUser)
      .pipe(take(1))
      .subscribe(user => {
        if (user) {
          this.store.dispatch(loadAccounts({ userId: user.id }));
        }
      });
  }
}
