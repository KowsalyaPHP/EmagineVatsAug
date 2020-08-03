import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class SubstageService {

  constructor(private http: Http) { }

  public addAssementDetails(FormObj,applicationId,reqId,candId,radioSelected,currentStage): Observable<any> {

    const url = AppComponent.urlPath + 'AssesmentAdd';
    const params = new URLSearchParams();   
    var RefId = sessionStorage.getItem("RefId");
    var C_ID = sessionStorage.getItem("uniqueSessionId");   

    params.set('EntityId', RefId);
    params.set('RequisitionId', reqId);
    params.set('CandidateId', candId);
    params.set('ApplicationId', applicationId);
    params.set('CurrentStage', currentStage);
    params.set('ToStage', radioSelected);
    params.set('Remarks', FormObj.Remarks);
    params.set('C_ID', C_ID);

    console.log(params)

    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  public viewAssessmentDetails(applicationId,candId,reqId): Observable<any> {

    const url = AppComponent.urlPath + 'Assesmentview';
    const params = new URLSearchParams();   

    var RefId = sessionStorage.getItem("RefId");  

    params.set('EntityId', RefId);
    params.set('RequisitionId', reqId);
    params.set('CandidateId', candId);
    params.set('ApplicationId', applicationId);
  
    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }
}
