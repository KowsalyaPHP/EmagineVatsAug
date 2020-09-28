import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {

  constructor(private http: Http) { }

  public forgotpasswordDetails(FormObj,username): Observable<any> {

    const url_login = AppComponent.urlPath + 'ForgotPassword';
   // const url_login = 'http://0b525b161e5e.ngrok.io/ForgotPassword?userid=EEMG0016';
    const params = new URLSearchParams();   
    
    params.set('Userid', username);
    params.set('NewPassword', FormObj.NewPassword);
   console.log(params)
    return this.http.post(url_login, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
      
  }
  
}
