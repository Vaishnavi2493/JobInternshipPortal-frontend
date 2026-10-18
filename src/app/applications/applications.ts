import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-applications',
  imports: [CommonModule],
  templateUrl: './applications.html',
  styleUrl: './applications.css'
})
export class Applications {

  applications: any[] = [];

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getApplications();
  }

  getApplications() {

    this.http.get<any[]>(
      'https://jobinternshipportal-backend.onrender.com/applications/user'
    ).subscribe({

      next: (data) => {

        console.log('My Applications:', data);
        console.log('Application Count:', data.length);

        this.applications = data;

        console.log('After Assign:', this.applications.length);

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.log('Error:', error);
      }

    });
  }
}