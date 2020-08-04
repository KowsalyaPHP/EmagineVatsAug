import { Component } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { Router,ActivatedRoute, NavigationStart, NavigationEnd, Event as NavigationEvent ,NavigationCancel, NavigationError} from '@angular/router';
import { RequisitionaddComponent } from './requisitionadd/requisitionadd.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vats';
  userName='';
  public static urlPath = "http://bincrm.com/vatsdev/";
  
  /*show_menu: any = 'false';
  ReqID:any;
  reqStatus:any;

  constructor(private router: Router,private route: ActivatedRoute) {
      
      router.events.subscribe((event: NavigationEvent) => {
      
      //Before Navigation
      if (event instanceof NavigationStart) {
       
        if (event.url.includes('requisitionadd') || event.url.includes('position') || event.url.includes('reqcvlog')) {
          let id=event.url.split("/");
          this.ReqID = id['2'];      
          this.show_menu = 'true';            
        }
        else {
          this.show_menu = 'false';                 
        }
      }

    });

  }*/

  isLoggedIn(){
    var sessionId = sessionStorage.getItem("uniqueSessionId");
    if(sessionId){
      this.userName = sessionStorage.getItem("userName");      
      return true;
    }
    else{
      this.userName='';
      return false;
    }
  }
 //public static urlPath = "http://889d4ffe.ngrok.io/";

}
