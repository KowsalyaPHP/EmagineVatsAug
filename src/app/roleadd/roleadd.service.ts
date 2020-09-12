import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class RoleaddService {

  constructor(private http: Http) { }

  public addRoles(FormObj): Observable<any> {

    const url = AppComponent.urlPath + 'RoleAdd';
    //const url = 'http://d5bc9cd68336.ngrok.io/RoleAdd';

    const params = new URLSearchParams();   
    var C_ID = sessionStorage.getItem("uniqueSessionId");

    params.set('RoleName', FormObj.RoleName);    
    params.set('C_ID', C_ID);
    
    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  public addModules(FormObj): Observable<any> {

     const url = AppComponent.urlPath + 'ModuleAdd';
    // const url = 'http://461e06b1db5d.ngrok.io/ModuleAdd';
 
     const params = new URLSearchParams();   
     var C_ID = sessionStorage.getItem("uniqueSessionId");
 
     params.set('ModuleName', FormObj.ModuleName);    
     params.set('C_ID', C_ID);
     
     return this.http.post(url, params)
       .map(response => response.json()).map(data => {
         if (data != '')
           return data;
         else
           return '';
       });
   }
  
   public getModuleList(): Observable<any> {
   
    const url = AppComponent.urlPath + 'ModuleList';
   // const url ='http://461e06b1db5d.ngrok.io/ModuleList';
  
    return this.http.get(url)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  public addFunctions(FormObj): Observable<any> {

     const url = AppComponent.urlPath + 'FunctionAdd';
   //  const url = 'http://461e06b1db5d.ngrok.io/FunctionAdd';
 
     const params = new URLSearchParams();   
     var C_ID = sessionStorage.getItem("uniqueSessionId");
 
     params.set('ModuleId', FormObj.ModuleId);    
     params.set('FunctionName', FormObj.FunctionName);    
     params.set('C_ID', C_ID);
     
     return this.http.post(url, params)
       .map(response => response.json()).map(data => {
         if (data != '')
           return data;
         else
           return '';
       });
   }

   public addSubFunctions(FormObj): Observable<any> {

     const url = AppComponent.urlPath + 'SubFunctionAdd';
    // const url = 'http://461e06b1db5d.ngrok.io/SubFunctionAdd';
 
     const params = new URLSearchParams();   
     var C_ID = sessionStorage.getItem("uniqueSessionId");
 
     params.set('FunctionId', FormObj.FunctionId);    
     params.set('SubFunctionName', FormObj.SubFunctionName);    
     params.set('C_ID', C_ID);
     
     return this.http.post(url, params)
       .map(response => response.json()).map(data => {
         if (data != '')
           return data;
         else
           return '';
       });
   }

   public getFunctionList(): Observable<any> {
   
    //const url = AppComponent.urlPath + 'FunctionList';
    const url ='http://d2d9fe8b5c1a.ngrok.io/RoleFunctionMappingList_N';
  
    return this.http.get(url)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  public EditRole(FormObj,RoleId): Observable<any> {

     const url = AppComponent.urlPath + 'RoleEdit';
    // const url = 'http://461e06b1db5d.ngrok.io/RoleEdit';
 
     const params = new URLSearchParams();   
     var C_ID = sessionStorage.getItem("uniqueSessionId");
     
     params.set('RoleId', RoleId);    
     params.set('RoleName', FormObj.RoleName);    
     params.set('M_ID', C_ID);
     params.set('Active_Inactive', 'yes');
     
     return this.http.post(url, params)
       .map(response => response.json()).map(data => {
         if (data != '')
           return data;
         else
           return '';
       });
   }
   
   public EditModule(FormObj,ModuleId): Observable<any> {

     const url = AppComponent.urlPath + 'ModuleEdit';
    // const url = 'http://461e06b1db5d.ngrok.io/ModuleEdit';
 
     const params = new URLSearchParams();   
     var C_ID = sessionStorage.getItem("uniqueSessionId");
  
     params.set('ModuleId',ModuleId);    
     params.set('ModuleName', FormObj.ModuleName);    
     params.set('M_ID', C_ID);
     params.set('IsSelected', C_ID);
     
     return this.http.post(url, params)
       .map(response => response.json()).map(data => {
         if (data != '')
           return data;
         else
           return '';
       });
   }

   public EditFunction(FormObj): Observable<any> {

     const url = AppComponent.urlPath + 'FunctionEdit';
   //  const url = 'http://461e06b1db5d.ngrok.io/FunctionEdit';
 
     const params = new URLSearchParams();   
     var C_ID = sessionStorage.getItem("uniqueSessionId");
  
     params.set('FunctionId', FormObj.FunctionId);    
     params.set('FunctionName', FormObj.FunctionName);    
     params.set('M_ID', C_ID);
     params.set('Scrapping', C_ID);
     
     return this.http.post(url, params)
       .map(response => response.json()).map(data => {
         if (data != '')
           return data;
         else
           return '';
       });
   }

   public EditSubFunction(FormObj): Observable<any> {

     const url = AppComponent.urlPath + 'SubFunctionAdd';
    // const url = 'http://461e06b1db5d.ngrok.io/SubFunctionAdd';
 
     const params = new URLSearchParams();   
     var C_ID = sessionStorage.getItem("uniqueSessionId");
    
     params.set('FunctionId', FormObj.FunctionId);    
     params.set('SubFunctionName', FormObj.SubFunctionName);    
     params.set('M_ID', C_ID);
     
     return this.http.post(url, params)
       .map(response => response.json()).map(data => {
         if (data != '')
           return data;
         else
           return '';
       });
   }
}
