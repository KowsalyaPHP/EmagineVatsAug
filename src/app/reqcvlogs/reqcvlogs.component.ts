import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ReqcvlogsService } from './reqcvlogs.service';

@Component({
  selector: 'app-reqcvlogs',
  templateUrl: './reqcvlogs.component.html',
  styleUrls: ['./reqcvlogs.component.css']
})
export class ReqcvlogsComponent implements OnInit {

  id:any;
  message:any;
  reqCvLogs:[];
  reqTitle:any;
  reqStatus:any;
  showMenu:boolean=false;
  
  constructor(private route: ActivatedRoute,private routerObj: Router,private ReqcvlogsServices: ReqcvlogsService){
   
    this.reqTitle = sessionStorage.getItem("reqTitle");
    this.reqStatus = sessionStorage.getItem("reqStatus");
   
    if(this.reqStatus == "DR")
    {
      this.showMenu=true;
    } 
    else{
      this.showMenu=false;
    }
    
    this.getReqLogsDetails();
  }

  ngOnInit() {
  }

  openSnackBar() { 
    var x = document.getElementById("snackbar")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800);
  }

  getReqLogsDetails(){

    this.route.params.subscribe(params => {
      this.id = params['id'];      
    });

    this.ReqcvlogsServices.getReqLogsDetail(this.id).subscribe(
      response => {               
        if (response != "No data") {          
          let getMessage =  response['Message'].split(":");
          if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
            this.message = getMessage['1'];
            this.openSnackBar(); 
          }
          else {                     
           this.reqCvLogs = response['Data'];
           response['Data'].forEach(item => {
              if(item.ReqStatus == 'OP'){
                item.ReqStatusString = 'Open';
              }
              else if(item.ReqStatus == 'DR'){
                item.ReqStatusString = 'Draft';
              }
              else if(item.ReqStatus == 'HO'){
                item.ReqStatusString = 'On Hold';
              }
              else if(item.ReqStatus == 'AR'){
                item.ReqStatusString = 'Archived';
              }
           });
          }                
        } else {
         console.log("something is wrong with Service Execution"); 
        }
      },
      error => console.log(error)      
    );
   }
}
