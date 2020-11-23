import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class CvtransferService {

  constructor(private http: Http) { }

  public ViewRequisitionForCopyTransfer(reqId,CandId,AppId): Observable<any> {

    const url = AppComponent.urlPath + 'CVMovement';
  //  const url = 'http://c3a62d0aedfa.ngrok.io/RuleAdd';

    const params = new URLSearchParams();   
    var C_ID = sessionStorage.getItem("uniqueSessionId");
    var RefId = sessionStorage.getItem("RefId");

    params.set('EntityID', RefId);  
    params.set('RequisitionId', reqId); 
    params.set('CandidateId', CandId); 
    params.set('ApplicationId', AppId);

    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  
  public CVTransferToAnotherReq(reqId,selectId,formObj): Observable<any> {

    const url = AppComponent.urlPath + 'CVTansfer';
   
    const formData = new FormData();
    var RefId = sessionStorage.getItem("RefId");
    var C_ID = sessionStorage.getItem("uniqueSessionId");

    formData.append('EntityId', RefId);
    formData.append('RequisitionId', reqId);
    formData.append('NewRequisitionId', formObj['NewRequisitionId']);
    formData.append('CandidateData', JSON.stringify(selectId));
    formData.append('UserId', C_ID);

    console.log(formData);
 
    /*const params = new URLSearchParams();   
    var C_ID = sessionStorage.getItem("uniqueSessionId");
    var RefId = sessionStorage.getItem("RefId");
    
    params.set('EntityID', RefId);  
    params.set('RequisitionId', reqId); 
    params.set('NewRequisitionId', formObj['NewRequisitionId']); 
    params.set('CandidateData', selectId); 
    params.set('UserId', C_ID); */

    return this.http.post(url, formData)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  
  public CVCopyToAnotherReq(reqId,selectId,formObj): Observable<any> {

    const url = AppComponent.urlPath + 'CVCopy';
   
    var C_ID = sessionStorage.getItem("uniqueSessionId");
    var RefId = sessionStorage.getItem("RefId");
    const formData = new FormData();
    
    formData.append('EntityId', RefId);
    formData.append('RequisitionId', reqId);
    formData.append('NewRequisitionId', formObj['NewRequisitionId']);
    formData.append('CandidateData', JSON.stringify(selectId));
    formData.append('UserId', C_ID)

    return this.http.post(url, formData)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }
}
