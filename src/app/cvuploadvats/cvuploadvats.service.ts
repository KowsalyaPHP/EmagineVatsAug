import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CvuploadvatsService {

  constructor(private http: Http, private datePipe: DatePipe) { }

  public CVUpload(FormObj, file, ReqID, EmpArray, EduArray, vendorId): Observable<any> {

    const url = AppComponent.urlPath + 'CVUpload';
    const params = new URLSearchParams();

    var RefId = sessionStorage.getItem("RefId");
    var C_ID = sessionStorage.getItem("uniqueSessionId");

    const fileValue: File = file[0];
    const formData = new FormData();
    const date = this.datePipe.transform(FormObj.DateofBirth, 'MM/dd/yyyy');

    formData.append('EntityID', 'Emagine');
    formData.append('RequisitionId', ReqID);
    formData.append('UserId', vendorId);
    formData.append('CV', fileValue);
    formData.append('Candidate_FN', FormObj.Candidate_FN);
    formData.append('Candidate_LN', FormObj.Candidate_LN);
    formData.append('EMailId', FormObj.EMailId);
    formData.append('MobileNo', FormObj.MobileNo);
    formData.append('DateofBirth', date);
    formData.append('Gender', FormObj.Gender);
    //formData.append('MaritalStatus', FormObj.MaritalStatus);
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
    formData.append('sourcecategory', 'Vendor');
    console.log(formData);
    return this.http.post(url, formData)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  public CVParser(file): Observable<any> {
    const url = environment.affindaUrl + 'documents/';

    if (file) {
      var fileValue: File = file[0];
    }
    else {
      var fileValue: File = null;
    }

    //const fileValue: File = file[0];
    const formData = new FormData();
    formData.append('file_name', fileValue.name);
    // let fext = fileValue.name.split('.').pop();
    let fext = "pdf";
    formData.append(fext, fileValue);
    console.log(formData);
    let headers = {
      Authorization: environment.affindaToken
    };
    // return;
    return this.http.post(url, formData, { headers: <any>headers })
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      },
        error => {
        });
  }

  public getCVDetail(identifier): Observable<any> {
    const url = environment.affindaUrl + 'documents/' + identifier + '/';
    let headers = {
      Authorization: environment.affindaToken
    };
    return this.http.get(url, { headers: <any>headers })
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      },
        error => {
        });
    // return;
  }
}