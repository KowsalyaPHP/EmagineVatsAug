import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class ReqDashboardService {

  constructor(private http: Http) { }
  
  public getReqList(status): Observable<any> {

    const url = AppComponent.urlPath + 'reqdashboard';
    const params = new URLSearchParams();  
    
    var RefId = sessionStorage.getItem("RefId");
    var clientId = sessionStorage.getItem("ClientList");
    
    params.set('ReqStatus', status);
    params.set('EntityId', RefId); 
    params.set('clientid', clientId); 
    
    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return 'No Data';
      });
  }
  public getDrillDownValue(reqId): Observable<any> {

    const url = AppComponent.urlPath + 'DrillDownData';
    const params = new URLSearchParams();  
    
    var RefId = sessionStorage.getItem("RefId");
        
    params.set('RequisitionId', reqId);
    params.set('EntityId', RefId);
    
    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return 'No Data';
      });
  }
  public getAssessmentcount(reqId): Observable<any> {

    const url = AppComponent.urlPath + 'Assesmentcount';
    const params = new URLSearchParams();  
    var RefId = sessionStorage.getItem("RefId");

    params.set('EntityId', RefId);
    params.set('RequisitionId', reqId);
     
    
    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return 'No Data';
      });
  }

  public updatepriority(priority,reqId): Observable<any> {

    const url = AppComponent.urlPath + 'ReqPriorityEdit';
    const params = new URLSearchParams();  
 
    params.set('RequisitionId', reqId);
    params.set('ReqPriority', priority);

    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        
        if (data != '')
          return data;
        else
          return 'No Data';
      });
  }

  public downloadJDLink(reqId): Observable<any> {
    
    const url_get = AppComponent.urlPath + 'DownloadJDPDF';
    const params = new URLSearchParams();   

    let RefId = sessionStorage.getItem("RefId");

    params.set('Entityid', RefId);
    params.set('RequisitionId', reqId);
    
    console.log(params);
    
    return this.http.post(url_get, params, { responseType: ResponseContentType.Blob }).map(data => {   
      return data;     
    });
    
  }
}
