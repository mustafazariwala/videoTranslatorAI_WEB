import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [
    CommonModule,
    LazyLoadImageModule
  ],
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss'
})
export class VideoComponent {
  @Input() video: any;

  constructor(
    private router: Router
  ) {}
  
  editVideo() {
    // edit video
  }

  deleteVideo() {
    // delete
  }

  clickVideoCard() {
    this.router.navigate(['/videos', this.video.video_id]);
  }
}
