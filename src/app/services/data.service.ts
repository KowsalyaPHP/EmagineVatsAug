import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private isReloadReqDashboard = new BehaviorSubject<boolean>(false);
  getReloadReqDashboardFlag = this.isReloadReqDashboard.asObservable();  

  constructor() { }

  changeReloadReqDashboard(flag: boolean) {
    this.isReloadReqDashboard.next(flag);
  }
}
