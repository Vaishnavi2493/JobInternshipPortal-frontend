import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-applications',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-applications.html',
  styleUrl: './admin-applications.css',
})
export class AdminApplications {

  applications: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getApplications();
  }

  getApplications() {
    this.http.get<any[]>(
      'https://jobinternshipportal-backend.onrender.com/applications'
    ).subscribe({

      next: (data) => {
        console.log('All Applications:', data);
        this.applications = data;
      },

      error: (error) => {
        console.log('Error:', error);
      }

    });
  }

  updateStatus(id: number, status: string) {

    this.http.put(
      `https://jobinternshipportal-backend.onrender.com/applications/${id}/status?status=${status}`,
      {}
    ).subscribe({

      next: (data) => {
        console.log('Status Updated:', data);
        alert('Status Updated Successfully!');

        // Refresh applications after status update
        this.getApplications();
      },

      error: (error) => {
        console.log('Error:', error);
        alert('Failed to Update Status');
      }

    });
  }
}