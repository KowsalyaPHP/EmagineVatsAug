import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams , ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private http: Http) { }

  public viewTemplateDetails(): Observable<any> {
   
    const url = AppComponent.urlPath + 'TemplateList';
    //const url ='http://4c1e7ef869e0.ngrok.io/TemplateList';
    
    const formData = new FormData();

    return this.http.get(url)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  public viewTemplateSingle(templateId): Observable<any> {
   
    const url = AppComponent.urlPath + 'ViewTemplate';
   // const url =' http://4e5d4e1688bd.ngrok.io/ViewTemplate';
   
    const formData = new FormData();

    formData.append('Template_Id', templateId);

    return this.http.post(url, formData)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

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

  public downloadTracker(reqId,TemplateId,ApplicationId,CandidateId): Observable<any> {

    const url = AppComponent.urlPath + 'DownloadTracker';
   // const url = 'http://7c5ccf921a31.ngrok.io/DownloadTracker';
    
  
    var RefId = sessionStorage.getItem("RefId");        
    const formData = new FormData();

    formData.append('EntityID', RefId);
    formData.append('RequisitionId', reqId);
    formData.append('TemplateId',TemplateId);
    formData.append('CandidateId', CandidateId);
    formData.append('ApplicationId', ApplicationId);

    console.log(RefId)
    console.log(reqId)
    console.log(TemplateId)
    console.log(CandidateId)
    console.log(ApplicationId)

    return this.http.post(url, formData, { responseType: ResponseContentType.Blob })
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return 'No Data';
      });
  }
}
