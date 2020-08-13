import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class PrescreeningquestionService {

  constructor(private http: Http) { }

  public getQuestionDetails(reqId:any): Observable<any> {

    const url = AppComponent.urlPath + 'reqdashboard';
    const params = new URLSearchParams();  
    var RefId = sessionStorage.getItem("RefId");

    params.set('ReqStatus', 'OP');
    params.set('EntityId', RefId); 
    
    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return 'No Data';
      });
  }
}
