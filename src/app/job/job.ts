import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-job',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './job.html',
  styleUrl: './job.css'
})
export class Job {

  jobs: any[] = [];
  searchTitle: string = '';

  constructor(
    private http: HttpClient,
    private auth: Auth
  ) {}

  getJobs() {

    this.http.get<any[]>('https://jobinternshipportal-backend.onrender.com/jobs')
      .subscribe({
        next: (data) => {
          this.jobs = data;
        },
        error: (error) => {
          console.log('Error:', error);
        }
      });

  }

  searchJobs() {

    this.http.get<any[]>(
      'https://jobinternshipportal-backend.onrender.com/jobs/search?title=' + this.searchTitle
    )
    .subscribe({
      next: (data) => {
        this.jobs = data;
      },
      error: (error) => {
        console.log('Error:', error);
      }
    });

  }

  applyJob(jobId: number) {

    const application = {
      jobId: jobId
    };

    this.http.post(
      'https://jobinternshipportal-backend.onrender.com/applications',
      application
    ).subscribe({

      next: (data) => {
        console.log('Application Successful:', data);
        alert('Job Applied Successfully!');
      },

      error: (error) => {
        console.log('Application Failed:', error);

        if (error.error?.message) {
          alert(error.error.message);
        } else {
          alert('Failed to Apply');
        }
      }

    });

  }

  logout() {

    this.auth.logout();

    window.location.href = '/login';

  }

}