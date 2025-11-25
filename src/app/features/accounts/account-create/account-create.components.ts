import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { createAccount } from '../../../state/accounts/account.actions';
import { selectCurrentUser } from '../../../state/auth/auth.selectors';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-account-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './account-create.html'
})
export class AccountCreateComponent {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);

  createForm = this.fb.group({
    currency: ['USD', Validators.required],
    initialBalance: [0, [Validators.required, Validators.min(0)]]
  });

  submitted = false;

  onSubmit() {
    if (this.createForm.valid) {
      this.submitted = true;
      
      console.log('Form submitted, selecting current user...');
      
      this.store
        .select(selectCurrentUser)
        .pipe(take(1))
        .subscribe(user => {
          console.log('Current user from store:', user);
          if (user) {
            const accountData = {
              userId: user.id,
              ...this.createForm.value
            };
            console.log('Dispatching createAccount with:', accountData);
            this.store.dispatch(createAccount({ accountData }));
          } else {
            console.error('No user found in store!');
            this.submitted = false;
          }
        });
    }
  }
}
