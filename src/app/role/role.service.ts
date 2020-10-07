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
  roleID:any;
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

  public RoleModuleFunctionMappingList(roleId): Observable<any> {
   
    const url = AppComponent.urlPath + 'RoleModuleFunctionMappingList';
    //const url ='http://72758291b1ee.ngrok.io/FunctionList';
    const params = new URLSearchParams();

  
    params.set('RoleId',roleId);
    
    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }
  
  public RoleModuleFunctionMapping(RoleId,Moduleid,Functionid,SubFunctionid): Observable<any> {
   
    const url = AppComponent.urlPath + 'RoleModuleFunctionMapping';
    //const url ='http://af57f880a4b4.ngrok.io/RoleModuleFunctionMapping';

    const formData = new FormData(); 
    
    if(typeof(RoleId) == 'undefined'){
      this.roleID = 1;
    }
    else{
      this.roleID  = RoleId;
    }
    formData.append('RoleId', this.roleID);
    formData.append('Moduleid', Moduleid);
    formData.append('Functionid',Functionid);
    formData.append('SubFunctionid', SubFunctionid);
    console.log('rid'+RoleId)
    console.log('mid'+Moduleid)
    console.log('fid'+Functionid)
    console.log('sid'+SubFunctionid)

    /*const params = new URLSearchParams();
    params.set('RoleId', RoleId);
    params.set('Moduleid', Moduleid);
    params.set('Functionid', Functionid);
    params.set('SubFunctionid', SubFunctionid);

    console.log(params);*/

    return this.http.post(url, formData)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

   
}
