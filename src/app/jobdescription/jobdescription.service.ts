import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class JobdescriptionService {

  constructor(private http: Http) { }

  public getRequisitionDetails(reqId:any): Observable<any> {

    const url_get = AppComponent.urlPath + 'ShowReqDetails';
    const params = new URLSearchParams();   
    var RefId = sessionStorage.getItem("RefId");
    params.set('RequisitionId', reqId);
    params.set('Entityid', 'Emagine');
   
    return this.http.post(url_get, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }
}
