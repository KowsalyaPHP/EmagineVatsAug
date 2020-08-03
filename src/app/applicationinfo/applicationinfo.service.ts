import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class ApplicationinfoService {

  constructor(private http: Http) { }

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

  public getcvlogInfo(reqId,candidateId,applicationId): Observable<any> {

    const url_get = AppComponent.urlPath + 'CVStageLog';
    const params = new URLSearchParams();   

    var RefId = sessionStorage.getItem("RefId");

    params.set('RequisitionId', reqId);
    params.set('Entityid', RefId);
    params.set('CandidateId', candidateId);
    params.set('ApplicationId', applicationId);
    console.log(params)
    return this.http.post(url_get, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }
}
