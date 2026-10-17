import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-jobs',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-jobs.html',
  styleUrl: './admin-jobs.css',
})
export class AdminJobs {

  jobs: any[] = [];

  // Add/Edit mode
  isEditing = false;

  // Job being edited
  editingJob: any = {
    id: null,
    title: '',
    company: '',
    location: '',
    description: '',
    salary: 0
  };

  // New job
  newJob = {
    title: '',
    company: '',
    location: '',
    description: '',
    salary: 0
  };

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getJobs();
  }


  // ================= GET ALL JOBS =================

  getJobs() {

    this.http.get<any[]>(
      'http://localhost:8080/jobs'
    ).subscribe({

      next: (data) => {

        console.log('All Jobs:', data);

        this.jobs = data;

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.log('Error loading jobs:', error);

      }

    });
  }


  // ================= ADD JOB =================

  addJob() {

    this.http.post(
      'http://localhost:8080/jobs',
      this.newJob
    ).subscribe({

      next: (data) => {

        console.log('Job Added:', data);

        alert('Job Added Successfully!');

        this.newJob = {
          title: '',
          company: '',
          location: '',
          description: '',
          salary: 0
        };

        this.getJobs();

      },

      error: (error) => {

        console.log('Add Job Error:', error);

        alert('Failed to Add Job');

      }

    });
  }


  // ================= EDIT JOB =================

  editJob(job: any) {

    console.log('EDIT BUTTON CLICKED');

    console.log('Selected Job:', job);

    this.editingJob = {
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      description: job.description,
      salary: job.salary
    };

    this.isEditing = true;

    console.log('Editing Job Set:', this.editingJob);

    this.cdr.detectChanges();
  }


  // ================= SAVE EDITED JOB =================

  saveEditedJob() {

    if (!this.editingJob.id) {

      alert('No job selected for editing');

      return;
    }

    console.log('SAVE EDITED JOB CLICKED');

    console.log('Editing Job:', this.editingJob);

    this.http.put(
      `http://localhost:8080/jobs/${this.editingJob.id}`,
      this.editingJob
    ).subscribe({

      next: (data) => {

        console.log('JOB UPDATED SUCCESSFULLY:', data);

        alert('Job Updated Successfully!');

        this.isEditing = false;

        this.editingJob = {
          id: null,
          title: '',
          company: '',
          location: '',
          description: '',
          salary: 0
        };

        this.getJobs();

      },

      error: (error) => {

        console.log('JOB UPDATE FAILED');

        console.log('Status:', error.status);

        console.log('Error:', error);

        alert('Failed to Update Job');

      }

    });
  }


  // ================= DELETE JOB =================

  deleteJob(id: number) {

    if (confirm('Are you sure you want to delete this job?')) {

      this.http.delete(
        `http://localhost:8080/jobs/${id}`,
        {
          responseType: 'text'
        }
      ).subscribe({

        next: (data) => {

          console.log('Job Deleted:', data);

          alert(data);

          this.getJobs();

        },

        error: (error) => {

          console.log('Delete Error:', error);

          if (error.error) {

            alert(error.error);

          } else {

            alert('Failed to Delete Job');

          }

        }

      });

    }
  }


  // ================= CANCEL EDIT =================

  cancelEdit() {

    this.isEditing = false;

    this.editingJob = {
      id: null,
      title: '',
      company: '',
      location: '',
      description: '',
      salary: 0
    };

    this.cdr.detectChanges();
  }

}