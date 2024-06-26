import { Component, OnInit } from '@angular/core';
import { VideosService } from '../../services/videos.service';
import { CommonModule } from '@angular/common';
import { VideoComponent } from '../video/video.component';
import { AppState } from '../../../../store/app.state';
import { Store } from '@ngrx/store';
import { loadVideos } from '../../../../store/videos.actions';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [
    CommonModule,
    VideoComponent
  ],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.scss'
})
export class VideosComponent implements OnInit{
  videos: any = [];
  ngOnInit(){
    this.getAllVideos();
    this.store.dispatch(loadVideos())
  }

  constructor(
    private videosService: VideosService,
    private store: Store<AppState>
  ) { }

  async getAllVideos() {
    this.store.select('videos').subscribe(({videos}) => {
      if(videos && videos.length > 0) {
        this.videos = videos
        console.log(videos)
      }
    })
  }

}
