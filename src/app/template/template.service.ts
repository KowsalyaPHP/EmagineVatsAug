import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

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

  public CreateTemplate(formObj,FieldList): Observable<any> {
   
    const url = AppComponent.urlPath + 'CreateTemplate';
    //const url ='http://f0afa0f79ca6.ngrok.io/TemplateList';
    
    const formData = new FormData();

    formData.append('Template_Name', formObj.Template_Name);
    formData.append('Field_List', FieldList);

    return this.http.post(url, formData)
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
}
