import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  constructor(private http: HttpClient) { }


  getVideos(): Observable<any>{
    return new Observable((observer) => {
      this.http.get(environment.apiUrl + 'videos').subscribe((res: any) => {
        observer.next(res);
      }, (err) => {
        observer.error(err);
      });
    })
  }

  postVideo(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.apiUrl + 'videos', data).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    })
  }

}
