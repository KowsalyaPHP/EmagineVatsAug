import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ManageapplicationService {

  constructor(private http: Http) { }
  
  public getStageValues(reqId,Stage): Observable<any> {

    const url = AppComponent.urlPath + 'MngAppSSAHN';
    //const url = 'http://481ab28aee69.ngrok.io/MngAppSSAHN';
    
    const params = new URLSearchParams();  
    var RefId = sessionStorage.getItem("RefId");
    
    params.set('EntityId', RefId);
    params.set('RequisitionId', reqId);
    params.set('Stage', Stage);     
    
    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return 'No Data';
      });
  }

  public getSubStageValues(reqId,Stage): Observable<any> {

    const url = AppComponent.urlPath + 'MngAppSSAHN';
   //const url = 'http://481ab28aee69.ngrok.io/MngAppSSAHN';
    const params = new URLSearchParams();  
    var RefId = sessionStorage.getItem("RefId");
    
    params.set('EntityId', RefId);
    params.set('RequisitionId', reqId);
    params.set('Stage', 'AS');     
    params.set('SubStage', Stage);     
    console.log(params)
    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return 'No Data';
      });
  }

  public getOffandJoinValues(reqId,Stage): Observable<any> {

    const url = AppComponent.urlPath + 'MngAppOffered';
    const params = new URLSearchParams();  
    var RefId = sessionStorage.getItem("RefId");
    
    params.set('EntityId', RefId);
    params.set('RequisitionId', reqId);
    params.set('Stage', Stage);     
    
    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return 'No Data';
      });
  }
  
  public updateStagetoStage(ReqId,ApplicationId,tostage,fromstage,CandidateId): Observable<any> {

    const url = AppComponent.urlPath + 'MngAppUpdateStage';

   // const url = "http://77e3f1b7.ngrok.io/MngAppUpdateStage";
    const params = new URLSearchParams();  
    var RefId = sessionStorage.getItem("RefId");
    var C_ID = sessionStorage.getItem("uniqueSessionId");
    var Usercategory = sessionStorage.getItem("USERCATEGORY");  

    params.set('EntityId', RefId);
    params.set('RequisitionId', ReqId);
    params.set('CandidateId', CandidateId);
    params.set('ApplicationId', ApplicationId);
    params.set('FromStage', fromstage);
    params.set('ToStage', tostage);
    params.set('Userid', C_ID);
    params.set('UserCategory', Usercategory);
    params.set('CVStageRemarks', '');
    

    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return 'No Data';
      });
  }
  public updateBackwardStagetoStage(ReqId,ApplicationId,tostage,fromstage,CandidateId): Observable<any> {

    const url = AppComponent.urlPath + 'BackwardMovement';

    const params = new URLSearchParams();  
    var RefId = sessionStorage.getItem("RefId");
    var C_ID = sessionStorage.getItem("uniqueSessionId");

    if(fromstage == 'OF'){
      var toStage = tostage;
    }
    else{
      var toStage = null;
    }
    
    params.set('EntityId', RefId);
    params.set('RequisitionId', ReqId);
    params.set('CandidateId', CandidateId);
    params.set('ApplicationId', ApplicationId);
    params.set('CurrentStage', fromstage);
    params.set('ToStage', toStage);
    params.set('C_ID', C_ID);    

    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return 'No Data';
      });
  }

  public updateBulkBackwardStagetoStage(ReqId,tostage,fromstage,selectId): Observable<any> {

    const url = AppComponent.urlPath + 'BulkBackwardMovement';

    const params = new URLSearchParams();  
    var RefId = sessionStorage.getItem("RefId");
    var C_ID = sessionStorage.getItem("uniqueSessionId");

    if(fromstage == 'OF'){
      var toStage = tostage;
    }
    else{
      var toStage = null;
    }
       
   /* params.set('EntityId', RefId);
    params.set('RequisitionId', ReqId);
    params.set('CurrentStage', fromstage);
    params.set('ToStage', toStage);
    params.set('C_ID', C_ID);    
    params.append('CandidateData', JSON.stringify(selectId));*/
     
    const formData = new FormData();
    
    formData.append('EntityId', RefId);
    formData.append('RequisitionId', ReqId);
    formData.append('CurrentStage', fromstage);
    formData.append('ToStage', toStage);
    formData.append('C_ID', C_ID)
    formData.append('CandidateData', JSON.stringify(selectId))

    return this.http.post(url, formData)    
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return 'No Data';
      });
  }
  
  public checkOfferPosition(ReqId): Observable<any> {

    const url = AppComponent.urlPath + 'PositionCheck';
    const params = new URLSearchParams();  
    var RefId = sessionStorage.getItem("RefId");
   
    params.set('EntityId', RefId);
    params.set('RequisitionId', ReqId);
    
    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return 'No Data';
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
  
  public downloadCVLink(reqId,candidateId,applicationId): Observable<any> {
    
     const url_get = AppComponent.urlPath + 'DownloadFile';
    const params = new URLSearchParams();   

    //const url_get = "http://d9799659.ngrok.io/DownloadFile";

   
    let RefId = sessionStorage.getItem("RefId");

    console.log('Entityid - ' + RefId);
    console.log('reqId - ' + reqId);
    console.log('candidateId - ' + candidateId);
    console.log('applicationId - ' + applicationId);

    // sessionStorage.setItem('Entityid', RefId);
    // sessionStorage.setItem('RequisitionId', reqId);
    // sessionStorage.setItem('CandidateId', candidateId);
    // sessionStorage.setItem('ApplicationId', applicationId);

    params.set('Entityid', RefId);
    params.set('RequisitionId', reqId);
    params.set('CandidateId', candidateId);
    params.set('ApplicationId', applicationId);
    
    console.log(params);
    
    return this.http.post(url_get, params, { responseType: ResponseContentType.Blob }).map(data => {
    
      return data;
    
      
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
    


 /* public downloadCVLink(): Observable<any> {
    
    //const url_get = AppComponent.urlPath + 'DownloadFile';
    const params = new URLSearchParams();   

    const url_get = "http://c35d1014.ngrok.io/DownloadFile";

   /* var RefId = sessionStorage.getItem("RefId");

    params.set('RequisitionId', reqId);
    params.set('Entityid', RefId);
    params.set('CandidateId', candidateId);
    params.set('ApplicationId', applicationId);
    console.log(params)*/

    /*return this.http.post(url_get,params)
    .map(response => response.json()).map(data => {
      if (data != '')
        return data;
      else
        return '';
    });
    
  

    return this.http.get(url_get,{ responseType: ResponseContentType.Blob }).map(data => {
    
    });
  }*/
 

