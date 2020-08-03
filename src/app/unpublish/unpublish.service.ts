import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class UnpublishService {

  constructor(private http: Http) { }
 
  public getPublishedVendorList(reqId): Observable<any> {

    const url = AppComponent.urlPath + 'ReqPublishedVendor';

    const params = new URLSearchParams();  
    var RefId = sessionStorage.getItem("RefId");

    params.set('EntityID', RefId);
    params.set('RequisitionId', reqId);
    
    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return 'No Data';
      });
  }
  
  public reqUnPublish(reqId,publishedVendorId): Observable<any> {

    const url = AppComponent.urlPath + 'ReqUnPublish';

    const params = new URLSearchParams();  
    var RefId = sessionStorage.getItem("RefId");
    var C_ID = sessionStorage.getItem("uniqueSessionId");

    params.set('EntityID', RefId);
    params.set('RequisitionId', reqId);
    params.set('VendorId', publishedVendorId);
    params.set('M_Id', C_ID);  
    
    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return 'No Data';
      });
  }
}
