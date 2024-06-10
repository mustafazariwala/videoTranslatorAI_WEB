import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

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
    provideAnimations(), 
    provideHttpClient(withInterceptors([authInterceptor])), 
    provideToastr(), 
    provideStore({videos: videosReducer}),
    provideEffects([VideosEffects])
  ]
};
