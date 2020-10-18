import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class AddskillcompetencyService {

  constructor(private http: Http) { }  
  
  public addNewSkill(FormObj): Observable<any> {

    const url = AppComponent.urlPath + 'AddSkillSet';
    const params = new URLSearchParams();   
    var C_ID = sessionStorage.getItem("uniqueSessionId");

    params.set('SkillSetTitle', FormObj.SkillSetTitle);
    params.set('C_ID', C_ID);
   
    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  public addNewCompetency(FormObj): Observable<any> {

    const url = AppComponent.urlPath + 'AddCompetency';
    const params = new URLSearchParams();   
    var C_ID = sessionStorage.getItem("uniqueSessionId");

    params.set('CompetencyTitle', FormObj.CompetencyTitle);
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
