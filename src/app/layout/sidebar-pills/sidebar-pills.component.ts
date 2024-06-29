import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-pills',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './sidebar-pills.component.html',
  styleUrl: './sidebar-pills.component.scss'
})
export class SidebarPillsComponent {
  route:string = '';
  constructor(
    private router: Router
  ) {
    router.events.subscribe((url:any) => {
      if(url && url.url) {
        this.route = url.url.split('/')[1];
      }
    });
  }


}
