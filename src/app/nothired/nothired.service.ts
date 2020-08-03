import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class NothiredService {

  constructor(private http: Http) { }
  
  public addNotHiredReason(FormObj,reqId): Observable<any> {

    const url = AppComponent.urlPath + 'NotHiredReason';
    const params = new URLSearchParams();  
    var RefId = sessionStorage.getItem("RefId");
    const formData = new FormData(); 
  
    formData.append('EntityID', RefId);
    formData.append('RequisitionId', reqId);
    formData.append('Nothiredlist', FormObj);

    console.log(reqId);

    console.log('EntityID=>'+formData.get('EntityID'));
    console.log('RequisitionId=>'+formData.get('RequisitionId'));
    console.log('Nothiredlist=>'+formData.get('Nothiredlist'));
   /* params.set('EntityId', RefId);
    params.set('RequisitionId', reqId);
    params.set('Nothiredlist', FormObj); 

    console.log(params);*/

    return this.http.post(url, formData)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return 'No Data';
      });
  }
  
}
