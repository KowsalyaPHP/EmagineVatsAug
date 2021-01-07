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

  public getPrimaryInfo(reqId,candidateId,applicationId): Observable<any> {

    const url_get = AppComponent.urlPath + 'PrimaryInfo';
    const params = new URLSearchParams();   

    var RefId = sessionStorage.getItem("RefId");

    params.set('RequisitionId', reqId);
    params.set('Entityid', RefId);
    params.set('CandidateId', candidateId);
    params.set('ApplicationId', applicationId);

    return this.http.post(url_get, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  public downloadCVLink(reqId,candidateId,applicationId): Observable<any> {
    
    const url_get = AppComponent.urlPath + 'DownloadFile';
    const params = new URLSearchParams(); 

    let RefId = sessionStorage.getItem("RefId");

    params.set('Entityid', RefId);
    params.set('RequisitionId', reqId);
    params.set('CandidateId', candidateId);
    params.set('ApplicationId', applicationId);
    
    return this.http.post(url_get, params, { responseType: ResponseContentType.Blob }).map(data => {
      return data;
    });
  }
}
