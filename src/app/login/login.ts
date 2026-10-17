import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class login {

  email: string = '';
  password: string = '';
  message: string = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  loginUser() {

    console.log('LOGIN FUNCTION CALLED');

    if (!this.email || !this.password) {
      this.message = 'Please enter email and password';
      return;
    }

    const user = {
      email: this.email,
      password: this.password
    };

    console.log('Email:', user.email);

    this.http.post<any>(
      'http://localhost:8080/api/users/login',
      user
    ).subscribe({

      next: (response) => {

        console.log('Login Successful');
        console.log('Response:', response);

        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);

        this.message = 'Login Successful!';

        if (response.role === 'ADMIN') {

          this.router.navigate(['/admin-dashboard']);

        } else {

          this.router.navigate(['/job']);

        }

      },

      error: (error) => {

        console.log('Login Failed');
        console.log(error);

        this.message = 'Invalid email or password';

      }

    });

  }

}