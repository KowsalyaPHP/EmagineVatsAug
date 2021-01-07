import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { SearchService } from './search.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup;
  SearchList = [];
  showName: boolean = true;
  showMobileNo: boolean = false;
  showEmailId: boolean = false;
  showCandidateId: boolean = false;
  showApplicationId: boolean = false;
  checkData="Name";
  searchSelected: any;
  submitted: boolean = false;
  primaryinfoDetails:any;
  attachment:any;
  showSearchData: boolean = true;
  showApplicationInfo: boolean = false;

  constructor(private routerObj: Router, private SearchServices: SearchService, private formBuilderObj: FormBuilder, private route: ActivatedRoute, public dialogRef: MatDialogRef<SearchComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.searchForm = this.formBuilderObj.group({
      SearchData: ''
    });

    this.searchSelected = 'Name';
  //  $("#searchapplication").show();
    //$("#applicationinfo").hide();
  }

  ngOnInit() {
    setTimeout(function () {
      $(function () {
        $('#SearchList').DataTable({
        });
      });
      $("#loader").hide();
    }, 1500);
  }

  
  changeTextBox(val) {
    this.checkData = val;
    this.showName = false;
    this.showMobileNo = false;
    this.showEmailId = false;
    this.showCandidateId = false;
    this.showApplicationId = false;

    if (val == "Name") {
      this.showName = true;
    }
    else if (val == "MobileNo") {
      this.showMobileNo = true;
    }
    else if (val == "EmailId") {
      this.showEmailId = true;
    }
    else if (val == "Candidateid") {
      this.showCandidateId = true;
    }
    else if (val == "ApplicationId") {
      this.showApplicationId = true;
    }
    this.searchForm.reset();
    // this.searchForm = this.formBuilderObj.group({
    //   SearchData: ''
    // });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  /*actionMethod(i) { 
    $(".dropdown-menu").fadeOut("fast");
    $("#showmenu"+i).show();
    $(document).on("click", function(event){
      var $trigger = $(".dropdown");
      if($trigger !== event.target && !$trigger.has(event.target).length){
          $(".dropdown-menu").fadeOut("fast");
      }            
   });
  }*/

  getSearchValue(formObj) {

    this.submitted = true;

    if (this.searchForm.invalid) {
      return;
    }

    $('#SearchList').DataTable().clear().destroy();

    this.SearchServices.getSearchDetails(formObj, this.checkData).subscribe(
      response => {
        if (response != "No data") {
          response['Data'].forEach(item => {
            for (let i = 0; i < response['Data'].length; i++) {
              if (response['Data'][i]['CurrentStage'] == 'SO') {
                response['Data'][i]['CurrentStageString'] = 'Sourcing';
              }
              else if (response['Data'][i]['CurrentStage'] == 'SC') {
                response['Data'][i]['CurrentStageString'] = 'Screening';
              }
              else if (response['Data'][i]['CurrentStage'] == 'AS') {
                response['Data'][i]['CurrentStageString'] = 'Assessment';
              }
              else if (response['Data'][i]['CurrentStage'] == 'HR') {
                response['Data'][i]['CurrentStageString'] = 'HR Round';
              }
              else if (response['Data'][i]['CurrentStage'] == 'OF') {
                response['Data'][i]['CurrentStageString'] = 'Offered';
              }
              else if (response['Data'][i]['CurrentStage'] == 'JO') {
                response['Data'][i]['CurrentStageString'] = 'Joined';
              }
              else if (response['Data'][i]['CurrentStage'] == 'CR') {
                response['Data'][i]['CurrentStageString'] = 'Client reject';
              }
              else if (response['Data'][i]['CurrentStage'] == 'IR') {
                response['Data'][i]['CurrentStageString'] = 'Internal reject';
              }

              if (response['Data'][i]['RequisitionStatus'] == 'OP') {
                response['Data'][i]['RequisitionStatusString'] = 'Open';
              }
              else if (response['Data'][i]['RequisitionStatus'] == 'DR') {
                response['Data'][i]['RequisitionStatusString'] = 'Draft';
              }
              else if (response['Data'][i]['RequisitionStatus'] == 'HO') {
                response['Data'][i]['RequisitionStatusString'] = 'On Hold';
              }
              else if (response['Data'][i]['RequisitionStatus'] == 'AR') {
                response['Data'][i]['RequisitionStatusString'] = 'Archive';
              }
            }
          })
          this.SearchList = response['Data'];
          setTimeout(function () {
            $(function () {
              $('#SearchList').DataTable({
              });
            });
            $("#loader").hide();
          }, 1500);
        } else {
          console.log("something is wrong with Service Execution");
        }
      });
  }

  backManageApplication(){
    setTimeout(function () {
      $(function () {
        $('#SearchList').DataTable({
        });
      });
      $("#loader").hide();
    }, 1500);
    this.showSearchData = true;
    this.showApplicationInfo=false;
  }

  downloadCV(reqId,CandId,AppId) {

    this.SearchServices.downloadCVLink(reqId,CandId,AppId).subscribe(
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
    
  }

  downLoadFile(data: any) {    
    let contenType = data.headers.get("content-type");
    let contdisp = data.headers.get("content-disposition").split("=");
    let fileName = contdisp[1].trim();
    let blob = new Blob([data._body], {  type: contenType });  
    let file = new File([blob], fileName, { type: contenType});
    saveAs(file);
  }

  getApplicationInfos(reqId,candidateId,applicationId) {

    this.SearchServices.getPrimaryInfo(reqId,candidateId,applicationId).subscribe(
      response => {
        if (response != '') {         

          this.showSearchData = false;
          this.showApplicationInfo=true;

          $("#searchapplication").hide();
          //$("#applicationinfo").css("display", "block")
          $("#applicationinfo").show();     
          response['Data'].forEach(item => {
            for (let i = 0; i < response['Data'].length; i++) {                  
              if(response['Data'][i]['Currentstage_CV'] == 'SO')
              {
                response['Data'][i]['Currentstage_CV'] = 'Sourcing';
              }
              else if(response['Data'][i]['Currentstage_CV'] == 'SC')
              {
                response['Data'][i]['Currentstage_CV'] = 'Screening';
              }
              else if(response['Data'][i]['Currentstage_CV'] == 'AS')
              {
                response['Data'][i]['Currentstage_CV'] = 'Assessment';
              }
              else if(response['Data'][i]['Currentstage_CV'] == 'HR')
              {
                response['Data'][i]['Currentstage_CV'] = 'HR Round';
              }
              else if(response['Data'][i]['Currentstage_CV'] == 'OF')
              {
                response['Data'][i]['Currentstage_CV'] = 'Offered';
              }
              else if(response['Data'][i]['Currentstage_CV'] == 'JO')
              {
                response['Data'][i]['Currentstage_CV'] = 'Joined';
              }
              else if(response['Data'][i]['Currentstage_CV'] == 'CR')
              {
                response['Data'][i]['Currentstage_CV'] = 'Client reject';
              }
              else if(response['Data'][i]['Currentstage_CV'] == 'IR')
              {
                response['Data'][i]['Currentstage_CV'] = 'Internal reject';
              }
            }               
          });

          this.primaryinfoDetails = response['Data']; 
          let getFileName =  this.primaryinfoDetails[0]['CvLink'].split("#$#");
          this.attachment = getFileName['1'];
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
} 

  validation_messages = {
    'SearchData': [
      { type: 'required', message: 'Please enter valid data' }
    ]
  }
}
