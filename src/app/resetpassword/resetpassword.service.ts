import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class ResetpasswordService {

  constructor(private http: Http) { }

  public sendResetPassword(formObj): Observable<any> {

    const url_get = AppComponent.urlPath + 'ResetPassword';
    const params = new URLSearchParams();   
    
    params.set('UserId', formObj);
    
    return this.http.post(url_get, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }
}
