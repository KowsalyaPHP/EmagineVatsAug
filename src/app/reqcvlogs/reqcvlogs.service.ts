import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';


@Injectable({
  providedIn: 'root'
})
export class ReqcvlogsService {

  constructor(private http: Http) { }
  
  public getReqLogsDetail(reqId): Observable<any> {

    const url = AppComponent.urlPath + 'reqstatuslog';
    const params = new URLSearchParams();  
    var RefId = sessionStorage.getItem("RefId");

    params.set('EntityId', RefId); 
    params.set('Requisitionid', reqId);
    
    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return 'No Data';
      });
  }
}
