import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class AddcityService {

  
  constructor(private http: Http) { }  
  
  public addNewCity(FormObj): Observable<any> {

    const url = AppComponent.urlPath + 'AddCity';
    const params = new URLSearchParams();   
    var C_ID = sessionStorage.getItem("uniqueSessionId");

    params.set('CityName', FormObj.CityName);
    params.set('C_ID', C_ID);
   

    return this.http.post(url,params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }
}