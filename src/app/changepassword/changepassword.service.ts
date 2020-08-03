import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class ChangepasswordService {

  constructor(private http: Http) { }

  public changePassword(FormObj): Observable<any> {

    const url = AppComponent.urlPath + 'changepassword';   
    
    const params = new URLSearchParams();   

    var C_ID = sessionStorage.getItem("uniqueSessionId");
    
    params.set('UserId', 'VS0007AD');    
    params.set('OldPassword', FormObj.OldPassword);
    params.set('NewPassword', FormObj.NewPassword);
     
    console.log(params)
    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }
}
