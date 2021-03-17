import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class UserdashboardService {

  constructor(private http: Http) { }

  public viewUserDetails(): Observable<any> {

    const url = AppComponent.urlPath + 'UserDashboard';
    const params = new URLSearchParams(); 

    var UserCategory = sessionStorage.getItem("USERCATEGORY");
    var RefId = sessionStorage.getItem("RefId");
    var C_ID = sessionStorage.getItem("uniqueSessionId");

    params.set('UserCategory', UserCategory);
    params.set('EntityId',RefId);
    params.set('UserId',C_ID);
        
    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }
  
}
