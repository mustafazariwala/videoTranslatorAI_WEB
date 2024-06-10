import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';
import { catchError, tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // let token = localStorage.getItem('token') || '';
  const authService = inject(AuthService);
  const authToken = authService.getAuthToken();
  if(!authToken) return next(req);
  const authReq = req.clone({
    setHeaders: {
      Authorization: `${authToken}`
    }
  });

  

  // Pass the cloned request with the updated header to the next handler
  return next(authReq).pipe(catchError((err) => {
    if(err.status === 401) {
      authService.logout();
    }
    throw err;
  }));
};
