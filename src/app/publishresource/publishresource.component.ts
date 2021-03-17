import { Component, OnInit, Inject, ViewChild, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { PublishresourceService } from './publishresource.service';
import { MatSnackBar } from '@angular/material';
import { SharedService } from '../shared/shared.service';
import { PublishComponent } from '../publish/publish.component';
import { MatFormFieldControl, MatFormField, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatChipInputEvent } from '@angular/material';
import { environment } from 'src/environments/environment';
import { ReqDashboardService } from '../req-dashboard/req-dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../services/data.service';

declare var $: any

@Component({
  selector: 'app-publishresource',
  templateUrl: './publishresource.component.html',
  styleUrls: ['./publishresource.component.css']
})
export class PublishresourceComponent implements OnInit {

  publishParentlist = [];
  publishChildlist: any;
  publishOptionlist = [];
  publishUrl = environment.publishUrl;
  summaryCount:any;
  reqList:[];
  message:any;
  manageRedirect:boolean=false;

  constructor(private PublishresourceServices: PublishresourceService,private ReqDashboardServices: ReqDashboardService, public dialogRef: MatDialogRef<PublishresourceComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private toastr: ToastrService,private routerObj: Router, private dataService: DataService) {

    this.getPublishResource();

  }

  ngOnInit() {
  }

  actionMethod(i) {
    $(".dropdown-menu").fadeOut("fast");
    $("#option" + i).show();
    $(document).on("click", function (event) {
      var $trigger = $(".dropdown");
      if ($trigger !== event.target && !$trigger.has(event.target).length) {
        $(".dropdown-menu").fadeOut("fast");
      }
    });
  }

  openDialogpublish(): void {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(PublishComponent, {
      width: '1500px',
      height: '900px',
      data: { ReqId: this.data['ReqId'] ,reqTitle : this.data['reqTitle'], publishStatus : this.data['publishStatus']}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataService.changeReloadReqDashboard(true);
    });
  }

  openSnackBar() { 
    var x = document.getElementById("snackbar")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800);
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
   // this.routerObj.navigate(['req-dashboard/',status], { skipLocationChange: true });
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

           

            response['Data']['RequisitionDetail'].forEach(item => {
              for (let i = 0; i < response['Data']['RequisitionDetail'].length; i++) {                  
                if(response['Data']['RequisitionDetail'][i]['PublishStatus'] == 'P')
                {
                  response['Data']['RequisitionDetail'][i]['PublishStatusString'] = 'Published';
                }
                else if(response['Data']['RequisitionDetail'][i]['PublishStatus'] == 'YP')
                {
                  response['Data']['RequisitionDetail'][i]['PublishStatusString'] = 'Yet to be published';
                }
                else if(response['Data']['RequisitionDetail'][i]['PublishStatus'] == 'UP')
                {
                  response['Data']['RequisitionDetail'][i]['PublishStatusString'] = 'UnPublished';
                }               
              }            
            });

            this.reqList = response['Data']['RequisitionDetail']; 
            
            this.summaryCount = response['Data']['SummeryCount'];

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

            let cols = [9, 10, 11, 12, 13, 14, 15, 16, 17];
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



  getPublishResource() {
    this.PublishresourceServices.getPublishResource().subscribe(
      response => {
        if (response != '') {
          this.publishParentlist = response['Data']['PrimaryResourceList'];
          //this.publishChildlist = response['Data']['ResourceList']; 
          this.publishOptionlist = response['Data']['OptionsList'];

          var optiongroups = response['Data']['OptionsList'].reduce(function (obj, item) {
            obj[item.ResourceName] = obj[item.ResourceName] || [];
            obj[item.ResourceName].push({ SourceId: item.SourceId, SourceName: item.SourceName, ResourceId: item.ResourceId, ResourceName: item.ResourceName, OptionsId: item.OptionsId, OptionsName: item.OptionsName });
            return obj;
          }, {});

          this.publishOptionlist = Object.keys(optiongroups).map(function (key) {
            return { SourceId: optiongroups[key][0]['SourceId'], SourceName: optiongroups[key][0]['SourceName'], ResourceName: key, ResourceId: optiongroups[key][0]['ResourceId'], optionGroupList: optiongroups[key] };
          });

          var Childgroups = this.publishOptionlist.reduce(function (obj, item) {
            obj[item.SourceName] = obj[item.SourceName] || [];
            obj[item.SourceName].push({ SourceId: item.SourceId, SourceName: item.SourceName, ResourceId: item.ResourceId, ResourceName: item.ResourceName, optionGroupList: item.optionGroupList });
            return obj;
          }, {});


          this.publishChildlist = Object.keys(Childgroups).map(function (key) {
            return { SourceName: key, SourceId: Childgroups[key][0]['SourceId'], ChildGroupList: Childgroups[key] };
          });

          //console.log(this.publishOptionlist)
          console.log(this.publishChildlist)
        }
        else {
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }

  getOpenLink(resName, resId) {
    let postUrlLinkedIn = "https://www.linkedin.com/shareArticle/?mini=true&url=";
    let postUrlFB = "https://www.facebook.com/sharer/sharer.php?u=";
    let postUrlTwitter = "https://twitter.com/home?status=";
    if (resName == "Facebook") {
      return postUrlFB + encodeURIComponent(this.publishUrl + this.data['ReqId'] + "/" + resId);
    }
    else if (resName == "Linked In ") {
      return postUrlLinkedIn + encodeURIComponent(this.publishUrl + this.data['ReqId'] + "/" + resId);
    }
    else if (resName == "Twitter") {
      return postUrlTwitter + encodeURIComponent(this.publishUrl + this.data['ReqId'] + "/" + resId);
    }
  }

  copied(e) {
    this.toastr.success('Copied!');
  }

  closeMenu() {
    $(".dropdown-menu").hide();
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
