import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: Http) { }

  public getSearchDetails(FormObj,checkData): Observable<any> {

    const url = AppComponent.urlPath + 'ShowAllCandidates';
 
    const params = new URLSearchParams();   
    var C_ID = sessionStorage.getItem("uniqueSessionId");

    params.set('SearchOption', checkData);    
    params.set('SearchData', FormObj['SearchData']);
    
    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }
}
