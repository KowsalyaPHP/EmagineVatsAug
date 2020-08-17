import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ReqDashboardService } from './req-dashboard.service';
import { MatSnackBar,MatFormFieldControl, MatFormField, MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatChipInputEvent } from '@angular/material';
import { SharedService } from '../shared/shared.service';
import { stringify } from 'querystring';
declare var $: any
import { TooltipComponent, TooltipAnimationSettings } from '@syncfusion/ej2-angular-popups';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import {DocviewjdComponent} from '../docviewjd/docviewjd.component'
import { ViewrequisitionComponent } from '../viewrequisition/viewrequisition.component';

@Component({
  selector: 'app-req-dashboard',
  templateUrl: './req-dashboard.component.html',
  styleUrls: ['./req-dashboard.component.css']
})
export class ReqDashboardComponent implements OnInit {

  reqList:[];
  assessmentCount:[];
  //icon: string[] = []
 
  icon:any;
  menu1:any;
  menu2:any;
  message:any;
  priority1:any;
  priority2:any;
  changeIcon:any;
  status:any;
  id:any;
  manageRedirect:boolean=false;
  dataTable: any;

  constructor(private route: ActivatedRoute,private routerObj: Router,private SharedServices: SharedService,private ReqDashboardServices: ReqDashboardService,public dialog: MatDialog,private _snackBar: MatSnackBar){
    this.route.params.subscribe(params => {
      this.status = params['status']; 
    });

    this.getReqLists(this.status); 

    /*setTimeout(function () {       
      $(function () {
        $('#reqList').DataTable({
          scrollY: '370px'
        });           
      });          
      $("#loader").hide();
      
    }, 500);*/

   
    
  }

  openSnackBar() { 
    var x = document.getElementById("snackbar")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800);
  }

  

  ngOnInit() {
    
 /*   let time_out = 50;

    let reqDBPromise = (new Promise(function(resolve, reject) {
            setTimeout(function() {
                console.log("successfully resolving");
                resolve();
            }, time_out);
            setTimeout(function() {
                console.log("first timeout, rejecting the promise");
                reject();
            }, 1500);
        })).catch(function() {
            console.log("timed out ... retrying");
            /* at this point, we have timed out, try again and return a new promise which will take over the old one if it fails */
        /*    return new Promise(function (resolve, reject) {
                setTimeout(resolve, 2000);
                setTimeout(reject, 4000);
            });
        });
        reqDBPromise.then(function () {
          $('#reqList').DataTable({
                   scrollY: '370px'
                 });
                 $("#loader").hide();
                
        }, function () {
            console.log("[FAIL] reqDBPromise Promise failed");
        });  */
        
      /*  setTimeout(function () {
          $(function () {
            $('#reqList').DataTable({
              scrollY: '370px',
              responsive: true
            }); 
          });      
          $("#loader").hide();
        }, 1500); */
    //setTimeout(this.getReqLists(this.status), 1500);
  }

  ngAfterViewInit() {
    
    //this.getReqLists(this.status); 
     
  }

  openDialogViewJd(reqId): void {
  
    const dialogRef = this.dialog.open(ViewrequisitionComponent, {
      width: '1100px',
      height:'900px',
      data: {ReqId: reqId}      
    });
    
    dialogRef.afterClosed().subscribe(result => {

    });    
  }

  actionMethod(i) { 
    $("#showmenu"+i).show();
    $(document).on("click", function(event){
      var $trigger = $(".dropdown");
      if($trigger !== event.target && !$trigger.has(event.target).length){
          $(".dropdown-menu").slideUp("fast");
      }            
   });
  }
  
  priorityMethod(i) { 
    $("#showprioritymenu"+i).show();
    $(document).on("click", function(event){
      var $trigger = $(".dropdown");
      if($trigger !== event.target && !$trigger.has(event.target).length){
          $(".dropdown-menu").slideUp("fast");
      }            
   });
  }

  changePriority(Reqpriority,key){
   
    if(Reqpriority == "H"){            
      this.icon  = "arrow_upwards";      
      this.menu1 = "Change to Low";
      this.menu2 = "Change to Neutral";
      this.priority1 = "L";
      this.priority2 = "N";
     }
     if(Reqpriority == "L"){           
      this.icon = "arrow_downward";
      this.menu1 = "Change to High";
      this.menu2 = "Change to Neutral";
      this.priority1 = "H";
      this.priority2 = "N";
     }
     if(Reqpriority == "N"){    
      this.icon = "more_horiz";
      this.menu1 = "Change to High";
      this.menu2 = "Change to Low";
      this.priority1 = "H";
      this.priority2 = "L";
     }
    
     $("#changeIcon"+key).text(this.icon);
     $("#Menu1"+key).text(this.menu1);
     $("#Menu2"+key).text(this.menu2);
    
  }

 getAssessmentCount(reqId){
   
  this.ReqDashboardServices.getAssessmentcount(reqId).subscribe(
    response => {   
          
      if (response != "No data") {          
        let getMessage =  response['Message'].split(":");
        if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
          this.message = getMessage['1'];
          this.openSnackBar(); 
        }
        else {                     
         this.assessmentCount = response['Data']; 
        }    
          
      } else {
       console.log("something is wrong with Service Execution"); 
      }
    },
    error => console.log(error)      
  );
 }

  getReqLists(status) { 

    $("#loader").show();

    var cStage = status;
      
    $(document).ready(function() { 
      $('select option[value="'+cStage+'"]').attr("selected",true);  
    });
       
    if(status == 'OP')
    this.manageRedirect=true;
    else
    this.manageRedirect=false;

    //$('select option[value="'+status+'"]').attr("selected",true);
    this.routerObj.navigate(['req-dashboard/',status]);
   // const myNumber = Observable.interval(1000);
 
    this.ReqDashboardServices.getReqList(status).subscribe(
      response => {   
            
        if (response != "No data") {          
          let getMessage =  response['Message'].split(":");
          if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
            this.message = getMessage['1'];
            this.openSnackBar(); 
          }
          else {                     
           this.reqList = response['Data']; 
                
            for (let i = 0; i < response['Data'].length; i++) {            
              this.changePriority(response['Data'][i]['Reqpriority'],i);
            }                    
            response['Data'].forEach(item => {
             item.totalCount = (item.Sourcing+item.Screening+item.Assessment+item.HRRound+item.Offered+item.Joined+item.NotHired);    
             item.sourcePerc =  Math.round((item.Sourcing/item.totalCount) *100);   
             item.screeningPerc =  Math.round((item.Screening/item.totalCount) *100);   
             item.assessmentPerc =  Math.round((item.Assessment/item.totalCount) *100);   
             item.hrPerc =  Math.round((item.HRRound/item.totalCount) *100);   
             item.offeredPerc =  Math.round((item.Offered/item.totalCount) *100);   
             item.joinedPerc =  Math.round((item.Joined/item.totalCount) *100);   
             item.nothiredPerc =  Math.round((item.NotHired/item.totalCount) *100);   
            });

            setTimeout(function () {             
                $(function () {
                  const table: any = $('table');
                  this.dataTable = table.DataTable();
                });                
              $("#loader").hide();
            }, 1500);
            
          }    
            
        } else {
         console.log("something is wrong with Service Execution"); 
        }
      },
      error => console.log(error)      
    );
  
  }

  getReqListsOnChange(status) { 
    $("#loader").show();
    this.route.params.subscribe(params => {
      this.status = params['status'];      
    });

    if(status == 'OP')
    this.manageRedirect=true;
    else
    this.manageRedirect=false;
    
    $('select option[value="'+status+'"]').attr("selected",true);
    this.routerObj.navigate(['req-dashboard/',status]);
    this.ReqDashboardServices.getReqList(status).subscribe(
      response => {
        $('#reqList').DataTable().clear().destroy();
        if (response != "No data") {          
          let getMessage =  response['Message'].split(":");
          if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
            this.message = getMessage['1'];
            this.openSnackBar(); 
          }
          else {                  
              
            this.reqList = response['Data'];          
            for (let i = 0; i < response['Data'].length; i++) {            
              this.changePriority(response['Data'][i]['Reqpriority'],i);
            }    
            response['Data'].forEach(item => {
              item.totalCount = (item.Sourcing+item.Screening+item.Assessment+item.HRRound+item.Offered+item.Joined+item.NotHired);    
              item.sourcePerc =  Math.round((item.Sourcing/item.totalCount) *100);   
              item.screeningPerc =  Math.round((item.Screening/item.totalCount) *100);   
              item.assessmentPerc =  Math.round((item.Assessment/item.totalCount) *100);   
              item.hrPerc =  Math.round((item.HRRound/item.totalCount) *100);   
              item.offeredPerc =  Math.round((item.Offered/item.totalCount) *100);   
              item.joinedPerc =  Math.round((item.Joined/item.totalCount) *100);   
              item.nothiredPerc =  Math.round((item.NotHired/item.totalCount) *100);   
             });                
          }          
          
          setTimeout(function () {             
            $(function () {
              const table: any = $('table');
              this.dataTable = table.DataTable();
            });                
          $("#loader").hide();
          }, 1500); 

          /*setTimeout(function () {
            $(function () {
              $('#reqList').DataTable({
                scrollY: '370px'
              }); 
            });      
            $("#loader").hide();
          }, 1500);    */
         
    
        } else {
         console.log("something is wrong with Service Execution"); 
        }
      },
      error => console.log(error)
      
    );
  }

  export() {
    console.log(this.reqList);
    //this.SharedService.exportExcel(this.reqList['Data'][0], 'requisitionsCV');
  }

  updatePriority(priority,reqId,key){
    this.ReqDashboardServices.updatepriority(priority,reqId).subscribe(
      response => {
        if (response != "No data") {
          let getMessage =  response['Message'].split(":");
            if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
              this.message = getMessage['1'];
              this.openSnackBar(); 
            }
            else {             
              if (getMessage['0'] == "200") {  
                this.message = getMessage['1'];
                this.openSnackBar(); 
                $("#showprioritymenu"+key).hide();
                this.changePriority(priority,key);              
              }   
            }
        }
        else {
          console.log("something is wrong with Service Execution"); 
          }
        },
      error => console.log(error)
    );
  }

  
  viewJD(reqId) {
    console.log(reqId)
    let RefId = sessionStorage.getItem("RefId");

    sessionStorage.setItem('Entityid', RefId);
    sessionStorage.setItem('RequisitionId', reqId);
    console.log(RefId)
    
    this.openDialogJD();
  }

  openDialogJD(): void {
    const dialogRef = this.dialog.open(DocviewjdComponent, {
      width: '900px',
      // data: {fileName: fileName}      
    });    
  }
}
