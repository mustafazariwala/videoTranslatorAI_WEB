import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  if (!localStorage.getItem('token')) {
    inject(Router).navigate(['/login']);
    return false;
  }
  return true;
};
