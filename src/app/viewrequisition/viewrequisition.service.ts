import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class ViewrequisitionService {

  constructor(private http: Http) { }

  public getRequisitionDetails(reqId:any): Observable<any> {

    const url_get = AppComponent.urlPath + 'ShowReqDetails';
    const params = new URLSearchParams();   
    var RefId = sessionStorage.getItem("RefId");
    params.set('RequisitionId', reqId);
    params.set('Entityid', RefId);
   
    return this.http.post(url_get, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }
  
  public downloadJDLink(reqId): Observable<any> {
    
    const url_get = AppComponent.urlPath + 'DownloadJD';
    const params = new URLSearchParams();   

    //const url_get = "http://d9799659.ngrok.io/DownloadFile";

    
    let RefId = sessionStorage.getItem("RefId");

    console.log('Entityid - ' + RefId);
    console.log('reqId - ' + reqId);
    
    params.set('Entityid', RefId);
    params.set('RequisitionId', reqId);
    
    console.log(params);
    
    return this.http.post(url_get, params, { responseType: ResponseContentType.Blob }).map(data => {   
      return data;     
    });
    
  }
}
