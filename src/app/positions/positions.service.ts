import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class PositionsService {

  constructor(private http: Http) { }
  
  public getPositionList(Reqid): Observable<any> {

    const url = AppComponent.urlPath + 'PositionView';
    const params = new URLSearchParams();  
    var RefId = sessionStorage.getItem("RefId");

    params.set('EntityId', RefId);
    params.set('RequisitionId', Reqid);
     
    
    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return 'No Data';
      });
  }

  public addPositions(Reqid,formobj): Observable<any> {

    const url = AppComponent.urlPath + 'PositionsAdd';
    const params = new URLSearchParams();  
    var RefId = sessionStorage.getItem("RefId");
    var C_ID = sessionStorage.getItem("uniqueSessionId");

    params.set('EntityId', RefId);
    params.set('RequisitionId', Reqid);
    params.set('NumberofPositions', formobj);
    params.set('C_ID', C_ID);
 console.log(params)
    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return 'No Data';
      });
  }

  public deletePositions(Reqid,formobj): Observable<any> {

    const url = AppComponent.urlPath + 'PositionsDelete';
    const params = new URLSearchParams();  
    var RefId = sessionStorage.getItem("RefId");

    params.set('EntityId', RefId);
    params.set('RequisitionId', Reqid);
    params.set('NumberofPositions',formobj); 
    
    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return 'No Data';
      });
  }
}
