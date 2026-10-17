import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from './auth';

export const roleGuard: CanActivateFn = (route, state) => {

  const auth = inject(Auth);
  const role = auth.getRole();

  const router = inject(Router);

  if (role === 'ADMIN') {
    return true;
  }

  router.navigate(['/job']);

  return false;
};