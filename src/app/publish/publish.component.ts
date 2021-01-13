import { Component, OnInit, Inject, ViewChild, Input, Output, EventEmitter, TemplateRef } from '@angular/core';

import { Router, ActivatedRoute } from "@angular/router";
import { PublishService } from './publish.service';
import { MatFormFieldControl, MatFormField, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatChipInputEvent, MatSnackBar } from '@angular/material';
import { SharedService } from '../shared/shared.service';
import { PublishresourceComponent } from '../publishresource/publishresource.component';
import { ReqDashboardService } from '../req-dashboard/req-dashboard.service';
import { DataService } from '../services/data.service';
declare var $: any

interface Vendor {
  VendorId: any;
  VendorName: string;
  VendorTier: any;
  P_Status?: boolean;
}

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {

  allVendorList: [];
  public allvendorBronze: Vendor[];
  public allvendorSilver: Vendor[];
  public allvendorGold: Vendor[];
  public allvendorPlatinum: Vendor[];
  id: any;
  bronzeCategory: any;
  silverCategory: any;
  goldCategory: any;
  platinumCategory: any;
  bronzeVendorId: any;
  silverVendorId: any;
  goldVendorId: any;
  platinumVendorId: any;
  allVendorId: string = '';
  message1: any;
  selectVendor: boolean = false;
  selectedAll: boolean = false;
  selectedBronze: boolean = false;
  selectedSilver: boolean = false;
  selectedGold: boolean = false;
  selectedPlatinum: boolean = false;
  searchText: any;
  summaryCount:any;
  reqList:[];
  message:any;
  manageRedirect:boolean=false;
  checkedBronze:any;
  checkedSilver:any;
  checkedGold:any;
  checkedPlatinum:any;
  
  constructor(private PublishServices: PublishService,private ReqDashboardServices: ReqDashboardService, public dialogRef: MatDialogRef<PublishComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private routerObj: Router, private route: ActivatedRoute, private dataService: DataService) {
    this.getAllVendorLists();
  }

  ngOnInit() {

    $(document).ready(function () {


      var triggers = $('ul.alphabet li a');


      triggers.click(function () {
        var filters = $('ul.medical_dictionary li strong');
        var takeLetter = $(this).text();

        filters.parent().hide();

        filters.each(function (i) {

          var compareFirstLetter = $(this).text().substr(0, 1);

          if (compareFirstLetter == takeLetter) {
            $(this).parent().fadeIn(222);
          }

          //problem on detecting empty one. Press 'B' for example.
          //i can reach manually but this way is useless
          if (takeLetter === 'B') { console.log('There is no result.'); }
        });

      });
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getAllVendorLists() {

    this.PublishServices.getAllVendorList(this.data['ReqId']).subscribe(
      response => {
        if (response != '') {
          this.allVendorList = response['Data'];

          /* for (let i = 0; i < this.allVendorList['BronzeCategory'].length; i++) {                 
             if(this.allVendorList['BronzeCategory'][i]['P_Status'] == 'P')
             {
               this.allVendorList['BronzeCategory'][i].checked = true;
             }
           }               
           for (let i = 0; i < this.allVendorList['SilverCategory'].length; i++) {                 
             if(this.allVendorList['SilverCategory'][i]['P_Status'] == 'P')
             {
               this.allVendorList['SilverCategory'][i].checked = true;
             }
           }   
           for (let i = 0; i < this.allVendorList['GoldCategory'].length; i++) {                 
             if(this.allVendorList['GoldCategory'][i]['P_Status'] == 'P')
             {
               this.allVendorList['GoldCategory'][i].checked = true;
             }
           } 
           for (let i = 0; i < this.allVendorList['PlatinumCategory'].length; i++) {                 
             if(this.allVendorList['PlatinumCategory'][i]['P_Status'] == 'P')
             {
               this.allVendorList['PlatinumCategory'][i].checked = true;
             }
           } */
          this.allvendorBronze = this.allVendorList['BronzeCategory'];
          this.allvendorSilver = this.allVendorList['SilverCategory'];
          this.allvendorGold = this.allVendorList['GoldCategory'];
          this.allvendorPlatinum = this.allVendorList['PlatinumCategory'];
          this.allvendorBronze.forEach(v => {
            if (v.P_Status == <any>"False") {
              v.P_Status = false;
            }
            else if (v.P_Status == <any>"True") {
              v.P_Status = true;
            }
          });
          this.allvendorSilver.forEach(v => {
            if (v.P_Status == <any>"False") {
              v.P_Status = false;
            }
            else if (v.P_Status == <any>"True") {
              v.P_Status = true;
            }
          });
          this.allvendorGold.forEach(v => {
            if (v.P_Status == <any>"False") {
              v.P_Status = false;
            }
            else if (v.P_Status == <any>"True") {
              v.P_Status = true;
            }
          });
          this.allvendorPlatinum.forEach(v => {
            if (v.P_Status == <any>"False") {
              v.P_Status = false;
            }
            else if (v.P_Status == <any>"True") {
              v.P_Status = true;
            }
          });

          this.changeItem('Bronze');
          this.changeItem('Silver');
          this.changeItem('Gold');
          this.changeItem('Platinum');
        }
        else {
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }

  changeCategory(category, SelectedorNot) {
    console.log(category)
    console.log(SelectedorNot)

    if (category == "All") {
      for (let i = 0; i < this.allvendorBronze.length; i++) {
        this.allvendorBronze[i]['P_Status'] = SelectedorNot;
      }
      for (let i = 0; i < this.allvendorSilver.length; i++) {
        this.allvendorSilver[i]['P_Status'] = SelectedorNot;
      }
      for (let i = 0; i < this.allvendorGold.length; i++) {
        this.allvendorGold[i]['P_Status'] = SelectedorNot;
      }
      for (let i = 0; i < this.allvendorPlatinum.length; i++) {
        this.allvendorPlatinum[i]['P_Status'] = SelectedorNot;
      }
      this.selectedBronze = SelectedorNot;
      this.selectedSilver = SelectedorNot;
      this.selectedGold = SelectedorNot;
      this.selectedPlatinum = SelectedorNot;
    }
    else if (category == "Bronze") {
      for (let i = 0; i < this.allvendorBronze.length; i++) {
        this.allvendorBronze[i]['P_Status'] = SelectedorNot;
      }
    }
    else if (category == "Silver") {
      for (let i = 0; i < this.allvendorSilver.length; i++) {
        this.allvendorSilver[i]['P_Status'] = SelectedorNot;
      }
    }
    else if (category == "Gold") {
      for (let i = 0; i < this.allvendorGold.length; i++) {
        this.allvendorGold[i]['P_Status'] = SelectedorNot;
      }
    }
    else if (category == "Platinum") {
      for (let i = 0; i < this.allvendorPlatinum.length; i++) {
        this.allvendorPlatinum[i]['P_Status'] = SelectedorNot;
      }
    }

    this.selectedAll = this.selectedBronze && this.selectedSilver && this.selectedGold && this.selectedPlatinum ? true : false;

    this.checkedBronze = this.allvendorBronze.filter(f => f.P_Status == true).length;
    this.checkedSilver = this.allvendorSilver.filter(f => f.P_Status == true).length;
    this.checkedGold = this.allvendorGold.filter(f => f.P_Status == true).length;
    this.checkedPlatinum = this.allvendorPlatinum.filter(f => f.P_Status == true).length;
    
  }

  changeItem(category) {
    if (category == 'Bronze') {
      let items = this.allvendorBronze.filter(v => v.P_Status == false);
      if (items && items.length > 0) {
        this.selectedAll = false;
        this.selectedBronze = false;
      }
      else {
        this.selectedBronze = true;
      }
    }
    else if (category == 'Silver') {
      let items = this.allvendorSilver.filter(v => v.P_Status == false);
      if (items && items.length > 0) {
        this.selectedAll = false;
        this.selectedSilver = false;
      }
      else {
        this.selectedSilver = true;
      }
    }
    else if (category == 'Gold') {
      let items = this.allvendorGold.filter(v => v.P_Status == false);
      if (items && items.length > 0) {
        this.selectedAll = false;
        this.selectedGold = false;
      }
      else {
        this.selectedGold = true;
      }
    }
    else if (category == 'Platinum') {
      let items = this.allvendorPlatinum.filter(v => v.P_Status == false);
      if (items && items.length > 0) {
        this.selectedAll = false;
        this.selectedPlatinum = false;
      }
      else {
        this.selectedGold = true;
      }
    }

   
    this.checkedBronze = this.allvendorBronze.filter(f => f.P_Status == true).length;
    this.checkedSilver = this.allvendorSilver.filter(f => f.P_Status == true).length;
    this.checkedGold = this.allvendorGold.filter(f => f.P_Status == true).length;
    this.checkedPlatinum = this.allvendorPlatinum.filter(f => f.P_Status == true).length;

    let allItems = [];
    allItems = this.allvendorBronze.filter(f => f.P_Status == false);
    allItems = allItems.concat(this.allvendorSilver.filter(f => f.P_Status == false));
    allItems = allItems.concat(this.allvendorGold.filter(f => f.P_Status == false));
    allItems = allItems.concat(this.allvendorPlatinum.filter(f => f.P_Status == false));
    if (allItems && allItems.length > 0) {
      this.selectedAll = false;
    }
    else {
      this.selectedAll = true;
    }
  }

  checkallBronzevendor() {

    for (let i = 0; i < this.allVendorList['BronzeCategory'].length; i++) {

      this.allVendorList['BronzeCategory'][i].checked = true;
    }
  }
  checkallSilvervendor() {

    for (let i = 0; i < this.allVendorList['SilverCategory'].length; i++) {

      this.allVendorList['SilverCategory'][i].checked = true;
    }
  }
  checkallGoldvendor() {

    for (let i = 0; i < this.allVendorList['GoldCategory'].length; i++) {

      this.allVendorList['GoldCategory'][i].checked = true;
    }
  }
  checkallPlatinumvendor() {

    for (let i = 0; i < this.allVendorList['PlatinumCategory'].length; i++) {

      this.allVendorList['PlatinumCategory'][i].checked = true;
    }
  }
  openSnackBar() {
    var x = document.getElementById("publishsnackbar")
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3800);
  }

  openDialogPublish(reqId,ReqTitle): void {
    $(".dropdown-menu").hide();
    this.dialogRef.close();
    const dialogRef = this.dialog.open(PublishresourceComponent, {
      width: '700px',
      height:'700px',
      data: {ReqId: reqId,reqTitle: ReqTitle}      
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.dataService.changeReloadReqDashboard(true);
    });    
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
   // this.routerObj.navigate(['req-dashboard/',status]);
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


  addPublish() {

    this.bronzeCategory = this.allvendorBronze.filter(element => element.P_Status);
    this.silverCategory = this.allvendorSilver.filter(element => element.P_Status);
    this.goldCategory = this.allvendorGold.filter(element => element.P_Status);
    this.platinumCategory = this.allvendorPlatinum.filter(element => element.P_Status);
    
    this.bronzeVendorId = this.bronzeCategory.map(element => element.VendorId);
    this.silverVendorId = this.silverCategory.map(element => element.VendorId);
    this.goldVendorId = this.goldCategory.map(element => element.VendorId);
    this.platinumVendorId = this.platinumCategory.map(element => element.VendorId);

    if (this.bronzeVendorId.length > 0) {
      this.allVendorId = this.bronzeVendorId.join(',') + ',';
    }
    if (this.silverVendorId.length > 0) {
      this.allVendorId += this.silverVendorId.join(',') + ',';
    }
    if (this.goldVendorId.length > 0) {
      this.allVendorId += this.goldVendorId.join(',') + ',';
    }
    if (this.platinumVendorId.length > 0) {
      this.allVendorId += this.platinumVendorId.join(',') + ',';
    }

    if(this.allVendorId == ""){
      this.message1 = "Please select atleast one vendor to publish";
      this.openSnackBar();
      return;
    }

    this.PublishServices.reqAddPublish(this.data['ReqId'], this.allVendorId).subscribe(
      response => {
        if (response != '') {
          let getMessage = response['Message'].split(":");
          if (getMessage['0'] == "400" || getMessage['0'] == "500") {
            this.message1 = getMessage['1'];
            this.openSnackBar();
          }
          else {
            this.message1 = getMessage['1'];
            this.openSnackBar();
          
            //this.routerObj.navigate(["/req-dashboard"]);
          }
          // this.allVendorList = response['Data'];
        }
        else {
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }
  unPublish() {
    this.PublishServices.reqUnPublish(this.data['ReqId']).subscribe(
      response => {
        if (response != '') {
          let getMessage = response['Message'].split(":");
          if (getMessage['0'] == "400" || getMessage['0'] == "500") {
            this.message1 = getMessage['1'];
            this.openSnackBar();
          }
          else {
            this.message1 = getMessage['1'];
            this.openSnackBar();
            //this.routerObj.navigate(["/req-dashboard"]);           
          }
          // this.allVendorList = response['Data'];
        }
        else {
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }
}
