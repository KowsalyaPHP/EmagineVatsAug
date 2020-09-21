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
  
    return this.http.get(url)
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
}
