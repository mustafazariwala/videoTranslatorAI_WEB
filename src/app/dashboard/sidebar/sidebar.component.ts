import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SidebarPillsComponent } from '../../layout/sidebar-pills/sidebar-pills.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SidebarPillsComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  constructor(
    private authService: AuthService
  ) {}

  logout() {
    this.authService.logout();
  }

}
