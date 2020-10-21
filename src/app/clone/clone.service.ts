import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, ResponseContentType} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class CloneService {

  constructor(private http: Http) { }

  public cloneRequisitions(FormObj,file,CompCode,skillCode,eduCode,ReqId): Observable<any> {

    const url_login = AppComponent.urlPath + 'CloneRequisition';
  
    var RefId = sessionStorage.getItem("RefId");
    var M_ID = sessionStorage.getItem("uniqueSessionId");
    var Usercategory = sessionStorage.getItem("USERCATEGORY");   
  
    if(file) {
      var fileValue: File = file[0];
    }
    else{
      var fileValue: File  = null;
    }

    const formData = new FormData();
   
    formData.append('Usercategory', Usercategory);    
    formData.append('EntityID', RefId);
    formData.append('CopiedFromReqId', ReqId);
    formData.append('Reqtitle', FormObj.Reqtitle);
    formData.append('EmploymentType', FormObj.EmploymentType);
    formData.append('ClientId', FormObj.ClientId);
    formData.append('Emplocation', FormObj.Emplocation);
    formData.append('Noofposition', FormObj.Noofposition);
    formData.append('Designation', FormObj.Designation);
    formData.append('Minexperience', FormObj.Minexperience);
    formData.append('Maxexperience', FormObj.Maxexperience);
    formData.append('BudgetType', FormObj.BudgetType);
    formData.append('Budgetccy', FormObj.Budgetccy);
    formData.append('Budgetminamt', FormObj.Budgetminamt);
    formData.append('Budgetmaxamt', FormObj.Budgetmaxamt);
    formData.append('Eduqlfn', eduCode);
    formData.append('Skillset', skillCode);
    formData.append('Jobdescription', FormObj.Jobdescription);
    formData.append('Competency', CompCode);
    formData.append('Jdattachment', fileValue);
    formData.append('Hiringmanager', FormObj.Hiringmanager);
    formData.append('EACManager', FormObj.EACManager);
    formData.append('ReqStatus', 'DR');
    formData.append('M_ID', M_ID);    
    formData.append('ReqStatusRemarks',FormObj.ReqStatusRemarks);
    formData.append('DeliveryManager', FormObj.DeliveryManager);
    formData.append('BusinessFunction', FormObj.BusinessFunction);

    return this.http.post(url_login, formData)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }
  
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
