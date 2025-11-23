import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthApiService } from './core/services/auth-api.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.html',
})
export class AppComponent {
  private authService = inject(AuthApiService);
  
  isLoading = signal(false);
  connectionStatus = signal<'IDLE' | 'SUCCESS' | 'ERROR'>('IDLE');
  apiResponse = signal<any>(null);
  currentYear = new Date().getFullYear();

  testGatewayConnection() {
    console.log('🎯 Button clicked - testGatewayConnection called');
    
    this.isLoading.set(true);
    this.connectionStatus.set('IDLE');
    this.apiResponse.set(null);

    console.log('🚀 Initiating Gateway Handshake...');
    console.log('📊 Current state:', { isLoading: this.isLoading(), connectionStatus: this.connectionStatus() });

    const testCredentials = { 
      username: 'john_doe', 
      email : 'john_doe@example.com',
      password: 'securePassword123',
      role : 'ADMIN'
    };

    console.log('👤 Test credentials prepared:', testCredentials);
    console.log('🔌 Calling authService.register...');

    this.authService.register(testCredentials).subscribe({
      next: (response) => {
        console.log('✅ Gateway Responded:', response);
        this.connectionStatus.set('SUCCESS');
        this.apiResponse.set(response);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('❌ Gateway Error:', error);
        this.connectionStatus.set('ERROR');
        // We display the full error to help debug CORS or Gateway issues
        this.apiResponse.set({
          status: error.status,
          message: error.message,
          error: error.error
        });
        this.isLoading.set(false);
      },
      complete: () => {
        console.log('🏁 Observable completed');
        this.isLoading.set(false);
      }
    });
    
    console.log('✔️ Subscribe called - waiting for response...');
  }
}