import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploadComponent } from './dashboard/upload/upload.component';
import { VideosComponent } from './dashboard/videos/videos.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth.guard';
import { VideoPageComponent } from './dashboard/video-page/video-page.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: DashboardComponent, children: [
    {path: '', redirectTo: 'videos', pathMatch: 'full'},
    {path: 'upload', component: UploadComponent},
    {path: 'videos/:id', component: VideoPageComponent},
    {path: 'videos', component: VideosComponent}
  ], canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''}
];
