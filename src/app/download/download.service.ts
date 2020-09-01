import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
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
}
