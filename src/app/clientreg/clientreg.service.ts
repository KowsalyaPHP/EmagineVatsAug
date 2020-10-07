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
    //const url = 'http://07b3f2413359.ngrok.io/clientm';
    
    const params = new URLSearchParams();   
    var RefId = sessionStorage.getItem("RefId");
    var C_ID = sessionStorage.getItem("uniqueSessionId");
    
    params.set('ClientName', FormObj.ClientName);
    params.set('ClientLastName', FormObj.clientLastName);
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
    /*params.set('AltContact', FormObj.AltContact);
    params.set('AltContactDesgn', FormObj.AltContactDesgn);
    params.set('AltContactNo', FormObj.AltContactNo);
    params.set('AltContactEmailId', FormObj.AltContactEmailId);*/
    params.set('ClientCategory', FormObj.ClientCategory);
    params.set('ClientType', FormObj.ClientType);
    params.set('AccountManager', FormObj.AccountManager);
    params.set('Coordinator', FormObj.Coordinator);
    params.set('C_ID', C_ID);
    params.set('ClientGSTNo', FormObj.ClientGSTNo);
    params.set('ClientLandMark', FormObj.ClientLandMark);
    params.set('MasterClient', FormObj.MasterClientID);
    params.set('ClientGLCode', FormObj.ClientGLCode);
    params.set('Source', RefId);
    
    console.log(params);

    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  public viewClientDetails(): Observable<any> {
    
    const url = AppComponent.urlPath + 'ClientVendorList';
   // const url = 'http://0e8509728470.ngrok.io/ClientVendorList';
    const params = new URLSearchParams();   
    var RefId = sessionStorage.getItem("RefId");
   
    params.set('UserCategory', 'C');
    params.set('EntityId',RefId);
    
    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  
  public viewClientSingleProfile(clientId): Observable<any> {
    
    const url = AppComponent.urlPath + 'CVProfile';
    //const url = 'http://e4789779d938.ngrok.io/CVProfile';
    const params = new URLSearchParams();   

    var C_ID = sessionStorage.getItem("uniqueSessionId");
    
    params.set('usercategory', 'C');
    params.set('userid', clientId);
    console.log(params);
    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  public UpdateClientDetails(FormObj,ClientId:any): Observable<any> {
    
    const url_Client = AppComponent.urlPath + 'ClientProfileEdit';
    //const url_Client = 'http://1a8b06676af6.ngrok.io/ClientProfileEdit';
    
    const params = new URLSearchParams();
    var M_ID = sessionStorage.getItem("uniqueSessionId");

    params.set('ClientID', ClientId);    
    params.set('RegdAddressL1', FormObj.RegdAddressL1);
    params.set('ClientLastName', FormObj.clientLastName);
    params.set('Area', FormObj.Area);
    params.set('City', FormObj.City);
    params.set('PINCODE', FormObj.PINCODE);
    params.set('ClientPhoneNo', FormObj.ClientPhoneNo);
    params.set('ClientGSTNo', FormObj.ClientGSTNo);
    params.set('ClientLandMark', FormObj.ClientLandMark);    
    params.set('MainContact', FormObj.MainContact);
    params.set('MainContactDesgn', FormObj.MainContactDesgn);
    params.set('MainContactNo', FormObj.MainContactNo);
    params.set('MainContactEmailId', FormObj.MainContactEmailId);
   /*params.set('AltContact', FormObj.AltContact);
    params.set('AltContactDesgn', FormObj.AltContactDesgn);
    params.set('AltContactNo', FormObj.AltContactNo);
    params.set('AltContactEmailId', FormObj.AltContactEmailId);*/
    params.set('clientstatus', FormObj.clientstatus);
    params.set('ClientCategory', FormObj.ClientCategory);
    params.set('ClientType', FormObj.ClientType);   
    params.set('ClientMobileNo', FormObj.ClientMobileNo);
    params.set('ClientEMAILID', FormObj.ClientEMAILID);   
    params.set('M_ID', M_ID);
    params.set('MasterClientID', FormObj.MasterClientID);
    params.set('ClientGLCode', FormObj.ClientGLCode);    
    params.set('ACCOUNTMANAGER', FormObj.AccountManager);
    params.set('COORDINATOR', FormObj.Coordinator);

    console.log(params);

    return this.http.post(url_Client, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }
  public viewChildClientDetails(clientId): Observable<any> {
    
    const url = AppComponent.urlPath + 'ClienChildList';
   // const url = 'http://0e8509728470.ngrok.io/ClienChildList';
    const params = new URLSearchParams();   
    
    params.set('ClientId', clientId);

    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }
  
}
