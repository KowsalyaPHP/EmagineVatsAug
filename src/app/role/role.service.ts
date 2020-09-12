import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component'

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: Http) { }

  public getRoleList(): Observable<any> {
   
    const url = AppComponent.urlPath + 'RoleList';
    //const url ='http://461e06b1db5d.ngrok.io/RoleList';
  
    return this.http.get(url)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  public getModuleList(): Observable<any> {
   
    const url = AppComponent.urlPath + 'ModuleList';
    //const url ='http://461e06b1db5d.ngrok.io/ModuleList';
  
    return this.http.get(url)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  public getFunctionList(): Observable<any> {
   
    const url = AppComponent.urlPath + 'FunctionList';
   // const url ='http://d2d9fe8b5c1a.ngrok.io/RoleFunctionMappingList_N';
    const params = new URLSearchParams();
    params.set('RoleId', "0");
      
    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  public getSubfunctionList(): Observable<any> {
   
    const url = AppComponent.urlPath + 'SubFunctionList';
    //const url ='http://461e06b1db5d.ngrok.io/SubFunctionList';
  
    return this.http.get(url)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }
  

}
