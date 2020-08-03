import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  urlPath = AppComponent.urlPath;

  constructor(private http: Http) { 

  }
  

  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';

  public exportExcel(jsonData: any[], fileName: string): void {

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, fileName);
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: this.fileType});
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }
  
  public getSkillSet(): Observable<any> {

    const url = this.urlPath + 'lkup';
    const params = new URLSearchParams();
 
    params.set('lkup', 'SKILLSET');    
    return this.http.post(url, params)
      .map(response => response.json()['Data']).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }
  public getCompetency(): Observable<any> {

    const url = this.urlPath + 'lkup';
    const params = new URLSearchParams();
 
    params.set('lkup', 'COMPETENCY');    
    return this.http.post(url, params)
      .map(response => response.json()['Data']).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  public getLocation(): Observable<any> {

    const url = this.urlPath + 'lkup';
    const params = new URLSearchParams();
 
    params.set('lkup', 'LOCATION');    
    return this.http.post(url, params)
      .map(response => response.json()['Data']).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  public getEmploymentType(): Observable<any> {

    const url = this.urlPath + 'lkup';
    const params = new URLSearchParams();
 
    params.set('lkup', 'EMPTYPE');    
    return this.http.post(url, params)
      .map(response => response.json()['Data']).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  public getBudgetType(): Observable<any> {

    const url = this.urlPath + 'lkup';
    const params = new URLSearchParams();
 
    params.set('lkup', 'BUDGETTYPE');    
    return this.http.post(url, params)
      .map(response => response.json()['Data']).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  public getBudgetCurrency(): Observable<any> {

    const url = this.urlPath + 'lkup';
    const params = new URLSearchParams();
 
    params.set('lkup', 'CURRENCY');    
    return this.http.post(url, params)
      .map(response => response.json()['Data']).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  public getEducation(): Observable<any> {

    const url = this.urlPath + 'lkup';
    const params = new URLSearchParams();
 
    params.set('lkup', 'EDUQLFN');    
    return this.http.post(url, params)
      .map(response => response.json()['Data']).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  public getHiringManager(): Observable<any> {

    const url = this.urlPath + 'lkup';
    const params = new URLSearchParams();
 
    params.set('lkup', 'ContactPerson');    
    return this.http.post(url, params)
      .map(response => response.json()['Data']).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  public getClient(): Observable<any> {

    const url = this.urlPath + 'lkup';
    const params = new URLSearchParams();
 
    params.set('lkup', 'CLIENT');    
    return this.http.post(url, params)
      .map(response => response.json()['Data']).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  public getAccountManager(): Observable<any> {

    const url = this.urlPath + 'lkup';
    const params = new URLSearchParams();
 
    params.set('lkup', 'ACCOUNTMANAGER');    
    return this.http.post(url, params)
      .map(response => response.json()['Data']).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  public getNationality(): Observable<any> {

    const url = this.urlPath + 'lkup';
    const params = new URLSearchParams();
 
    params.set('lkup', 'COUNTRY');    
    return this.http.post(url, params)
      .map(response => response.json()['Data']).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  public getLkupNotHiredReason(): Observable<any> {

    const url = this.urlPath + 'lkup';
    const params = new URLSearchParams();
 
    params.set('lkup', 'RejectionReason');    
    return this.http.post(url, params)
      .map(response => response.json()['Data']).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  public getLkupCity(): Observable<any> {

    const url = this.urlPath + 'lkup';
    const params = new URLSearchParams();
 
    params.set('lkup', 'city');    
    return this.http.post(url, params)
      .map(response => response.json()['Message']).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  public getLkupClientStatus(): Observable<any> {

    const url = this.urlPath + 'lkup';
    const params = new URLSearchParams();
 
    params.set('lkup', 'CSTATUS');    
    return this.http.post(url, params)
      .map(response => response.json()['Message']).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  public getLkupClientCategory(): Observable<any> {

    const url = this.urlPath + 'lkup';
    const params = new URLSearchParams();
 
    params.set('lkup', 'CCAT');    
    return this.http.post(url, params)
      .map(response => response.json()['Message']).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  public getLkupClientType(): Observable<any> {

    const url = this.urlPath + 'lkup';
    const params = new URLSearchParams();
 
    params.set('lkup', 'CTYPE');    
    return this.http.post(url, params)
      .map(response => response.json()['Message']).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

}
