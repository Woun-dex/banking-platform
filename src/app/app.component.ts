import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthApiService } from './core/services/auth-api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule , RouterOutlet],
  template: `
    <div style="text-align:center; padding: 20px;">
      <h1>🏦 Banking UI Connectivity Test</h1>
      <p>Check console for API results</p>
      <button (click)="testLogin()">Test Gateway Connection</button>
    </div>
  `,
})
export class AppComponent {
  private authService = inject(AuthApiService);

  testLogin(){
    console.log("Testing login...");
    this.authService.login({ username: 'testuser', password: 'testpass' }).subscribe({
      next: ( res ) => console.log("Login successful:", res),
      error: ( err ) => console.error("Login failed:", err)
    });
  }
}
