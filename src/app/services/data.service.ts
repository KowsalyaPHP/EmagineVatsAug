import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private isReloadReqDashboard = new BehaviorSubject<boolean>(false);
  getReloadReqDashboardFlag = this.isReloadReqDashboard.asObservable(); 

  private isReloadCVUpload = new BehaviorSubject<boolean>(false);
  getReloadCVUploadFlag = this.isReloadCVUpload.asObservable(); 
  constructor() { }

  changeReloadReqDashboard(flag: boolean) {
    this.isReloadReqDashboard.next(flag);
  }

  changeReloadCVUpload(flag: boolean) {
    this.isReloadCVUpload.next(flag);
  }
}
