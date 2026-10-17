import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registration',
  imports: [FormsModule, RouterLink],
  templateUrl: './registration.html',
  styleUrl: './registration.css'
})
export class Registration {

  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  message: string = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  registerUser() {

    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.message = 'Please fill all fields';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.message = 'Passwords do not match';
      return;
    }

    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: 'JOB_SEEKER'
    };

    this.http.post(
      'http://localhost:8080/api/users/register',
      user
    ).subscribe({

      next: (response) => {

        console.log('Registration Successful:', response);

        this.message = 'Registration Successful!';

        alert('Registration Successful!');

        this.router.navigate(['/login']);

      },

      error: (error) => {

        console.log('Registration Failed:', error);

        this.message = 'Registration Failed';

        alert('Registration Failed');

      }

    });

  }

}