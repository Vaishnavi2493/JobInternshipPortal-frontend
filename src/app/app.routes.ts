import { Routes } from '@angular/router';

import { login } from './login/login';
import { Job } from './job/job';
import { Applications } from './applications/applications';
import { AdminApplications } from './admin-applications/admin-applications';
import { AdminJobs } from './admin-jobs/admin-jobs';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { Registration } from './registration/registration';
import { authGuard } from './auth-guard';
import { roleGuard } from './role-guard';

export const routes: Routes = [

  // Default route: Open Login page
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // Login and Registration
  {
    path: 'login',
    component: login
  },

  {
    path: 'register',
    component: Registration
  },

  // Admin Dashboard
  {
    path: 'admin-dashboard',
    component: AdminDashboard,
    canActivate: [authGuard, roleGuard]
  },

  // Job Seeker
  {
    path: 'job',
    component: Job,
    canActivate: [authGuard]
  },

  {
    path: 'applications',
    component: Applications,
    canActivate: [authGuard]
  },

  // Admin
  {
    path: 'admin-applications',
    component: AdminApplications,
    canActivate: [authGuard, roleGuard]
  },

  {
    path: 'admin-jobs',
    component: AdminJobs,
    canActivate: [authGuard, roleGuard]
  },

  // Unknown routes redirect to Login
  {
    path: '**',
    redirectTo: 'login'
  }

];