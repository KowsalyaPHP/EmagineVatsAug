import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';


@Injectable({
  providedIn: 'root'
})
export class UserregService {
  RefId:any;
  constructor(private http: Http) { }
  

  public addUserDetails(FormObj): Observable<any> {

    console.log(FormObj);
    //const url = AppComponent.urlPath + 'Addusers';
    const url = AppComponent.urlPath + 'Addusers';
    const params = new URLSearchParams();   
    var usercategory =  sessionStorage.getItem("USERCATEGORY");
    var C_ID = sessionStorage.getItem("uniqueSessionId");

   /* if(usercategory == 'E'){
      if(FormObj['clientName'] != '' && FormObj['usercategory'] == 'C'){
        this.RefId = FormObj['clientName'];
      }
      else if(FormObj['vendorName'] != '' && FormObj['usercategory'] == 'V'){
        this.RefId = FormObj['vendorName'];
      }
      else{
        this.RefId = sessionStorage.getItem("RefId");
      }
    }
    else{
      this.RefId = sessionStorage.getItem("RefId");
      FormObj.usercategory = sessionStorage.getItem("USERCATEGORY");
    }*/

    this.RefId = sessionStorage.getItem("RefId");
    FormObj.usercategory = sessionStorage.getItem("USERCATEGORY");
    

    params.set('usercategory', FormObj.usercategory);
    params.set('RefId', this.RefId);
    params.set('UserMrMs', FormObj.UserMrMs);
    params.set('UserName', FormObj.UserName);
    params.set('UserRemarks', FormObj.UserRemarks);
    params.set('UserEmail', FormObj.UserEmail);
    params.set('UserContactNo', FormObj.UserContactNo);
    params.set('USERROLES', FormObj.userRole);    
    params.set('USERDATARULE', FormObj.userRule);
    params.set('C_ID', C_ID);
    
    console.log(params);

    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  public UpdateUserDetails(FormObj,userId:any): Observable<any> {

    const url_user = AppComponent.urlPath + 'UserProfileEdit';
    const params = new URLSearchParams();
    var M_ID = sessionStorage.getItem("uniqueSessionId");

    params.set('USERID', userId);
    params.set('USERROLES', FormObj.userRole);    
    params.set('USERDATARULE', FormObj.userRule);
    params.set('USERMRMS', FormObj.UserMrMs);
    params.set('UserName', FormObj.UserName);
    params.set('STATUS', FormObj.UserStatus);
    params.set('UserRemarks', FormObj.UserRemarks);
    params.set('UserEmail', FormObj.UserEmail);
    params.set('UserContactNo', FormObj.UserContactNo);      
    params.set('M_ID', M_ID);

    console.log(params);
    
    return this.http.post(url_user, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  } 
  
  public viewUserSingleProfile(userId): Observable<any> {

    const url = AppComponent.urlPath + 'userprofile';
    const params = new URLSearchParams();   

    var C_ID = sessionStorage.getItem("uniqueSessionId");
    
    //params.set('usercategory', 'V');
    params.set('userid', userId);
    
    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  public getRuleList(): Observable<any> {
   
    const url = AppComponent.urlPath + 'RuleList';
   // const url ='http://461e06b1db5d.ngrok.io/RuleList';
    const params = new URLSearchParams(); 
    var RefId = sessionStorage.getItem("RefId");
    params.set('EntityId', RefId);
          
    return this.http.post(url, params)
        .map(response => response.json()).map(data => {
          if (data != '')
            return data;
          else
            return '';
        });
  }
  public getRuleListbyId(id): Observable<any> {
   
    const url = AppComponent.urlPath + 'RuleList';
   // const url ='http://461e06b1db5d.ngrok.io/RuleList';
    const params = new URLSearchParams(); 
   
    params.set('EntityId', id);
          
    return this.http.post(url, params)
        .map(response => response.json()).map(data => {
          if (data != '')
            return data;
          else
            return '';
        });
  }

}
