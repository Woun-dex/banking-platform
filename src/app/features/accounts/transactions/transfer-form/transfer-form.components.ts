import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Store } from '@ngrx/store';
import { TransactionApiService } from '../../../../core/services/transaction-api.service'; 
import { selectAllAccounts } from '../../../../state/accounts/account.selectors';
@Component({
  selector: 'app-transfer-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, 
    MatInputModule, MatSelectModule, MatButtonModule, MatProgressBarModule
  ],
  templateUrl: './transfer-form.html'
})
export class TransferFormComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private txService = inject(TransactionApiService);

  accounts$ = this.store.select(selectAllAccounts);
  
  transferForm = this.fb.group({
    fromAccountId: ['', Validators.required],
    toAccountId: ['', Validators.required],
    amount: [0, [Validators.required, Validators.min(1)]]
  });

  submitted = false;
  status = 'IDLE'; // IDLE | PENDING | COMPLETED | FAILED
  txId = '';

  onSubmit() {
    if (this.transferForm.valid) {
      this.submitted = true;
      this.status = 'PENDING';
      
      this.txService.initiateTransfer(this.transferForm.value as any).subscribe({
        next: (res) => {
          this.txId = res.transactionId;
          // In a real Event-Driven system, the immediate response is PENDING.
          // We can use polling here to check if it becomes COMPLETED.
          this.pollStatus(res.transactionId);
        },
        error: () => {
          this.status = 'FAILED';
          this.submitted = false;
        }
      });
    }
  }

  // Simple polling logic to update UI when Kafka finishes processing
  pollStatus(id: string) {
    const interval = setInterval(() => {
      this.txService.getTransactionStatus(id).subscribe(tx => {
        if (tx.status === 'COMPLETED' || tx.status === 'FAILED') {
          this.status = tx.status;
          clearInterval(interval);
        }
      });
    }, 2000); // Check every 2 seconds
  }

  reset() {
    this.submitted = false;
    this.status = 'IDLE';
    this.transferForm.reset();
  }
}