import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';


import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { authInterceptor } from './auth.interceptor';
import { provideStore } from '@ngrx/store';
import { videosReducer } from '../../store/videos.reducers';
import { provideEffects } from '@ngrx/effects';
import { VideosEffects } from '../../store/videos.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyC4d6Z6h5TOTRV5bq0V969kazonlEkLA8M",
      authDomain: "videotranslatorai-841a6.firebaseapp.com",
      databaseURL: "https://videotranslatorai-841a6-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "videotranslatorai-841a6",
      storageBucket: "videotranslatorai-841a6.appspot.com",
      messagingSenderId: "909940683370",
      appId: "1:909940683370:web:399082a2f162e840081013",
      measurementId: "G-5S5G8GWEJR"
    })),
    provideStorage(() => getStorage()),
    provideAnimations(), 
    provideHttpClient(withInterceptors([authInterceptor])), 
    provideToastr(), 
    provideStore({videos: videosReducer}),
    provideEffects([VideosEffects])
  ]
};
