import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component'

@Injectable({
  providedIn: 'root'
})
export class RuleService {

  constructor(private http: Http) { }

  public getRuleList(): Observable<any> {
   
    const url = AppComponent.urlPath + 'RuleList';
   // const url ='http://461e06b1db5d.ngrok.io/RuleList';
    const params = new URLSearchParams(); 
    var RefId = sessionStorage.getItem("RefId");
    params.set('EntityId', RefId);
          
    return this.http.post(url, params)
        .map(response => response.json()).map(data => {
          if (data != '')
            return data;
          else
            return '';
        });
  }

  public viewSingleRuleList(ruleId): Observable<any> {

    const url = AppComponent.urlPath + 'RuleListById';
    const params = new URLSearchParams(); 
    
    params.set('DataAccessRuleId', ruleId);
        
    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  public viewClientList(): Observable<any> {

    const url = AppComponent.urlPath + 'clientlist';
    const params = new URLSearchParams(); 

    var RefId = sessionStorage.getItem("RefId");
    console.log(RefId)
    params.set('RefId', RefId);
        
    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }
}
