import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CvuploadService {

  constructor(private http: Http,private datePipe : DatePipe) { }

  public CVUpload(FormObj,file,ReqID,EmpArray,EduArray): Observable<any> {

    const url = AppComponent.urlPath + 'CVUpload';
    const params = new URLSearchParams();   

    var RefId = sessionStorage.getItem("RefId");
    var C_ID = sessionStorage.getItem("uniqueSessionId");

    const fileValue: File = file[0];
    const formData = new FormData(); 
    const date = this.datePipe.transform(FormObj.DateofBirth, 'MM/dd/yyyy');

    formData.append('EntityID', RefId);
    formData.append('RequisitionId', ReqID);
    formData.append('UserId',C_ID);
    formData.append('CV', fileValue);
    formData.append('Candidate_FN', FormObj.Candidate_FN);
    formData.append('Candidate_LN', FormObj.Candidate_LN);
    formData.append('EMailId', FormObj.EMailId);
    formData.append('MobileNo', FormObj.MobileNo);
    formData.append('DateofBirth', date);
    formData.append('Gender', FormObj.Gender);
    formData.append('MaritalStatus', FormObj.MaritalStatus);
    formData.append('WorkAuthorization', FormObj.WorkAuthorization);
    formData.append('PassportNo', FormObj.PassportNo);
    formData.append('Nationality', FormObj.Nationality);
    formData.append('Pr_AddressL1', FormObj.Pr_AddressL1);
    formData.append('Pr_AddressL2', FormObj.Pr_AddressL2);
    formData.append('Pr_AddressL3', FormObj.Pr_AddressL3);
    formData.append('Pr_AddressL4', FormObj.Pr_AddressL4);
    formData.append('Perm_AddressL1', FormObj.Perm_AddressL1);
    formData.append('Perm_AddressL2', FormObj.Perm_AddressL2);
    formData.append('Perm_AddressL3', FormObj.Perm_AddressL3);
    formData.append('Perm_AddressL4', FormObj.Perm_AddressL4);
    formData.append('C_ID', C_ID);
    formData.append('EduDetails', EduArray);
    formData.append('EmpDetails', EmpArray);

    return this.http.post(url, formData)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }
}
