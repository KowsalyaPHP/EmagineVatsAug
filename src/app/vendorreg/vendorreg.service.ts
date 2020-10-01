import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class VendorregService {



constructor(private http: Http) { }

  public addVendorDetails(FormObj): Observable<any> {

    const url = AppComponent.urlPath + 'vendorm';
    const params = new URLSearchParams();   

    var C_ID = sessionStorage.getItem("uniqueSessionId");
    
    params.set('VendorName', FormObj.VendorName);
    params.set('VendorLastName', FormObj.VendorLastName);
    params.set('RegdAddressL1', FormObj.RegdAddressL1);
    params.set('Area', FormObj.Area);
    params.set('City', FormObj.City);
    params.set('PINCODE', FormObj.PINCODE);
    params.set('VendorPhoneNo', FormObj.VendorPhoneNo);
    params.set('VendorMobileNo', FormObj.VendorMobileNo);
    params.set('VendorEMAILID', FormObj.VendorEMAILID);
    params.set('VendorGSTNo', FormObj.VendorGSTNo);
    params.set('VendorLandMark', FormObj.VendorLandMark);
    params.set('MainContact', FormObj.MainContact);
    params.set('MainContactDesgn', FormObj.MainContactDesgn);
    params.set('MainContactNo', FormObj.MainContactNo);
    params.set('MainContactEmailId', FormObj.MainContactEmailId);
    /*params.set('AltContact', FormObj.AltContact);
    params.set('AltContactDesgn', FormObj.AltContactDesgn);
    params.set('AltContactNo', FormObj.AltContactNo);
    params.set('AltContactEmailId', FormObj.AltContactEmailId);    */
    params.set('VENDORTIER', FormObj.VendorTier);
    params.set('VENDOREXPERTISE', FormObj.VendorExpertise);
    params.set('VendorType', FormObj.VendorType);
    params.set('TEAMSIZE', FormObj.TeamSize);
    params.set('VENDORGLCODE', FormObj.VendorGLCode);
    params.set('ALLOWEDUSERCT', FormObj.AllowedUserCt);
    params.set('CONCURRENTUSERCT', FormObj.ConcurrentUserCt);
    params.set('COMMONPOOLYORN', FormObj.CommonPoolYorN);
    params.set('OWNPOOLPERMITYORN', FormObj.OwnPoolPermitYorN);
    params.set('ADMINRIGHTSYORN', FormObj.AdminRightsYorN);
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

  public viewVendorDetails(): Observable<any> {

    const url = AppComponent.urlPath + 'ClientVendorList';
    const params = new URLSearchParams(); 

    var C_ID = sessionStorage.getItem("uniqueSessionId");
    var RefId = sessionStorage.getItem("RefId");
    
    params.set('UserCategory', 'V');
    params.set('EntityId',RefId);
    
    
    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }


  public viewVendorSingleProfile(vendorId): Observable<any> {

    const url = AppComponent.urlPath + 'CVProfile';
    const params = new URLSearchParams();   

    var C_ID = sessionStorage.getItem("uniqueSessionId");
    
    params.set('usercategory', 'V');
    params.set('userid', vendorId);
    
    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  public UpdateVendorDetails(FormObj,VendorId:any): Observable<any> {

    const url_Vendor = AppComponent.urlPath + 'VendorProfileEdit';
    const params = new URLSearchParams();
    var M_ID = sessionStorage.getItem("uniqueSessionId");

    params.set('VendorID', VendorId);    
    params.set('RegdAddressL1', FormObj.RegdAddressL1);
    params.set('Area', FormObj.Area);
    params.set('City', FormObj.City);
    params.set('PINCODE', FormObj.PINCODE);
    params.set('VendorPhoneNo', FormObj.VendorPhoneNo);
    params.set('VendorGSTNo', FormObj.VendorGSTNo);
    params.set('VendorLandMark', FormObj.VendorLandMark);
    params.set('VendorMobileNo', FormObj.VendorMobileNo);
    params.set('VendorEMAILID', FormObj.VendorEMAILID);
    params.set('MainContact', FormObj.MainContact);
    params.set('MainContactDesgn', FormObj.MainContactDesgn);
    params.set('MainContactNo', FormObj.MainContactNo);
    params.set('MainContactEmailId', FormObj.MainContactEmailId);
    /*params.set('AltContact', FormObj.AltContact);
    params.set('AltContactDesgn', FormObj.AltContactDesgn);
    params.set('AltContactNo', FormObj.AltContactNo);
    params.set('AltContactEmailId', FormObj.AltContactEmailId);*/
    params.set('VendorTier', FormObj.VendorTier);
    params.set('VendorExpertise', FormObj.VendorExpertise);
    params.set('VendorType', FormObj.VendorType);
    params.set('TeamSize', FormObj.TeamSize);
    params.set('VendorGLCode', FormObj.VendorGLCode);
    params.set('AllowedUserCt', FormObj.AllowedUserCt);
    params.set('ConcurrentUserCt', FormObj.ConcurrentUserCt);
    params.set('CommonPoolYorN', FormObj.CommonPoolYorN);
    params.set('OwnPoolPermitYorN', FormObj.OwnPoolPermitYorN);
    params.set('AdminRightsYorN', FormObj.AdminRightsYorN);
    params.set('VendorStatus', FormObj.VendorStatus);
    params.set('M_ID', M_ID);

    console.log(params);
    
    return this.http.post(url_Vendor, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }  
}