# Job Internship Portal — Frontend

An Angular-based frontend for a full-stack Job Internship Portal. The application allows job seekers to explore job opportunities, apply for jobs, and track their applications, while administrators can manage jobs and applications.

## Features

- User registration and login
- JWT-based authentication integration
- Role-based access for Admin and Job Seeker
- Job listing and search
- Job application workflow
- My Applications page
- Application status tracking
- Admin Dashboard
- Add, edit, and delete job opportunities
- Responsive user interface

## Tech Stack

- Angular
- TypeScript
- HTML
- CSS
- Angular Router
- Angular Forms
- HttpClient
- REST API integration

## Project Structure

```text
src/
└── app/
    ├── admin-applications/
    ├── admin-dashboard/
    ├── admin-jobs/
    ├── applications/
    ├── job/
    ├── login/
    └── registration/
```

## Backend

This frontend communicates with the Spring Boot backend through REST APIs.

**Backend Repository:**  
https://github.com/Vaishnavi2493/JobInternshipPortal-backend

The backend is configured locally at `http://localhost:8080`.

## Run Locally

### Prerequisites

- Node.js and npm
- Angular CLI
- MySQL database
- Job Internship Portal backend

### Installation

1. Clone this repository.
2. Open a terminal in the project folder.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the Angular development server:

   ```bash
   ng serve
   ```

5. Open `http://localhost:4200` in your browser.

Ensure the Spring Boot backend and MySQL database are configured and running for API-dependent features.

## Backend Repository

[Job Internship Portal — Backend](https://github.com/Vaishnavi2493/JobInternshipPortal-backend)

## Future Enhancements

- Resume upload
- Advanced job filtering
- Email notifications
- AI-powered career assistance

---

**Project:** Job Internship Portal  
**Purpose:** Full-Stack Web Development