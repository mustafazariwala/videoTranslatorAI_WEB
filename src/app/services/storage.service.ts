import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) { }

  uploadFile(file: File, refPath: string = '' ) {
    const storageRef = ref(this.storage, refPath + file.name);
    return uploadBytesResumable(storageRef, file);
  }
}
