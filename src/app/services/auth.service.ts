import { HttpClient } from '@angular/common/http';
import { EventEmitter, Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) { }

  onLogin(data: any) {
    console.log(environment.apiUrl)
    return new Promise((resolve, reject) => {
      this.http.post(environment.apiUrl + 'users/login', data).subscribe((res: any) => {
        localStorage.setItem('token', res.token);
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
    this.toastr.warning('User has been logged out successfully!');
    
  }

  getAuthToken() {
    return localStorage.getItem('token') || null;
  }
}
