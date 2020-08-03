import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class ScreeningService {

  constructor(private http: Http) { }

  public addScreeningDetails(FormObj,applicationId,reqId,candId): Observable<any> {

    const url = AppComponent.urlPath + 'UpdateScreeningForm';
    const params = new URLSearchParams();   
    var RefId = sessionStorage.getItem("RefId");
    var C_ID = sessionStorage.getItem("uniqueSessionId");   

    params.set('EntityId', RefId);
    params.set('RequisitionId', reqId);
    params.set('CandidateId', candId);
    params.set('ApplicationId', applicationId);
    params.set('RecruitersComments', FormObj.RecruitersComments);
    params.set('Experience', FormObj.Experience);
    params.set('LeavingReason', FormObj.LeavingReason);
    params.set('NoticePeriod', FormObj.NoticePeriod);
    params.set('BuyoutPoassibility', FormObj.BuyoutPoassibility);
    params.set('PrSalCurrency', FormObj.PrSalCurrency);
    params.set('PrSalFixed', FormObj.PrSalFixed);
    params.set('PrSalVariable', FormObj.PrSalVariable);
    params.set('PrSalTotal', FormObj.PrSalTotal);
    params.set('ExpSalCurrency', FormObj.ExpSalCurrency);
    params.set('ExpSalary', FormObj.ExpSalary);
    params.set('ExpHike', FormObj.ExpHike);
    params.set('PresentLocation', FormObj.PresentLocation);
    params.set('PrefLocation', FormObj.PrefLocation);
    params.set('SalaryComment', FormObj.SalaryComment);
    params.set('CommunicationSkils', FormObj.CommunicationSkils);
    params.set('OtherRemarks', FormObj.OtherRemarks);
    params.set('ConfidentioalRemarks', FormObj.ConfidentioalRemarks);
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

  public viewScreeningDetails(applicationId,candId,reqId): Observable<any> {

    const url = AppComponent.urlPath + 'viewscreeningform';
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
