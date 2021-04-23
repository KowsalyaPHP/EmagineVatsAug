import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';


@Injectable({
  providedIn: 'root'
})
export class RequisitionaddService {

  constructor(private http: Http) { }
  
 /* public addRequisitions(FormObj,CompCode,skillCode,eduCode): Observable<any> {

    const url_login = AppComponent.urlPath + 'AddNewRequisition';
    const params = new URLSearchParams();   

    var RefId = sessionStorage.getItem("RefId");
    var C_ID = sessionStorage.getItem("uniqueSessionId");
    var Usercategory = sessionStorage.getItem("USERCATEGORY");   

    params.set('Usercategory', Usercategory);    
    params.set('EntityID', RefId);
    params.set('Reqtitle', FormObj.Reqtitle);
    params.set('EmploymentType', FormObj.EmploymentType);
    params.set('ClientId', FormObj.ClientId);
    params.set('Emplocation', FormObj.Emplocation);
    params.set('Noofposition', FormObj.Noofposition);
    params.set('Designation', FormObj.Designation);
    params.set('Minexperience', FormObj.Minexperience);
    params.set('Maxexperience', FormObj.Maxexperience);
    params.set('BudgetType', FormObj.BudgetType);
    params.set('Budgetccy', FormObj.Budgetccy);
    params.set('Budgetminamt', FormObj.Budgetminamt);
    params.set('Budgetmaxamt', FormObj.Budgetmaxamt);
    params.set('Eduqlfn', eduCode);
    params.set('Skillset', skillCode);
    params.set('Jobdescription', FormObj.Jobdescription);
    params.set('Competency', CompCode);
    params.set('Jdattachment', FormObj.Jdattachment);
    params.set('Hiringmanager', FormObj.Hiringmanager);
    params.set('EACManager', FormObj.EACManager);
    params.set('C_ID', C_ID);
    console.log(params)
    return this.http.post(url_login, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }*/

  public addRequisitions(FormObj,file,CompCode,skillCode,eduCode): Observable<any> {

    const url_login = AppComponent.urlPath + 'AddNewRequisition';
    const params = new URLSearchParams();   

    var RefId = sessionStorage.getItem("RefId");
    var C_ID = sessionStorage.getItem("uniqueSessionId");
    var Usercategory = sessionStorage.getItem("USERCATEGORY");  
    if(file) {
      var fileValue: File = file[0];
    }
    else{
      var fileValue: File  = null;
    } 
   // const fileValue: File = file[0];
    const formData = new FormData();
   
    formData.append('Usercategory', Usercategory);    
    formData.append('EntityID', RefId);
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
    formData.append('DeliveryManager', FormObj.DeliveryManager);
    formData.append('BusinessFunction', FormObj.BusinessFunction);
    formData.append('JDVideoLink', FormObj.JDVideoLink);    
    formData.append('ReqCVCapCount', FormObj.ReqCVCapCount);    
    formData.append('ReqVendorCVCapCount', FormObj.ReqVendorCVCapCount);    
    formData.append('C_ID', C_ID);

    console.log("Usercategory => "+ formData.get('Usercategory'));
    console.log("EntityID => "+ formData.get('EntityID'));
    console.log("ClientId => "+ formData.get('ClientId'));
    console.log("Reqtitle => "+ formData.get('Reqtitle'));
    console.log("EmploymentType => "+ formData.get('EmploymentType'));
    console.log("Emplocation => "+ formData.get('Emplocation'));
    console.log("Noofposition => "+ formData.get('Noofposition'));
    console.log("Designation => "+ formData.get('Designation'));
    console.log("Minexperience => "+ formData.get('Minexperience'));
    console.log("Maxexperience => "+ formData.get('Maxexperience'));
    console.log("BudgetType => "+ formData.get('BudgetType'));
    console.log("Budgetccy => "+ formData.get('Budgetccy'));
    console.log("Budgetminamt => "+ formData.get('Budgetminamt'));
    console.log("Budgetmaxamt => "+ formData.get('Budgetmaxamt'));
    console.log("Eduqlfn => "+ formData.get('Eduqlfn'));
    console.log("Skillset => "+ formData.get('Skillset'));
    console.log("Jobdescription => "+ formData.get('Jobdescription'));
    console.log("Competency => "+ formData.get('Competency'));
    console.log("Jdattachment => "+ formData.get('Jdattachment'));
    console.log("Hiringmanager => "+ formData.get('Hiringmanager'));
    console.log("EACManager => "+ formData.get('EACManager'));
    console.log("C_ID => "+ formData.get('C_ID'));

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

  public UpdateRequisition(FormObj,file,reqId,CompCode,skillCode,eduCode): Observable<any> {

    const url = AppComponent.urlPath + 'ReqUpdate';
    const params = new URLSearchParams();
    var RefId = sessionStorage.getItem("RefId");
    var M_ID = sessionStorage.getItem("uniqueSessionId");

    const formData = new FormData();

    //const fileValue = '';

    if(file) {
      var fileValue: File = file[0];
    }
    else{
      var fileValue: File  = null;
    }

    formData.append('RequisitionId', reqId);    
    formData.append('EntityID', RefId);
    formData.append('ClientId', FormObj.ClientId);
    formData.append('Reqtitle', FormObj.Reqtitle);
    formData.append('EmploymentType', FormObj.EmploymentType);
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
    formData.append('Jdattachment',   fileValue);
    formData.append('Hiringmanager', FormObj.Hiringmanager);
    formData.append('EACManager', FormObj.EACManager);
    formData.append('ReqStatus', FormObj.ReqStatus);
    formData.append('M_ID', M_ID);    
    formData.append('ReqStatusRemarks',FormObj.ReqStatusRemarks);
    formData.append('DeliveryManager', FormObj.DeliveryManager);
    formData.append('BusinessFunction', FormObj.BusinessFunction);
    formData.append('JDVideoLink', FormObj.JDVideoLink);    
    formData.append('ReqCVCapCount', FormObj.ReqCVCapCount);    
    formData.append('ReqVendorCVCapCount', FormObj.ReqVendorCVCapCount); 
    
    console.log("RequisitionId => "+ formData.get('RequisitionId'));
    console.log("EntityID => "+ formData.get('EntityID'));
    console.log("ClientId => "+ formData.get('ClientId'));
    console.log("Reqtitle => "+ formData.get('Reqtitle'));
    console.log("EmploymentType => "+ formData.get('EmploymentType'));
    console.log("Emplocation => "+ formData.get('Emplocation'));
    console.log("Noofposition => "+ formData.get('Noofposition'));
    console.log("Designation => "+ formData.get('Designation'));
    console.log("Minexperience => "+ formData.get('Minexperience'));
    console.log("Maxexperience => "+ formData.get('Maxexperience'));
    console.log("BudgetType => "+ formData.get('BudgetType'));
    console.log("Budgetccy => "+ formData.get('Budgetccy'));
    console.log("Budgetminamt => "+ formData.get('Budgetminamt'));
    console.log("Budgetmaxamt => "+ formData.get('Budgetmaxamt'));
    console.log("Eduqlfn => "+ formData.get('Eduqlfn'));
    console.log("Skillset => "+ formData.get('Skillset'));
    console.log("Jobdescription => "+ formData.get('Jobdescription'));
    console.log("Competency => "+ formData.get('Competency'));
    console.log("Jdattachment => "+ formData.get('Jdattachment'));
    console.log("Hiringmanager => "+ formData.get('Hiringmanager'));
    console.log("EACManager => "+ formData.get('EACManager'));
    console.log("ReqStatus => "+ formData.get('ReqStatus'));
    console.log("M_ID => "+ formData.get('M_ID'));
    console.log("ReqStatusRemarks => "+ formData.get('ReqStatusRemarks'));

    return this.http.post(url, formData)
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
