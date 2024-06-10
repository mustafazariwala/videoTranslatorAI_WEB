import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  user: any;
  formSubmitting: boolean = false;
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthService,
    private ToastrService: ToastrService,
    private router: Router
  ) { }


  async onLogin() {
    try {
      this.formSubmitting = true;
      this.user = await this.authService.onLogin(this.loginForm.value);
      this.ToastrService.success('Login successful');
      this.router.navigate(['/']);
    } catch (error: any) {
      this.ToastrService.error(error.error.message || 'An error occurred');
    }
    this.formSubmitting = false;
  }
}
