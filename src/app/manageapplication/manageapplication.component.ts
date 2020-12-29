import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ManageapplicationService } from './manageapplication.service';
import { MatFormFieldControl, MatFormField, MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatChipInputEvent } from '@angular/material';
import { ScreeningComponent } from '../screening/screening.component';
import { OfferComponent } from '../offer/offer.component';
import { NothiredComponent } from '../nothired/nothired.component';
import { SubstageComponent } from '../substage/substage.component';
import { DatePipe } from '@angular/common';
import { saveAs } from 'file-saver';
import {DocviewComponent} from '../docview/docview.component'
import {DocviewjdComponent} from '../docviewjd/docviewjd.component'
import { ViewrequisitionComponent } from '../viewrequisition/viewrequisition.component';
import { DownloadComponent } from '../download/download.component';
import { TemplateComponent } from '../template/template.component';
import { CvtransferComponent } from '../cvtransfer/cvtransfer.component';
declare var $: any

interface Applicationlist {
  ApplicationId: any;
  Candidate_FN: string;
  RelevantExperienceYYMM: string;
  EMailId: string;
  MobileNo: string;
  ExpectedSalary: string;
  PrSalaryTotal: string;
  NoticePeriod: string;
  PrLocation: string;
  EACManager: string;
  Date: string;
  Currentstage_CV: string;
  checked?: boolean;
}

@Component({
  selector: 'app-manageapplication',
  templateUrl: './manageapplication.component.html',
  styleUrls: ['./manageapplication.component.css']
})

export class ManageapplicationComponent implements OnInit {
 
  message:any;
  public StageValueList: Applicationlist[];
  StageValueCount:[];
  SubStageValueCount:[];
  requisitionDetails:[];  
  id:any;
  selectedApplication:any;
  selectedApplicationId:any;
  selectedCandidateId:any;
  selectedCandidate_FN:any;
  showall='true';
  shownothired='false';
  showjoinoffer= 'false';
  showalldashboard= 'false';
  currentstage:any;
  public positionLength:any;
  date:any;
  active:any;
  primaryinfoDetails:any;
  cvlogDetails:[];
  movement:any;
  attachment:any;
  clicked = 0;
  displayNoData =  false;
  selectedId:any;
  currentStageString =  false;
  currentString:any;

  constructor(private routerObj: Router,private ManageapplicationServices: ManageapplicationService,private route: ActivatedRoute,public dialog: MatDialog,private datePipe : DatePipe) { 
    
    this.route.params.subscribe(params => {
      this.id = params['id'];  
      this.currentstage = params['stage'];    
    });
  
    this.getDetails(this.id,this.currentstage);
  }

  ngOnInit() {
    setTimeout(function () {
      $(function () {
        $('#applicationDashboard').DataTable({
          scrollY: '360px'
        });    
        $("#loader").hide();
      });      
    }, 1500);    
    setTimeout(function () {
      $(function () {
        $('#joinofferDashboard').DataTable({
          scrollY: '360px'
        });               
      });      
      $("#loader").hide();
    }, 1500); 
    setTimeout(function () {
      $(function () {
        $('#nothiredDashboard').DataTable({
          scrollY: '360px'
          
        });               
      });      
      $("#loader").hide();
    }, 1500);  
    setTimeout(function () {
      $(function () {
        $('#allDashboard').DataTable({
          scrollY: '360px'
          
        });               
      });      
      $("#loader").hide();
    }, 1500);  

  }

  openSnackBar() { 
    var x = document.getElementById("snackbar")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800);
  }



  getApplicationInfos(reqId,candidateId,applicationId) {

      this.ManageapplicationServices.getPrimaryInfo(reqId,candidateId,applicationId).subscribe(
        response => {
          if (response != '') {         
              
            $("#manageapplication").hide();
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

      this.ManageapplicationServices.getcvlogInfo(reqId,candidateId,applicationId).subscribe(
        response => {
          if (response != '') {         
            response['Data'].forEach(item => {
              for (let i = 0; i < response['Data'].length; i++) {                  
                if(response['Data'][i]['CV_Stage'] == 'SO')
                {
                  response['Data'][i]['CV_Stage'] = 'Sourcing';
                }
                else if(response['Data'][i]['CV_Stage'] == 'SC')
                {
                  response['Data'][i]['CV_Stage'] = 'Screening';
                }
                else if(response['Data'][i]['CV_Stage'] == 'AS')
                {
                  response['Data'][i]['CV_Stage'] = 'Assessment';
                }
                else if(response['Data'][i]['CV_Stage'] == 'HR')
                {
                  response['Data'][i]['CV_Stage'] = 'HR Round';
                }
                else if(response['Data'][i]['CV_Stage'] == 'OF')
                {
                  response['Data'][i]['CV_Stage'] = 'Offered';
                }
                else if(response['Data'][i]['CV_Stage'] == 'JO')
                {
                  response['Data'][i]['CV_Stage'] = 'Joined';
                }
                else if(response['Data'][i]['CV_Stage'] == 'CR')
                {
                  response['Data'][i]['CV_Stage'] = 'Client reject';
                }
                else if(response['Data'][i]['CV_Stage'] == 'IR')
                {
                  response['Data'][i]['CV_Stage'] = 'Internal reject';
                }
              }               
            });
            this.cvlogDetails = response['Data'];
            $("#manageapplication").hide();
            $("#applicationinfo").show(); 
          }
          else {         
            console.log('something is wrong with Service  Execution');
          }
        },
        error => console.log("Error Occurd!")
      );
  }   

  backManageApplication(){
    $("#manageapplication").show();
    $("#applicationinfo").hide();  
  }

  downloadCV(reqId,CandId,AppId) {

    this.ManageapplicationServices.downloadCVLink(reqId,CandId,AppId).subscribe(
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

  source(reqId,CandId,AppId) {

    this.ManageapplicationServices.source(reqId,CandId,AppId).subscribe(
      response => {
        if (response != '') {         
          console.log(response)    
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
    
  }
  openDialogDownloadTracker(reqId,stage): void {
  
    this.selectedApplication = this.StageValueList.filter( (application) => application.checked ); 
    this.selectedApplicationId = this.selectedApplication.map(element => element.ApplicationId);
    this.selectedCandidateId = this.selectedApplication.map(element => element.CandidateId);
 
    if(this.selectedApplication.length < 1){
      this.message = "Please select atleast one candidate to track the resume.";
      this.openSnackBar();
      return;
    }

    if(this.selectedApplication.length > 25){
      this.message = "Only 25 CV's can be allow to track at a time.";
      this.openSnackBar();
      return;
    }
    
    const dialogRef = this.dialog.open(DownloadComponent, {
      width: '900px',
      height:'900px',
      data: {ReqId: reqId,Stage:stage,AppId: this.selectedApplication}      
    });
    
    dialogRef.afterClosed().subscribe(result => {

    });    
  }
  
  openDialogCvTransfer(reqId): void {
  
    this.selectedApplication = this.StageValueList.filter( (application) => application.checked ); 
   
    this.selectedId = this.selectedApplication.map(({ CandidateId, ApplicationId }) => ({CandidateId, ApplicationId}));
  
    if(this.selectedApplication.length < 1){
      this.message = "Please select atleast one candidate to copy or transfer the cv.";
      this.openSnackBar();
      return;
    }

    const dialogRef = this.dialog.open(CvtransferComponent, {
      width: '500px',
      height: '220px',
      data: {ReqId: reqId,selectId:this.selectedId}      
    });

    this.route.params.subscribe(params => {
      this.id = params['id'];  
      this.currentstage = params['stage'];    
    });

    dialogRef.afterClosed().subscribe(result => {  
      if(result && result.action === 1) {
        this.getStageValuesOnChange(this.currentstage);
      }
    });    
  }

  openDialogTemplate(): void {
  
    const dialogRef = this.dialog.open(TemplateComponent, {
      width: '600px',
      height:'900px',
     // data: {ReqId: reqId,Stage:stage}      
    });
    
    dialogRef.afterClosed().subscribe(result => {

    });    
  }


  viewCV(reqId,CandId,AppId) {
    let RefId = sessionStorage.getItem("RefId");

    sessionStorage.setItem('Entityid', RefId);
    sessionStorage.setItem('RequisitionId', reqId);
    sessionStorage.setItem('CandidateId', CandId);
    sessionStorage.setItem('ApplicationId', AppId);
    this.openDialogCV();
  }
  
  openDialogCV(): void {

    const dialogRef = this.dialog.open(DocviewComponent, {
      width: '900px',
      // data: {fileName: fileName}      
    });

    
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

  viewJD(reqId) {
    
    let RefId = sessionStorage.getItem("RefId");
    sessionStorage.setItem('Entityid', RefId);
    sessionStorage.setItem('RequisitionId', reqId);    
    
    this.openDialogJD();
  }

  openDialogJD(): void {
    const dialogRef = this.dialog.open(DocviewjdComponent, {
      width: '900px',
      // data: {fileName: fileName}      
    });    
  }
  openDialogScreening(appId,CandId,CandName,i): void {

    //this.selectedApplication = this.StageValueList.filter( (application) => application.checked ); 
    //this.selectedApplicationId = this.selectedApplication.map(element => element.ApplicationId);
   // this.selectedCandidate_FN = this.selectedApplication.map(element => element.Candidate_FN);
    this.route.params.subscribe(params => {
      this.id = params['id'];  
      this.currentstage = params['stage'];    
    });

  /*  if(this.selectedApplication.length > 1){
      this.message = "Only one candidate can be move to the screening at a time.";
      this.openSnackBar();
      return;
    }*/

    const dialogRef = this.dialog.open(ScreeningComponent, {
      width: '900px',
      data: {applicationId: appId,candidateName: CandName,candidateId:CandId,requisitionId:this.id,currentStage:this.currentstage}      
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.action === 1) {
        $("#changeExpvalue"+[i]).html(result['values'][0]['ExpSalary']); 
        $("#changePrevalue"+[i]).html(result['values'][0]['PrSalTotal']);
        $("#changeNPvalue"+[i]).html(result['values'][0]['NoticePeriod']);
        $("#changeLocvalue"+[i]).html(result['values'][0]['PresentLocation']);
        $("#changeExpervalue"+[i]).html(result['values'][0]['Experience']);        
      }
    });   
  }

  openDialogoffer(appId,CandId,CandName,i): void {

    this.route.params.subscribe(params => {
      this.id = params['id'];  
      this.currentstage = params['stage'];    
    });

    const dialogRef = this.dialog.open(OfferComponent, {
      width: '900px',
      data: {applicationId: appId,candidateName: CandName,candidateId:CandId,requisitionId:this.id}      
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.action === 1) {

        this.date = this.datePipe.transform(result['values'][0]['JoiningDate'], 'dd-MMM-yyyy');

        $("#changeJoinvalue"+[i]).html(this.date); 
        $("#changeSalvalue"+[i]).html(result['values'][0]['SalaryOffered']);
        $("#changeBillvalue"+[i]).html(result['values'][0]['BillableCTC']);
        $("#changeFeevalue"+[i]).html(result['values'][0]['AgencyFees']);
        $("#changeGstvalue"+[i]).html(result['values'][0]['GSTYesNo']);
        $("#changeRemvalue"+[i]).html(result['values'][0]['Remarks']);
      }
    });   
  }
  openDialogNotHired(stage): void {

    this.selectedApplication = this.StageValueList.filter( (application) => application.checked ); 
    this.selectedApplicationId = this.selectedApplication.map(element => element.ApplicationId);
    this.selectedCandidateId = this.selectedApplication.map(element => element.CandidateId);

    this.route.params.subscribe(params => {
      this.id = params['id'];  
      this.currentstage = params['stage'];    
    });

    
    if(this.selectedApplication.length < 1){
      this.message = "Please select atleast one candidate to move.";
      this.openSnackBar();
      return;
    }
    if(this.currentstage != 'IR'){
      if(stage == 'CR' && this.currentstage != 'AS' && this.currentstage != 'HR' && this.currentstage != 'JO' && this.currentstage != 'OF')
      {
        this.message = "CV from sourcing and screening can only be moved to Internal rejection.";
        this.openSnackBar();
        return;
      }   
    }
    if(this.currentstage != 'CR'){
      if(stage == 'IR' && this.currentstage !='SC' && this.currentstage !='SO')
      {
        this.message = "We can move the candidate to client rejection only from this stage.";
        this.openSnackBar();
        return;
      }
    }

    const dialogRef = this.dialog.open(NothiredComponent, {
      width: '900px',
      data: {selectedValue:this.selectedApplication,requisitionId:this.id,CStage:stage}      
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.action === 1) {
        this.updatenotHiredStage(result['stage'],this.selectedApplicationId,this.selectedCandidateId);
      }
    });   
  }

  openDialogAssessment(appId,CandId,CandName,i): void {

    this.route.params.subscribe(params => {
      this.id = params['id'];  
      this.currentstage = params['stage'];    
    });

    const dialogRef = this.dialog.open(SubstageComponent, {
      width: '900px',
      data: {applicationId: appId,candidateName: CandName,candidateId:CandId,requisitionId:this.id}      
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.action === 1) {
        this.SubStageValueCount = result['values']['SubStageCount'];
       $("#candidateName"+[i]).html(result['values']['SubStageName']['Value']);        
      }
    })

  }
  
  actionMethod(i) { 
    $(".dropdown-menu").fadeOut("fast");
   // $(".dropdown-menu").hide("fast");
    $("#showmenu"+i).show();
    
    $(document).on("click", function(event){
      var $trigger = $(".dropdown");
      if($trigger !== event.target && !$trigger.has(event.target).length){
        $(".dropdown-menu").fadeOut("fast");
      }            
   });
   
  }
  FileMethod(i) { 
    $(".dropdown-menu").fadeOut("fast");
    $("#filemenu"+i).show();
    $(document).on("click", function(event){
      var $trigger = $(".dropdown");
      if($trigger !== event.target && !$trigger.has(event.target).length){
        $(".dropdown-menu").fadeOut("fast");
      }            
   });
  }

  getAssessmentStageValue(stage){   
   
    this.showjoinoffer = 'false';
    this.shownothired='false';
    this.showall='true';
     
    $('#applicationDashboard').DataTable().clear().destroy();
    $('#joinofferDashboard').DataTable().clear().destroy();
    $('#nothiredDashboard').DataTable().clear().destroy();
    $('#allDashboard').DataTable().clear().destroy();
    
    this.ManageapplicationServices.getStageValues(this.id,stage).subscribe(
      response => {
        if (response != "No data") {  
          this.clicked = 0;          
         
          this.StageValueList = response['Data']['SSAHNGrid'];     
          this.StageValueCount = response['Data']['StageCount'];  
          this.SubStageValueCount =  response['Data']['SubStageCount'];
          this.requisitionDetails = response['Data']['RequisitionDetail']; 

         
      }
    });

    $("#loader").hide();

    setTimeout(function () {
       $(function () {
         $('#applicationDashboard').DataTable({
           scrollY: '360px'
         });    
         $("#loader").hide();
       });      
     }, 1500);   
  }
  
  getSubStageDetails(substage){
  
    $("#loader").show();     

    if(substage == 'AS'){
      this.clicked = 1;
    }
    else if(substage == 'CV'){
      this.clicked = 2;
    }
    else if(substage == 'R1'){
      this.clicked = 3;
    }
    else if(substage == 'R2'){
      this.clicked = 4;
    }
    else if(substage == 'R3'){
      this.clicked = 5;
    }
    
    $("#manageapplication").show();
    $("#applicationinfo").hide(); 

    $('#applicationDashboard').DataTable().clear().destroy();
    $('#allDashboard').DataTable().clear().destroy();
    $('#joinofferDashboard').DataTable().clear().destroy();
    $('#nothiredDashboard').DataTable().clear().destroy();

  /*  $(document).ready(function() { 
       $('select option[value="'+cStage+'"]').prop("selected",true);  
    });
       */
      this.showall='true';
      this.shownothired='false';
      this.showjoinoffer ='false';
      this.showalldashboard ='false';

      this.ManageapplicationServices.getSubStageValues(this.id,substage).subscribe(
        response => {
          if (response != "No data") {  
            this.StageValueList = response['Data']['SSAHNGrid'];     
            this.StageValueCount = response['Data']['StageCount'];  
            this.SubStageValueCount =  response['Data']['SubStageCount'];
            this.requisitionDetails = response['Data']['RequisitionDetail'];  
            
            if(this.StageValueList.length != 0){              
              this.displayNoData = false;
            }
            else{              
              this.displayNoData = true;
            }
          }
        }
      ); 

      $("#loader").hide();

     setTimeout(function () {
        $(function () {
          $('#applicationDashboard').DataTable({
            scrollY: '360px'
          });    
          $("#loader").hide();
        });      
      }, 1500);      
  }


  getDetails(id,currentstage){
  
    $("#loader").show();     

    var cStage = currentstage;

    $("#manageapplication").show();
    $("#applicationinfo").hide(); 

    $(document).ready(function() { 
       $('select option[value="'+cStage+'"]').prop("selected",true);  
    });
   
    if((currentstage == "OF") || (currentstage == "JO")){
      this.showall='false';
      this.shownothired='false';
      this.showjoinoffer ='true';
      this.showalldashboard='false';

      this.ManageapplicationServices.getOffandJoinValues(id,currentstage).subscribe(
        response => {
          if (response != "No data") {  
            this.StageValueList = response['Data']['SSAHNGrid'];     
            this.StageValueCount = response['Data']['StageCount'];  
            this.SubStageValueCount =  response['Data']['SubStageCount'];
            this.requisitionDetails = response['Data']['RequisitionDetail'];  
          }
        }
      ); 
    }    
   else if((currentstage == "CR") || (currentstage == "IR")){
      this.showall='false';
      this.shownothired='true';
      this.showjoinoffer ='false';
      this.showalldashboard='false';

      this.ManageapplicationServices.getStageValues(id,currentstage).subscribe(
        response => {
          if (response != "No data") {  
            response['Data']['SSAHNGrid'].forEach(item => {
              for (let i = 0; i < response['Data']['SSAHNGrid'].length; i++) {                            
                if(response['Data']['SSAHNGrid'][i]['Currentstage_CV'] == 'SO')
                {
                  response['Data']['SSAHNGrid'][i]['Currentstage'] = 'Sourcing';
                }
                else if(response['Data']['SSAHNGrid'][i]['Currentstage_CV'] == 'SC')
                {
                  response['Data']['SSAHNGrid'][i]['Currentstage'] = 'Screening';
                }
                else if(response['Data']['SSAHNGrid'][i]['Currentstage_CV'] == 'AS')
                {
                  response['Data']['SSAHNGrid'][i]['Currentstage'] = 'Assessment';
                }
                else if(response['Data']['SSAHNGrid'][i]['Currentstage_CV'] == 'HR')
                {
                  response['Data']['SSAHNGrid'][i]['Currentstage'] = 'HR Round';
                }
                else if(response['Data']['SSAHNGrid'][i]['Currentstage_CV'] == 'OF')
                {
                  response['Data']['SSAHNGrid'][i]['Currentstage'] = 'Offered';
                }
                else if(response['Data']['SSAHNGrid'][i]['Currentstage_CV'] == 'JO')
                {
                  response['Data']['SSAHNGrid'][i]['Currentstage'] = 'Joined';
                }
                else if(response['Data']['SSAHNGrid'][i]['Currentstage_CV'] == 'CR')
                {
                  response['Data']['SSAHNGrid'][i]['Currentstage'] = 'Client reject';
                }
                else if(response['Data']['SSAHNGrid'][i]['Currentstage_CV'] == 'IR')
                {
                  response['Data']['SSAHNGrid'][i]['Currentstage'] = 'Internal reject';
                }
              }       
          });
            this.StageValueList = response['Data']['SSAHNGrid'];     
            this.StageValueCount = response['Data']['StageCount'];  
            this.SubStageValueCount =  response['Data']['SubStageCount'];
            this.requisitionDetails = response['Data']['RequisitionDetail'];
          
          }
        }
      );
 
    }   

    else if(currentstage == "All"){
      this.showall='false';
      this.shownothired='false';
      this.showjoinoffer ='false';
      this.showalldashboard='true';

      this.ManageapplicationServices.getStageValues(id,currentstage).subscribe(
        response => {
          if (response != "No data") {  
            response['Data']['SSAHNGrid'].forEach(item => {
              for (let i = 0; i < response['Data']['SSAHNGrid'].length; i++) {                            
                if(response['Data']['SSAHNGrid'][i]['Currentstage_CV'] == 'SO')
                {
                  response['Data']['SSAHNGrid'][i]['Currentstage'] = 'Sourcing';
                }
                else if(response['Data']['SSAHNGrid'][i]['Currentstage_CV'] == 'SC')
                {
                  response['Data']['SSAHNGrid'][i]['Currentstage'] = 'Screening';
                }
                else if(response['Data']['SSAHNGrid'][i]['Currentstage_CV'] == 'AS')
                {
                  response['Data']['SSAHNGrid'][i]['Currentstage'] = 'Assessment';
                }
                else if(response['Data']['SSAHNGrid'][i]['Currentstage_CV'] == 'HR')
                {
                  response['Data']['SSAHNGrid'][i]['Currentstage'] = 'HR Round';
                }
                else if(response['Data']['SSAHNGrid'][i]['Currentstage_CV'] == 'OF')
                {
                  response['Data']['SSAHNGrid'][i]['Currentstage'] = 'Offered';
                }
                else if(response['Data']['SSAHNGrid'][i]['Currentstage_CV'] == 'JO')
                {
                  response['Data']['SSAHNGrid'][i]['Currentstage'] = 'Joined';
                }
                else if(response['Data']['SSAHNGrid'][i]['Currentstage_CV'] == 'CR')
                {
                  response['Data']['SSAHNGrid'][i]['Currentstage'] = 'Client reject';
                }
                else if(response['Data']['SSAHNGrid'][i]['Currentstage_CV'] == 'IR')
                {
                  response['Data']['SSAHNGrid'][i]['Currentstage'] = 'Internal reject';
                }
              }       
          });
            this.StageValueList = response['Data']['SSAHNGrid'];     
            this.StageValueCount = response['Data']['StageCount'];  
            this.SubStageValueCount =  response['Data']['SubStageCount'];
            this.requisitionDetails = response['Data']['RequisitionDetail'];
          
          }
        }
      );
 
    }   
    else{
      this.showjoinoffer = 'false';
      this.shownothired='false';
      this.showall='true';
      this.showalldashboard='false';

      this.ManageapplicationServices.getStageValues(id,currentstage).subscribe(
        response => {
          if (response != "No data") {  
            this.StageValueList = response['Data']['SSAHNGrid'];     
            this.StageValueCount = response['Data']['StageCount'];  
            this.SubStageValueCount =  response['Data']['SubStageCount'];
            this.requisitionDetails = response['Data']['RequisitionDetail'];  
          }
        }
      );

  }}



  getStageValuesOnChange(stage){   
    
    $("#loader").show();
  
    this.route.params.subscribe(params => {
      this.id = params['id'];  
      this.currentstage = params['stage'];    
    });

    if(stage == 'All'){
      this.currentStageString = true;
    }
    else{
      this.currentStageString = false;
    }

    this.routerObj.navigate(['manage/',this.id,stage]);

    $(document).ready(function() { 
      $('select option[value="'+stage+'"]').prop("selected",true);
    });

    $('#applicationDashboard').DataTable().clear().destroy();
    $('#joinofferDashboard').DataTable().clear().destroy();
    $('#nothiredDashboard').DataTable().clear().destroy();
    $('#allDashboard').DataTable().clear().destroy();

    if((stage == "OF") || (stage == "JO")){
      this.showall='false';
      this.shownothired='false';
      this.showjoinoffer ='true';
      this.showalldashboard='false';

      this.ManageapplicationServices.getOffandJoinValues(this.id,stage).subscribe(
        response => {
          if (response != "No data") {  
            this.StageValueList = response['Data']['SSAHNGrid'];     
            this.StageValueCount = response['Data']['StageCount'];  
            this.SubStageValueCount =  response['Data']['SubStageCount'];
            this.requisitionDetails = response['Data']['RequisitionDetail'];  
          }
        }
      );
      setTimeout(function () {
        $(function () {
          $('#joinofferDashboard').DataTable({
            scrollY: '360px'
          }); 
        });      
        $("#loader").hide();
      }, 1500);    
    }    
   else if((stage == "CR") || (stage == "IR")){    
      this.showall='false';
      this.shownothired='true';
      this.showjoinoffer ='false';
      this.showalldashboard='false';

      this.ManageapplicationServices.getStageValues(this.id,stage).subscribe(
        response => {
          if (response != "No data") {  
            response['Data']['SSAHNGrid'].forEach(item => {
              for (let i = 0; i < response['Data']['SSAHNGrid'].length; i++) {  
                           
                if(response['Data']['SSAHNGrid'][i]['Currentstage_CV'] == 'SO')
                {
                  response['Data']['SSAHNGrid'][i]['Currentstage'] = 'Sourcing';
                }
                else if(response['Data']['SSAHNGrid'][i]['Currentstage_CV'] == 'SC')
                {
                  response['Data']['SSAHNGrid'][i]['Currentstage'] = 'Screening';
                }
                else if(response['Data']['SSAHNGrid'][i]['Currentstage_CV'] == 'AS')
                {
                  response['Data']['SSAHNGrid'][i]['Currentstage'] = 'Assessment';
                }
                else if(response['Data']['SSAHNGrid'][i]['Currentstage_CV'] == 'HR')
                {
                  response['Data']['SSAHNGrid'][i]['Currentstage'] = 'HR Round';
                }
                else if(response['Data']['SSAHNGrid'][i]['Currentstage_CV'] == 'OF')
                {
                  response['Data']['SSAHNGrid'][i]['Currentstage'] = 'Offered';
                }
                else if(response['Data']['SSAHNGrid'][i]['Currentstage_CV'] == 'JO')
                {
                  response['Data']['SSAHNGrid'][i]['Currentstage'] = 'Joined';
                }
                else if(response['Data']['SSAHNGrid'][i]['Currentstage_CV'] == 'CR')
                {
                  response['Data']['SSAHNGrid'][i]['Currentstage'] = 'Client reject';
                }
                else if(response['Data']['SSAHNGrid'][i]['Currentstage_CV'] == 'IR')
                {
                  response['Data']['SSAHNGrid'][i]['Currentstage'] = 'Internal reject';
                }
              }       
          });
            this.StageValueList = response['Data']['SSAHNGrid'];     
            this.StageValueCount = response['Data']['StageCount'];  
            this.requisitionDetails = response['Data']['RequisitionDetail'];  
            
          }
        }
      );
      setTimeout(function () {
        $(function () {
          $('#nothiredDashboard').DataTable({
            scrollY: '360px'
          });               
        });      
        $("#loader").hide();
      }, 1500);   
    }   
    else if(stage == "All"){    
      this.showall='false';
      this.shownothired='false';
      this.showjoinoffer ='false';
      this.showalldashboard='true';

      this.ManageapplicationServices.getStageValues(this.id,stage).subscribe(
        response => {
          if (response != "No data") {  
            response['Data']['SSAHNGrid'].forEach(item => {
              for (let i = 0; i < response['Data']['SSAHNGrid'].length; i++) {  
                           
                if(response['Data']['SSAHNGrid'][i]['Currentstage_CV'] == 'SO')
                {
                  response['Data']['SSAHNGrid'][i]['Currentstage'] = 'Sourcing';
                }
                else if(response['Data']['SSAHNGrid'][i]['Currentstage_CV'] == 'SC')
                {
                  response['Data']['SSAHNGrid'][i]['Currentstage'] = 'Screening';
                }
                else if(response['Data']['SSAHNGrid'][i]['Currentstage_CV'] == 'AS')
                {
                  response['Data']['SSAHNGrid'][i]['Currentstage'] = 'Assessment';
                }
                else if(response['Data']['SSAHNGrid'][i]['Currentstage_CV'] == 'HR')
                {
                  response['Data']['SSAHNGrid'][i]['Currentstage'] = 'HR Round';
                }
                else if(response['Data']['SSAHNGrid'][i]['Currentstage_CV'] == 'OF')
                {
                  response['Data']['SSAHNGrid'][i]['Currentstage'] = 'Offered';
                }
                else if(response['Data']['SSAHNGrid'][i]['Currentstage_CV'] == 'JO')
                {
                  response['Data']['SSAHNGrid'][i]['Currentstage'] = 'Joined';
                }
                else if(response['Data']['SSAHNGrid'][i]['Currentstage_CV'] == 'CR')
                {
                  response['Data']['SSAHNGrid'][i]['Currentstage'] = 'Client reject';
                }
                else if(response['Data']['SSAHNGrid'][i]['Currentstage_CV'] == 'IR')
                {
                  response['Data']['SSAHNGrid'][i]['Currentstage'] = 'Internal reject';
                }
              }       
          });
            this.StageValueList = response['Data']['SSAHNGrid'];     
            this.StageValueCount = response['Data']['StageCount'];  
            this.requisitionDetails = response['Data']['RequisitionDetail'];  
            
          }
        }
      );
      setTimeout(function () {
        $(function () {
          $('#allDashboard').DataTable({
            scrollY: '360px'
          });               
        });      
        $("#loader").hide();
      }, 1500);   
    }  
    else{
      this.showjoinoffer = 'false';
      this.shownothired='false';
      this.showall='true';
      this.showalldashboard='false';

      this.clicked = 0;
      this.ManageapplicationServices.getStageValues(this.id,stage).subscribe(
        response => {
          if (response != "No data") {  
            this.StageValueList = response['Data']['SSAHNGrid'];     
            this.StageValueCount = response['Data']['StageCount'];  
            this.SubStageValueCount =  response['Data']['SubStageCount'];
            this.requisitionDetails = response['Data']['RequisitionDetail'];  
          }
        }
      );
      setTimeout(function () {
        $(function () {
          $('#applicationDashboard').DataTable({
            scrollY: '360px'
          });           
        });   
        $("#loader").hide();   
      }, 1500);    
    }
  }

  moveCandidate(stage){
    if((this.currentstage == "OF") || (this.currentstage == "JO")){ 
      this.ManageapplicationServices.getOffandJoinValues(this.id,this.currentstage).subscribe(
        response => {
          if (response != "No data") {  
            this.StageValueList = response['Data']['SSAHNGrid'];     
            this.StageValueCount = response['Data']['StageCount'];  
            this.SubStageValueCount =  response['Data']['SubStageCount'];
            this.requisitionDetails = response['Data']['RequisitionDetail'];  
          }
        }
      );
    }
  else{
    this.ManageapplicationServices.getStageValues(this.id,this.currentstage).subscribe(
      response => {
        if (response != "No data") {  
          this.StageValueList = response['Data']['SSAHNGrid'];     
          this.StageValueCount = response['Data']['StageCount'];  
          this.SubStageValueCount =  response['Data']['SubStageCount'];
          this.requisitionDetails = response['Data']['RequisitionDetail'];  
        }
      }
    );
  }
}

  
  /*updateStage(updatestage,updatestagestring){

    this.selectedApplication = this.StageValueList.filter( (application) => application.checked ); 
    this.selectedApplicationId = this.selectedApplication.map(element => element.ApplicationId);
    this.selectedCandidateId = this.selectedApplication.map(element => element.CandidateId);
   
    this.route.params.subscribe(params => {
      this.id = params['id'];  
      this.currentstage = params['stage'];    
    });
    
    if(this.selectedApplication.length < 1){
      this.message = "Please select atleast one candidate to move.";
      this.openSnackBar();
      return;
    }

    if(this.currentstage == updatestage)
    {
      this.message = "CV's cannot be moved witin the same stage.";
      this.openSnackBar();
      return;    
    }

    if(this.currentstage == 'SO' && updatestage !='SC')
    {
      this.message = "CV from Sourcing can only be moved to Screening and Not Hired.";
      this.openSnackBar();
      return;   
    }
    else if(this.currentstage == 'SC' && updatestage !='AS')
    {
      this.message = "CV from Screening can only be moved to Assessment and Not Hired.";
      this.openSnackBar();
      return;
    }
    else if(this.currentstage == 'AS' && updatestage !='HR')
    {
      this.message = "CV from Assessment can only be moved to HR Round and Not Hired.";
      this.openSnackBar();
      return;
    }
    else if(this.currentstage == 'HR' && updatestage !='OF')
    {
      this.message = "CV from HR Round can only be moved to Offered and Not Hired.";
      this.openSnackBar();
      return;
    }
    else if(this.currentstage == 'OF' && updatestage !='JO')
    {
      this.message = "CV from Offered can only be moved to Joined and Not Hired.";
      this.openSnackBar();
      return;
    }
    else if(this.currentstage == 'NH'){
      this.message = "CV from Not Hired cannot be moved to any other stage.";
      this.openSnackBar();
      return;
    }
 
    if(this.selectedApplication.length > 20){
      this.message = "Only 20 CV's can be moved at a time to another stage.";
      this.openSnackBar();
      return;
    }

    if(this.selectedApplication.length > 1 && (updatestage == "HR" || updatestage == "OF" || updatestage == "JO")) {
      this.message = "Only one candidate can be moved to this stage at a time.";
      this.openSnackBar();
      return;
    }

   if(updatestage != 'OF')
   {
    this.ManageapplicationServices.updateStagetoStage(this.id,this.selectedApplicationId,updatestage,this.currentstage,this.selectedCandidateId).subscribe(
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
              //  $('select option[value="'+updatestage+'"]').prop("selected",true);         
                this.getStageValuesOnChange(updatestage);
               // $('select option[value="'+updatestage+'"]').attr("selected",true);                             
              }   
            }             
          }
        }
      ); 
    }
    else if(updatestage == 'OF'){
      this.ManageapplicationServices.checkOfferPosition(this.id).subscribe(
        response => {
          if (response != "No data") {  
            this.positionLength = response['Data'];          
            if(this.positionLength  == 0){
              this.message = "There are no open positions available for this candidate.Please add additional position(s) to upload CV ";
              this.openSnackBar();
              return;
            }
            else{
              this.ManageapplicationServices.updateStagetoStage(this.id,this.selectedApplicationId,updatestage,this.currentstage,this.selectedCandidateId).subscribe(
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
                        //$('select option[value="'+updatestage+'"]').prop("selected",true);               
                        this.getStageValuesOnChange(updatestage);
                        //$('select option[value="'+updatestage+'"]').attr("selected",true);                             
                      }   
                    }             
                  }
                }
              ); 
            }
          }
        }
      ); 
    }

  }*/

  updateNothiredBackwardMovement(updatestage,candidateId,ApplicationId){

    this.route.params.subscribe(params => {
      this.id = params['id'];  
      this.currentstage = params['stage'];    
    });

    this.ManageapplicationServices.updateBackwardStagetoStage(this.id,ApplicationId,updatestage,this.currentstage,candidateId).subscribe(
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
              this.moveCandidate(updatestage);  
              /*this.routerObj.routeReuseStrategy.shouldReuseRoute = () => false; 
              setTimeout(() => {
                this.routerObj.navigate(['manage/'+this.id+'/'+response['Data']]);
              }
              , 2000);  */
            //  $('select option[value="'+updatestage+'"]').prop("selected",true);         
             // this.getStageValuesOnChange(updatestage);
             // $('select option[value="'+updatestage+'"]').attr("selected",true);                             
            }   
          }             
        }
      }
    ); 
  }

  downloadTracker(){
    this.selectedApplication = this.StageValueList.filter( (application) => application.checked ); 
    this.selectedApplicationId = this.selectedApplication.map(element => element.ApplicationId);
    this.selectedCandidateId = this.selectedApplication.map(element => element.CandidateId);

    if(this.selectedApplication.length < 1){
      this.message = "Please select atleast one candidate to download resume.";
      this.openSnackBar();
      return;
    }
  }

  updateStage(updatestage,updatestagestring){

    this.selectedApplication = this.StageValueList.filter( (application) => application.checked ); 
    this.selectedApplicationId = this.selectedApplication.map(element => element.ApplicationId);
    this.selectedCandidateId = this.selectedApplication.map(element => element.CandidateId);
   
    this.route.params.subscribe(params => {
      this.id = params['id'];  
      this.currentstage = params['stage'];    
    });
    
    if(this.selectedApplication.length < 1){
      this.message = "Please select atleast one candidate to move.";
      this.openSnackBar();
      return;
    }

    if(this.currentstage == updatestage)
    {
      this.message = "CV's cannot be moved witin the same stage.";
      this.openSnackBar();
      return;    
    }

    if(updatestage =='SO')
    {
      this.movement = 'backward';
    }
    else if(this.currentstage == 'AS' && updatestage =='SC')
    {
      this.movement = 'backward';
    }
    else if(this.currentstage == 'HR' && (updatestage =='SC' || updatestage =='AS'))
    {
      this.movement = 'backward';
    }
    else if(this.currentstage == 'OF' && (updatestage =='SC' || updatestage =='AS' || updatestage =='HR'))
    {
      this.movement = 'backward';
    }
    else if(this.currentstage == 'JO' && (updatestage =='SC' || updatestage =='AS' || updatestage =='HR' || updatestage =='OF'))
    {
      this.movement = 'backward';
    }
    else{
      this.movement = 'forward';
    }
    if(this.currentstage == 'SO')
      {
        this.currentString = 'Sourcing';
      }
      else if(this.currentstage == 'SC')
      {
        this.currentString = 'Screening';
      }
      else if(this.currentstage == 'AS')
      {
        this.currentString = 'Assessment';
      }
      else if(this.currentstage == 'HR')
      {
        this.currentString = 'HR Round';
      }
      else if(this.currentstage == 'OF')
      {
        this.currentString = 'Offered';
      }
      else if(this.currentstage == 'JO')
      {
        this.currentString = 'Joined';
      }
      else if(this.currentstage == 'CR')
      {
        this.currentString = 'Client reject';
      }
      else if(this.currentstage == 'IR')
      {
        this.currentString = 'Internal reject';
      }
    if(this.movement == 'forward')
    {
      if(this.currentstage == 'SO' && updatestage !='SC')
      {
        this.message = "In Forward Movement, CV from Sourcing can only be moved to Screening and Internal reject.";
        this.openSnackBar();
        return;   
      }
      else if(this.currentstage == 'SC' && updatestage !='AS')
      {
        this.message = "In Forward Movement, CV from Screening can only be moved to Assessment and Internal reject.";
        this.openSnackBar();
        return;
      }
      /*else if(this.currentstage == 'AS' && (updatestage =='SO' || updatestage =='OF' || updatestage =='JO'))
      {
        console.log(updatestage);
        this.message = "CV from Assessment can only be moved to HR Round and Not Hired.";
        this.openSnackBar();
        return;
      }*/
      else if(this.currentstage == 'AS' && updatestage !='HR')
      {
        this.message = "In Forward Movement, CV from Assessment can only be moved to HR Round and Client reject.";
        this.openSnackBar();
        return;
      }
      else if(this.currentstage == 'HR' && updatestage !='OF')
      {
        this.message = "In Forward Movement, CV from HR Round can only be moved to Offered and Client reject.";
        this.openSnackBar();
        return;
      }
      else if(this.currentstage == 'OF' && updatestage !='JO')
      {
        this.message = "In Forward Movement, CV from Offered can only be moved to Joined and Client reject.";
        this.openSnackBar();
        return;
      }
      else if(this.currentstage == 'CR' || this.currentstage == 'IR'){
        this.message = "In Forward Movement, CV from Reject stage cannot be moved to any other stage.";
        this.openSnackBar();
        return;
      }
  
      if(this.selectedApplication.length > 20){
        this.message = "Only 20 CV's can be moved at a time to another stage.";
        this.openSnackBar();
        return;
      }

      if(this.selectedApplication.length > 1 && (updatestage == "HR" || updatestage == "OF" || updatestage == "JO")) {
        this.message = "In Forward Movement, Only one candidate can be moved to this stage at a time.";
        this.openSnackBar();
        return;
      }

      
   if(updatestage != 'OF')
   {
    var confirm = window.confirm("Do you want to move CV's from "+this.currentString+" to "+updatestagestring+"?");
    if (confirm == true) {    

      this.ManageapplicationServices.updateStagetoStage(this.id,this.selectedApplicationId,updatestage,this.currentstage,this.selectedCandidateId).subscribe(
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
                //  $('select option[value="'+updatestage+'"]').prop("selected",true);         
                  this.moveCandidate(updatestage);
                // $('select option[value="'+updatestage+'"]').attr("selected",true);                             
                }   
              }             
            }
          }
        ); 
      }
    }
    else if(updatestage == 'OF'){
      var confirm = window.confirm("Do you want to move CV's from "+this.currentString+" to "+updatestagestring+"?");
      if (confirm == true) {    
  
        this.ManageapplicationServices.checkOfferPosition(this.id).subscribe(
          response => {
            if (response != "No data") {  
              this.positionLength = response['Data'];          
              if(this.positionLength  == 0){
                this.message = "There are no open positions available for this candidate.Please add additional position(s) to upload CV ";
                this.openSnackBar();
                return;
              }
              else{
                this.ManageapplicationServices.updateStagetoStage(this.id,this.selectedApplicationId,updatestage,this.currentstage,this.selectedCandidateId).subscribe(
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
                          //$('select option[value="'+updatestage+'"]').prop("selected",true);               
                          this.moveCandidate(updatestage);
                          //$('select option[value="'+updatestage+'"]').attr("selected",true);                             
                        }   
                      }             
                    }
                  }
                ); 
              }
            }
          }
        ); 
      }
    }
  }
  else{

    if(this.selectedApplication.length > 25) {
      this.message = "In Backward Movement, Only 25 candidate can be moved to this stage at a time.";
      this.openSnackBar();
      return;
    }

    if(updatestage == 'SO')
    {
      this.message = "In Backward Movement, CV from any stage cannot be moved to Sourcing.";
      this.openSnackBar();
      return; 
    }
    if(this.currentstage == 'AS' && updatestage !='SC')
    {
      this.message = "In Backward Movement, CV from Assessment can only be moved to Screening.";
      this.openSnackBar();
      return;   
    }
    else if(this.currentstage == 'HR' && updatestage !='AS')
    {
      this.message = "In Backward Movement, CV from HR Round can only be moved to Assessment.";
      this.openSnackBar();
      return;   
    }
    else if(this.currentstage == 'OF' && (updatestage == 'SO' || updatestage == 'SC' || updatestage == 'JO' || updatestage == 'CR' || updatestage == 'IR' ))
    {
      console.log(updatestage);
      this.message = "In Backward Movement, CV from Offered can only be moved to Assessment and HR Round.";
      this.openSnackBar();
      return;   
    }
    else if(this.currentstage == 'JO' && (updatestage !='CR' || updatestage !='IR'))
    {
      this.message = "In Backward Movement, CV from Joined can only be moved to reject stage.";
      this.openSnackBar();
      return;   
    }

    //this.selectedApplication = this.StageValueList.filter( (application) => application.checked ); 
   
    this.selectedId = this.selectedApplication.map(({ CandidateId, ApplicationId }) => ({CandidateId, ApplicationId}));
   
    var confirm = window.confirm("Do you want to move CV's from "+this.currentString+" to "+updatestagestring+"?");
    if (confirm == true) {   

      this.ManageapplicationServices.updateBulkBackwardStagetoStage(this.id,updatestage,this.currentstage,this.selectedId).subscribe(
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
              //  $('select option[value="'+updatestage+'"]').prop("selected",true);         
                this.moveCandidate(updatestage);
              // $('select option[value="'+updatestage+'"]').attr("selected",true);                             
              }   
            }             
          }
        }
      ); 
    }
  }

  }



  /*downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type});
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
        alert( 'Please disable your Pop-up blocker and try again.');
    }
  }*/

  downLoadFile(data: any) {    
    let contenType = data.headers.get("content-type");
    let contdisp = data.headers.get("content-disposition").split("=");
    let fileName = contdisp[1].trim();
    let blob = new Blob([data._body], {  type: contenType });  
    let file = new File([blob], fileName, { type: contenType});
    saveAs(file);
  }

  downloadJD(reqId) {

    this.ManageapplicationServices.downloadJDLink(reqId).subscribe(
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
  updatenotHiredStage(updatestage,appId,CandId){

   this.route.params.subscribe(params => {
      this.id = params['id'];     
      this.currentstage = params['stage'];     
    }); 
   
    this.ManageapplicationServices.updateStagetoStage(this.id,appId,updatestage,this.currentstage,CandId).subscribe(
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
                //$('select option[value="'+updatestage+'"]').prop("selected",true); 
                this.moveCandidate(updatestage);
               // $('select option[value="'+updatestage+'"]').attr("selected",true);                             
              }   
            }             
          }
        }
      ); 
  }

}
