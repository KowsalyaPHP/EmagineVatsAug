import { Component } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { Router,ActivatedRoute, NavigationStart, NavigationEnd, Event as NavigationEvent ,NavigationCancel, NavigationError} from '@angular/router';
import { AboutreleaseComponent } from './aboutrelease/aboutrelease.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vats';
  userName='';

 public static urlPath = "https://api.emaginerock.com/";
 //public static urlPath = "https://devapi.emaginerock.com/";
 //public static urlPath = "http://bincrm.com/vatsdev/";
 //public static urlPath = "http://bd8b9875e493.ngrok.io/";

 myArray:any;
  constructor(private router: Router,private route: ActivatedRoute,private dialog: MatDialog) {
    var userName = sessionStorage.getItem("FunctionList");
    this.myArray = userName.split(',');
  }

  openDialogAboutReleasePage(): void { 
  
    const dialogRef = this.dialog.open(AboutreleaseComponent, {
      width: '400px',
      data: {addType: 'skill'}      
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result && result.action === 1) {
      } 
    });    
  }

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
