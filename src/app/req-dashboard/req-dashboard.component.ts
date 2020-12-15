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
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-req-dashboard',
  templateUrl: './req-dashboard.component.html',
  styleUrls: ['./req-dashboard.component.css']
})
export class ReqDashboardComponent implements OnInit {

  reqList:[];
  assessmentCount:[];
  //icon: string[] = []
  message:any;
  /*icon:any;
  menu1:any;
  menu2:any;
  priority3:any;
  priority4:any;
  priority1:any;
  priority2:any;
  low:any
  low1:any
  low2:any
  high:any;
  high1:any;
  high2:any;
  nuetral:any;
  nuetral1:any;
  nuetral2:any;*/
  changeIcon:any;
  status:any;
  id:any;
  manageRedirect:boolean=false;
  dataTable: any;
  clientList:any;
  summaryCount:any;
  functionList:any;
  funclist:any;

  constructor(private route: ActivatedRoute,private routerObj: Router,private SharedServices: SharedService,private ReqDashboardServices: ReqDashboardService,public dialog: MatDialog,private _snackBar: MatSnackBar){
    this.route.params.subscribe(params => {
      this.status = params['status']; 
    });

  

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

  downLoadFile(data: any) {    
    let contenType = data.headers.get("content-type");
    let contdisp = data.headers.get("content-disposition").split("=");
    let fileName = contdisp[1].trim();
    let blob = new Blob([data._body], {  type: contenType });  
    let file = new File([blob], fileName, { type: contenType});
    saveAs(file);
  }

 /* downloadJD(reqId) {

    this.ReqDashboardServices.downloadJDLink(reqId).subscribe(
      response => {
        if (response != '') {         
          this.downLoadFile(response);      
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
    
  }*/


  getAccessableClientList() {
    this.SharedServices.getAccessableClientList().subscribe(
      response => {
        if (response != '') {      
          this.clientList = response["ClientList"];       
          sessionStorage.setItem("ClientList", response["ClientList"]);
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  } 
  

  ngOnInit() {
    
    this.funclist = sessionStorage.getItem("FunctionList");      
    if(typeof(this.funclist) != 'object')
    this.functionList = this.funclist.split(',');
    
    this.getAccessableClientList();

    setTimeout(() => {
      this.getReqLists(this.status);
      }
      , 1500);
     
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
    $(".dropdown-menu").fadeOut("fast");
    $("#showmenu"+i).show();
    $(document).on("click", function(event){
      var $trigger = $(".dropdown");
      if($trigger !== event.target && !$trigger.has(event.target).length){
          $(".dropdown-menu").fadeOut("fast");
      }            
   });
  }
  
  priorityMethod(i) { 
     $(".dropdown-menu").fadeOut("fast");
    $("#showprioritymenu"+i).show();
    $(document).on("click", function(event){
      var $trigger = $(".dropdown");
      if($trigger !== event.target && !$trigger.has(event.target).length){
          $(".dropdown-menu").fadeOut("fast");
      }            
   });
  }

  changePriority(Reqpriority,key){
    this.route.params.subscribe(params => {
      this.status = params['status']; 
    });
    // this.getReqLists(this.status);

  // console.log(Reqpriority);
  /* this.reqList.forEach(item => {
    if(Reqpriority == "H"){  
      item['Reqpriority'] == "H"
    }
    if(Reqpriority == "L"){  
      item['Reqpriority'] == "L"
    }
    if(Reqpriority == "N"){  
      item['Reqpriority'] == "N"
    }
    console.log(item['Reqpriority'])   
   });      
  
   
    if(Reqpriority == "H"){           
      this.high = true;
      this.low = false;
      this.nuetral = false;
      this.icon  = "arrow_upwards";      
      this.menu1 = "Change to Low";
      this.menu2 = "Change to Neutral";
      this.high1 = "L";
      this.high2 = "N";
      
    /* $("#changeIcon"+key).text(this.icon);
     $("#Menu1"+key).text(this.menu1);
     $("#Menu2"+key).text(this.menu2);
     }
     if(Reqpriority == "L"){  
      this.low = true;
      this.high = false;  
      this.nuetral = false;       
      this.icon = "arrow_downward";
      this.priority1 = "Change to High";
      this.priority2 = "Change to Neutral";
      this.low1 = "H";
      this.low2 = "N";
      
     $("#changeIcon"+key).text(this.icon);
     $("#Menu1"+key).text(this.priority1);
     $("#Menu2"+key).text(this.priority2);
     }
     if(Reqpriority == "N"){  
      this.nuetral = true;  
      this.high = false;
      this.low = false;
      this.icon = "more_horiz";
      this.priority3 = "Change to High";
      this.priority4 = "Change to Low";
      this.nuetral1 = "H";
      this.nuetral2 = "L";
      
    /* $("#changeIcon"+key).text(this.icon);
     $("#Menu1"+key).text(this.priority3);
     $("#Menu2"+key).text(this.priority4);
     }
     */
    
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
            this.reqList = [];
            this.message = getMessage['1'];
            this.openSnackBar(); 
            this.reqDashboardDataTable();
          }
          else {                     
           
           /* for (let i = 0; i < response['Data'].length; i++) {            
              this.changePriority(response['Data'][i]['Reqpriority'],i);
            }   */                 
            response['Data']['RequisitionDetail'].forEach(item => {
             item.totalCount = (item.Sourcing+item.Screening+item.Assessment+item.HRRound+item.Offered+item.Joined+item.CR+item.IR);    
             item.sourcePerc =  Math.round((item.Sourcing/item.totalCount) *100);   
             item.screeningPerc =  Math.round((item.Screening/item.totalCount) *100);   
             item.assessmentPerc =  Math.round((item.Assessment/item.totalCount) *100);   
             item.hrPerc =  Math.round((item.HRRound/item.totalCount) *100);   
             item.offeredPerc =  Math.round((item.Offered/item.totalCount) *100);   
             item.joinedPerc =  Math.round((item.Joined/item.totalCount) *100);   
             item.CRPerc =  Math.round((item.CR/item.totalCount) *100);   
             item.IRPerc =  Math.round((item.IR/item.totalCount) *100);   
            });

            this.reqList = response['Data']['RequisitionDetail']; 
            this.summaryCount = response['Data']['SummeryCount'];  
            console.log(this.summaryCount)           
            this.reqDashboardDataTable();  
          }    
        } else {
         console.log("something is wrong with Service Execution"); 
        }
      },
      error => console.log(error)      
    );
  
  }

  reqDashboardDataTable(){
    $('#reqList').DataTable().clear().destroy();
    setTimeout(function () {
      $(function () {
        const table: any = $('#reqList');
        // table.DataTable().clear().destroy();
        this.dataTable = table.DataTable({
          "footerCallback": function (row, data, start, end, display) {
            var api = this.api(), data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
              let val = "0";
              if (typeof i === 'string') {
                val = i.trim();
                let htmlObj = $(i);
                let length = htmlObj.length;

                for (var k = 0; k < length; k++) {
                  let ele = htmlObj[k];
                  if (ele) {
                    if (ele.classList && ele.classList.contains("statuscolor")) {
                      val = ele.innerText.trim();
                      break;
                    }
                  }
                }
                return parseInt(val) * 1;
              }
              else {
                return i;
              }
              // return typeof i === 'string' ?
              //     i.replace(/[\$,]/g, '')*1 :
              //     typeof i === 'number' ?
              //         i : 0;
            };

            let cols = [8, 9, 10, 11, 12, 13, 14, 15, 16];
            // Total over all pages
            cols.forEach(function (col) {
              let total = api
                .column(col)
                .data()
                .reduce(function (a, b) {
                  return intVal(a) + intVal(b);
                }, 0);

              // Total over this page
              let pageTotal = api
                .column(col, { page: 'current' })
                .data()
                .reduce(function (a, b) {
                  return intVal(a) + intVal(b);
                }, 0);

              // Update footer
              let searchVal = $('.dataTables_filter input').val();
              if (searchVal) {
                $(api.column(col).footer()).html(
                  pageTotal
                );
              } else {
                $(api.column(col).footer()).html(
                  total
                );
              }
            });



          }
        });
        // let dt = this.dataTable;
        // dt.on( 'search.dt', function (e) {
        //   console.log( $('.dataTables_filter input').val());
        // });
      });
      $("#loader").hide();
    }, 100);
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
        // $('#reqList').DataTable().clear().destroy();
        if (response != "No data") {          
          let getMessage =  response['Message'].split(":");
          if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
            this.message = getMessage['1'];
            this.openSnackBar();
            this.reqDashboardDataTable(); 
            this.reqList = [];
          }
          else {                  
              
                 
            for (let i = 0; i < response['Data']['RequisitionDetail'].length; i++) {            
              this.changePriority(response['Data']['RequisitionDetail'][i]['Reqpriority'],i);
            }    
            response['Data']['RequisitionDetail'].forEach(item => {
              item.totalCount = (item.Sourcing+item.Screening+item.Assessment+item.HRRound+item.Offered+item.Joined+item.CR+item.IR);    
              item.sourcePerc =  Math.round((item.Sourcing/item.totalCount) *100);   
              item.screeningPerc =  Math.round((item.Screening/item.totalCount) *100);   
              item.assessmentPerc =  Math.round((item.Assessment/item.totalCount) *100);   
              item.hrPerc =  Math.round((item.HRRound/item.totalCount) *100);   
              item.offeredPerc =  Math.round((item.Offered/item.totalCount) *100);   
              item.joinedPerc =  Math.round((item.Joined/item.totalCount) *100);
              item.CRPerc =  Math.round((item.CR/item.totalCount) *100);   
              item.IRPerc =  Math.round((item.IR/item.totalCount) *100);      
             });                

             this.reqList = response['Data']['RequisitionDetail'];
             this.summaryCount = response['Data']['SummeryCount'];  
             this.reqDashboardDataTable();    
          }          
          
          // setTimeout(function () {             
          //   $(function () {
          //     const table: any = $('table');
          //     this.dataTable = table.DataTable();
          //   });                
          // $("#loader").hide();
          // }, 1500); 

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
               this.getReqLists(this.status);            
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
