import { HttpClient } from '@angular/common/http';
import { EventEmitter, Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { clearVideos } from '../../../store/videos.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private store: Store
  ) { }

  onLogin(data: any) {
    console.log(environment.apiUrl)
    return new Promise((resolve, reject) => {
      this.http.post(environment.apiUrl + 'users/login', data).subscribe((res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
    this.store.dispatch(clearVideos())
    this.toastr.warning('User has been logged out successfully!');
    
  }

  getAuthToken() {
    return localStorage.getItem('token') || null;
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
}
