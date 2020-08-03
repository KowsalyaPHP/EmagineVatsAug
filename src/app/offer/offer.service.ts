import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: Http) { }

  public addOfferDetails(FormObj,applicationId,reqId,candId,date): Observable<any> {

    const url = AppComponent.urlPath + 'OfferFormUpdate';
    const params = new URLSearchParams();   
    
    var RefId = sessionStorage.getItem("RefId");
    var C_ID = sessionStorage.getItem("uniqueSessionId");   
     
    params.set('EntityId', RefId);
    params.set('RequisitionId', reqId);
    params.set('CandidateId', candId);
    params.set('ApplicationId', applicationId);
    params.set('JoiningDate', date);
    params.set('SalaryOffered', FormObj.SalaryOffered);
    params.set('BillableCTC', FormObj.BillableCTC);
    params.set('AgencyFees', FormObj.AgencyFees);
    params.set('GSTYesNo', FormObj.GSTYesNo);
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

  public viewofferDetails(applicationId,candId,reqId): Observable<any> {

    const url = AppComponent.urlPath + 'OfferFormView';
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
