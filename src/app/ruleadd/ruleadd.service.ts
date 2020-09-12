import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class RuleaddService {

  constructor(private http: Http) { }

  public addRules(FormObj): Observable<any> {

    const url = AppComponent.urlPath + 'RuleAdd';
    //const url = 'http://d5bc9cd68336.ngrok.io/RoleAdd';

    const params = new URLSearchParams();   
    var C_ID = sessionStorage.getItem("uniqueSessionId");
    var RefId = sessionStorage.getItem("RefId");

    params.set('EntityID', RefId);  
    params.set('DataAccessRuleName', FormObj.DataAccessRuleName);    
    params.set('C_ID', C_ID);
    
    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  public viewUserDetails(): Observable<any> {

    const url = AppComponent.urlPath + 'UserDashboard';
    const params = new URLSearchParams(); 

    var UserCategory = sessionStorage.getItem("USERCATEGORY");
    var RefId = sessionStorage.getItem("RefId");
    
    params.set('UserCategory', UserCategory);
    params.set('EntityId',RefId);
        
    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }
}
