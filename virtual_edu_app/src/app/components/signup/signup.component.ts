import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  fullName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  gender: string = '';
  phoneNumber: string = '';

  isLoading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  get passwordMismatch(): boolean {
    return (
      this.confirmPassword.length > 0 && this.password !== this.confirmPassword
    );
  }

  onSignup(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.toastr.error('Passwords do not match.');
      return;
    }

    this.isLoading = true;

    const user = {
      fullName: form.value.fullName,
      email: form.value.email,
      password: form.value.password,
      gender: form.value.gender || null,
      phoneNumber: form.value.phoneNumber || null,
    };

    // Send POST request to the backend API for signup
    this.authService.signup(user).subscribe({
      next: (response) => {
        console.log('User signed up successfully:', response);
        this.isLoading = false;
        this.toastr.success('Signup successful!');
        form.reset(); // reset form after success

        setTimeout(() => {
          this.goToLogin();
        }, 1000);
      },
      error: (error) => {
        console.error('Error signing up:', error);
        this.isLoading = false;
        this.toastr.error('Signup failed. Please try again.');
      },
      complete: () => {
        console.log('Signup request completed');
      },
    });
  }
}
