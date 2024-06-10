import { Component } from '@angular/core';
import { VideosService } from '../../services/videos.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  
  constructor(
    private videosService: VideosService,
    private toastr: ToastrService
  ) { }
  
  fileChange(elem: any) {
    this.uploadedFiles = elem.target.files; 
  }

  upload() {
    let formData = new FormData();
    if(!this.uploadedFiles) return;
    for(let i = 0; i < this.uploadedFiles.length; i++) {
      formData.append('file', this.uploadedFiles[i], this.uploadForm.value.fileName || this.uploadedFiles[i].name);
    }
    this.videosService.postVideo(formData).then((res: any) => {
      this.toastr.success('Video uploaded successfully');
      this.uploadForm.reset();
    });

  }
}
