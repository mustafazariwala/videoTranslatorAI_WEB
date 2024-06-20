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
  
  fileChange(elem: any) {
    this.uploadedFiles = elem.target.files; 
  }

  async upload() {
    if(!this.uploadedFiles) return;
    let file: File = this.uploadedFiles[0];
    let ref = 'users/' + this.authService.getUser()['user_id'] + '/' + (Math.floor(Math.random() * 19999) + 10000) + '-'
    let uploadedTask = this.storageService.uploadFile(file, ref);
    let uploadedTaskData = await uploadedTask;
    if(uploadedTaskData.state === 'success') {
      this.toastr.success('Video uploaded successfully');
      let downloadURL = await getDownloadURL(uploadedTaskData.ref)
      this.videosService.postVideo({
        fileName: this.uploadForm.get('fileName')?.value ||  file.name,
        path: downloadURL
      })
      this.uploadForm.reset();
    } else {
      this.toastr.error('Video upload failed');
    }
  }
}
