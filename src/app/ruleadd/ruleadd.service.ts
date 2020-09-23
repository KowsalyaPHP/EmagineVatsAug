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

  public addRules(FormObj,clientCode): Observable<any> {

    const url = AppComponent.urlPath + 'RuleAdd';
  //  const url = 'http://c3a62d0aedfa.ngrok.io/RuleAdd';

    const params = new URLSearchParams();   
    var C_ID = sessionStorage.getItem("uniqueSessionId");
    var RefId = sessionStorage.getItem("RefId");

    params.set('EntityID', RefId);  
    params.set('DataAccessRuleName', FormObj.DataAccessRuleName);    
    params.set('ClientId', clientCode);    
    params.set('C_ID', C_ID);
    console.log(params);

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
