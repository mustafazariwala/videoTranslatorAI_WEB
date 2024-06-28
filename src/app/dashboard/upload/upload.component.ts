import { Component } from '@angular/core';
import { VideosService } from '../../services/videos.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../services/storage.service';
import { getDownloadURL } from "firebase/storage";
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {
  uploadedFiles: any = null;
  uploadForm = new FormGroup({
    file: new FormControl('', Validators.required),
    fileName: new FormControl('', Validators.required)
  })
  uploadProgress: any = '0';
  
  
  constructor(
    private videosService: VideosService,
    private toastr: ToastrService,
    private storageService: StorageService,
    private authService: AuthService
  ) { 
  }
  
  async fileChange(elem: any) {
    this.uploadedFiles = elem.target.files; 
    const thumbnail =  await this.generateVideoThumbnail(elem.target.files[0]);
    console.log(thumbnail)
  }

  async upload() {
    if(!this.uploadedFiles) return;
    let video: File = this.uploadedFiles[0];
    let ref = 'users/' + this.authService.getUser()['user_id'] + '/' + (Math.floor(Math.random() * 19999) + 10000) + '-'
    let uploadedVideo = this.storageService.uploadFile(video, ref);
    let thumbnail: any =  await this.generateVideoThumbnail(video);
    let uploadedThumb = this.storageService.uploadFile(thumbnail, ref);
    let uploadedVideoData = await uploadedVideo;
    let uploadedThumbData = await uploadedThumb;
    if(uploadedVideoData.state === 'success' && uploadedThumbData.state === 'success') {
      this.toastr.success('Video uploaded successfully');
      let videoDownloadURL = await getDownloadURL(uploadedVideoData.ref)
      let thumbDownloadURL = await getDownloadURL(uploadedThumbData.ref)
      this.videosService.postVideo({
        fileName: this.uploadForm.get('fileName')?.value ||  video.name,
        path: videoDownloadURL,
        thumbpath: thumbDownloadURL
      })
      this.uploadForm.reset();
    } else {
      this.toastr.error('Video upload failed');
    }
  }

  async generateVideoThumbnail(file: File) {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const video = document.createElement("video");
  
      // this is important
      video.autoplay = true;
      video.muted = true;
      video.src = URL.createObjectURL(file);
  
      video.onloadeddata = () => {
        let ctx:any = canvas.getContext("2d");
  
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
  
        ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        video.pause();
        canvas.toBlob((blob)=> {
          return resolve(blob);
        })
      };
    });
  };
}

