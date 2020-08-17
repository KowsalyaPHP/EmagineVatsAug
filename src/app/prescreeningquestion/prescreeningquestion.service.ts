import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class PrescreeningquestionService {

  constructor(private http: Http) { }

  public getQuestionDetails(reqId:any): Observable<any> {

    const url = AppComponent.urlPath + 'reqdashboard';
    const params = new URLSearchParams();  
    var RefId = sessionStorage.getItem("RefId");

    params.set('ReqStatus', 'OP');
    params.set('EntityId', RefId); 
    
    return this.http.post(url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return 'No Data';
      });
  }

  public addQuestionDetails(reqId:any,questionDetails): Observable<any> {

   // const url = AppComponent.urlPath + 'PreScreeningQueAdd';
    const url = 'http://57a05fe0c81d.ngrok.io/PreScreeningQueAdd';

    //const params = new URLSearchParams();  
    const formData = new FormData();
    var RefId = sessionStorage.getItem("RefId");
    var C_ID = sessionStorage.getItem("uniqueSessionId");

    formData.append('EntityId', RefId);
    formData.append('RequisitionId', reqId);
    formData.append('C_ID', C_ID);
    formData.append('DeletedQuesId', '1');
    formData.append('QuestionDetails', questionDetails);
    /*params.set('EntityId', RefId); 
    params.set('RequisitionId', reqId); 
    params.set('C_ID', C_ID); 
    params.set('DeletedQuesId', '1');     
    params.set('QuestionDetails', questionDetails); */
  console.log(formData);
    return this.http.post(url, formData)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return 'No Data';
      });
  }
}
