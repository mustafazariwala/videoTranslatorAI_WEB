import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private http: HttpClient) { }


  getTranslations(query:any): Observable<any>{
    return new Observable((observer) => {
      let options: any = {};
      if(query) {
        let params = new HttpParams();
        for(let key in query) {
          params = params.append(key, query[key]);
        }
        options.params = params
      }
      this.http.get(environment.apiUrl + 'translations', options).subscribe((res: any) => {
        observer.next(res);
      }, (err) => {
        observer.error(err);
      });
    })
  }

  postTranslations(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.apiUrl + 'translations', data).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    })
  }

}
