import { Component, OnInit } from '@angular/core';

import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AppState } from '../../../../store/app.state';
import { Store } from '@ngrx/store';
import { loadVideos } from '../../../../store/videos.actions';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TranslationService } from '../../services/translation.service';

export interface IMedia {
  title: string;
  src: string;
  type: string;
}

@Component({
  selector: 'app-video-page',
  standalone: true,
  imports: [
    CommonModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  templateUrl: './video-page.component.html',
  styleUrl: './video-page.component.scss'
})
export class VideoPageComponent implements OnInit{

  playlist: Array<IMedia> = [];
  translations: any = [];

  media: IMedia = this.playlist[0];

  currentIndex = 0;
  currentItem: any = null
  api: any;
  audioApi: any
  subscriptions: Subscription[] = [];
  currentTime: number = 0;
  videoId:any = null;
  selectedTranslation: any = null;
  generatingTranslation = false;

  audioSources : any;

  languageData = [
    { language:"Bengali", translationAvailable: false },
    { language:"Catalan", translationAvailable: false },
    { language:"Czech", translationAvailable: false },
    { language:"Danish", translationAvailable: false },
    { language:"Dutch", translationAvailable: false },
    { language:"English", translationAvailable: false },
    { language:"Estonian", translationAvailable: false },
    { language:"Finnish", translationAvailable: false },
    { language:"French", translationAvailable: false },
    { language:"German", translationAvailable: false },
    { language:"Hindi", translationAvailable: false },
    { language:"Indonesian", translationAvailable: false },
    { language:"Italian", translationAvailable: false },
    { language:"Japanese", translationAvailable: false },
    { language:"Korean", translationAvailable: false },
    { language:"Maltese", translationAvailable: false },
    { language:"Mandarin Chinese", translationAvailable: false },
    { language:"Modern Standard Arabic", translationAvailable: false },
    { language:"Northern Uzbek", translationAvailable: false },
    { language:"Polish", translationAvailable: false },
    { language:"Portuguese", translationAvailable: false },
    { language:"Romanian", translationAvailable: false },
    { language:"Russian", translationAvailable: false },
    { language:"Slovak", translationAvailable: false },
    { language:"Spanish", translationAvailable: false },
    { language:"Swahili", translationAvailable: false },
    { language:"Swedish", translationAvailable: false },
    { language:"Tagalog", translationAvailable: false },
    { language:"Telugu", translationAvailable: false },
    { language:"Thai", translationAvailable: false },
    { language:"Turkish", translationAvailable: false },
    { language:"Ukrainian", translationAvailable: false },
    { language:"Urdu", translationAvailable: false },
    { language:"Vietnamese", translationAvailable: false },
    { language:"Welsh", translationAvailable: false },
    { language:"Western Persian", translationAvailable: false }
  ]

  constructor(
    private store: Store<AppState>,
    private route:ActivatedRoute,
    private translationService: TranslationService
  ) {}

  ngOnInit() {
    this.videoId = this.route.snapshot.paramMap.get('id');
    this.store.select('videos').subscribe(({videos}) => {
      if(videos && videos.length > 0) {
        let selectedVideo = videos.find((v:any) =>  v.video_id == this.videoId);
        if(selectedVideo) this.currentItem = {
          src: selectedVideo.filepath,
          title: 'filename',
          type: 'video/mp4'
        };
      }
    });
    this.getAllTranslations();
    this.store.dispatch(loadVideos())
  }

  onPlayerReady(api: any) {
    this.api = api;
    this.api
      .getDefaultMedia()
      .subscriptions.loadedMetadata.subscribe(this.playVideo.bind(this));
    this.api.getDefaultMedia().subscriptions.play.subscribe(()=> {
      if(this.audioApi) {
        this.audioApi.pause();
      }
    });
    this.api.getDefaultMedia().subscriptions.timeUpdate.subscribe((v:any) => {
      this.currentTime = this.api.currentTime;
      console.log(this.currentTime);
    });
  }

  onPlayerAudioReady(api: any) {
    this.audioApi = api;
    this.audioApi.getDefaultMedia().subscriptions.play.subscribe(()=> {
      if(this.api) {
        this.api.pause();
      }
    });
    this.audioApi.getDefaultMedia().subscriptions.ended.subscribe(
      () => {
          this.api.getDefaultMedia().currentTime = 0;
      }
    );   

  }


  nextVideo() {
    this.currentIndex++;
    if (this.currentIndex === this.playlist.length) {
      this.currentIndex = 0;
    }
    this.currentItem = this.playlist[this.currentIndex];
  }

  playVideo() {
    this.api.play();
  }

  playAudio() {
    this.api.play();
  }

  getAllTranslations() {
    this.translationService.getTranslations({
      "video_id": this.videoId
    }).subscribe((res:any) => {
      this.translations = res;
      this.mapLanguageData()
    })
  }

  onChangeLanguage(event: any) {
    let language = event.target.value;
    this.selectedTranslation = this.languageData.find((t:any) => t.language == language);
    this.setCurrentAudio(this.selectedTranslation.audiooutput)
  }

  async generateTranslation() {
    if(!this.selectedTranslation) return;
    this.generatingTranslation = true;
    this.translations = await this.translationService.postTranslations({
      video_id: this.videoId,
      language: this.selectedTranslation.language
    })
    this.generatingTranslation = false;
    this.mapLanguageData()
    this.selectedTranslation = this.languageData.find((t:any) => t.language == this.selectedTranslation.language);
  }

  mapLanguageData() {
    this.languageData = this.languageData.map((l:any) => {
      let translation = this.translations.find((t:any) => t.language == l.language);
      if(translation) return {...l, translationAvailable: true, ...translation}
      else return l;
    })
  }

  setCurrentAudio(source: string){
    this.audioSources = []
    this.audioSources.push({
      src: source,
      type: "audio/mp3"
    });
  }

}

