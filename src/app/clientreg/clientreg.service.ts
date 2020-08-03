import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class ClientregService {

  constructor(private http: Http) { }

  public addClientDetails(FormObj): Observable<any> {

    const url = AppComponent.urlPath + 'clientm';
    const params = new URLSearchParams();   

    var C_ID = sessionStorage.getItem("uniqueSessionId");
   
    params.set('ClientName', FormObj.ClientName);
    params.set('RegdAddressL1', FormObj.RegdAddressL1);
    params.set('Area', FormObj.Area);
    params.set('City', FormObj.City);
    params.set('PINCODE', FormObj.PINCODE);
    params.set('ClientPhoneNo', FormObj.ClientPhoneNo);
    params.set('ClientMobileNo', FormObj.ClientMobileNo);
    params.set('ClientEMAILID', FormObj.ClientEMAILID);
    params.set('MainContact', FormObj.MainContact);
    params.set('MainContactDesgn', FormObj.MainContactDesgn);
    params.set('MainContactNo', FormObj.MainContactNo);
    params.set('MainContactEmailId', FormObj.MainContactEmailId);
    params.set('AltContact', FormObj.AltContact);
    params.set('AltContactDesgn', FormObj.AltContactDesgn);
    params.set('AltContactNo', FormObj.AltContactNo);
    params.set('AltContactEmailId', FormObj.AltContactEmailId);
    params.set('ClientCategory', FormObj.ClientCategory);
    params.set('ClientType', FormObj.ClientType);
    params.set('MasterClientID', FormObj.MasterClientID);
    params.set('ClientGLCode', FormObj.ClientGLCode);
    params.set('AccountManager', FormObj.AccountManager);
    params.set('Coordinator', FormObj.Coordinator);
    params.set('C_ID', C_ID);      

    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }
}
