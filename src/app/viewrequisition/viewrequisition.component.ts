import { Component, OnInit, ContentChild, ViewChild,Inject,Input } from '@angular/core';
import { MatFormFieldControl, MatFormField, MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatChipInputEvent } from '@angular/material';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ToolbarService, LinkService, ImageService, HtmlEditorService, TableService } from '@syncfusion/ej2-angular-richtexteditor';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AddskillComponent } from '../addskill/addskill.component';
import { AddcompetencyComponent } from '../addcompetency/addcompetency.component';
import { AddeducationComponent } from '../addeducation/addeducation.component';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ViewrequisitionService } from './viewrequisition.service';
import { SharedService } from '../shared/shared.service';
import { HttpClient, HttpParams, HttpRequest, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-viewrequisition',
  templateUrl: './viewrequisition.component.html',
  styleUrls: ['./viewrequisition.component.css']
})
export class ViewrequisitionComponent implements OnInit {
  
  id:any;
  requisitionDetails:[];
  descriptionCompetency:any;
  descriptionSkill:any;
  descriptionEducation:any;
  addRequisitionForm: FormGroup;
  attachment:any;
  attachmentShow:any;
  createdOn:any;
  modifyOn:any;
  openedOn:any;
  reqcode= 0;
  show:boolean=false;
  showMenu:boolean=false;
  LkupLocation:[];
  LkupBudgetType:[];
  LkupBudgetCurrency:[];
  LkupEmploymentType:[];
  LkupHiringManager:[];
  LkupClient:[];
  LkupAccountManager:[];
  reqStatus:any;

  constructor(public dialogRef: MatDialogRef<ViewrequisitionComponent>,@Inject(MAT_DIALOG_DATA) public data:any,private ViewrequisitionServices: ViewrequisitionService,private SharedServices: SharedService,private formBuilderObj: FormBuilder,private routerObj: Router,private route: ActivatedRoute) { 
    this.addRequisitionForm = this.formBuilderObj.group({
      Reqtitle: ['', [Validators.required]],
      EmploymentType:['', [Validators.required]],
      ClientId:['', [Validators.required]],
      Hiringmanager:['', [Validators.required]],
      Emplocation:['', [Validators.required]],
      Noofposition:['', [Validators.required,Validators.pattern("[0-9]*")]],
      Skillset:'',
      Designation:'',
      Minexperience:['', [Validators.max(99.9), Validators.min(0)]],
      Maxexperience:['', [Validators.max(99.9), Validators.min(0)]],
      Budgetminamt:['', [Validators.pattern("[0-9]*"),Validators.max(100000000), Validators.min(0)]],
      Budgetmaxamt:['', [Validators.pattern("[0-9]*"),Validators.max(100000000), Validators.min(0)]],
      BudgetType:['', [Validators.required]],
      Budgetccy:['', [Validators.required]],
      Eduqlfn:'',
      Jobdescription:['', [Validators.required]],
      Competency:'',
      Jdattachment:'',
      EACManager:['', [Validators.required]],
      ReqStatus:'',
      ReqStatusRemarks:''
    });    

    this.getViewRequisitionDetails();
  }

  ngOnInit() {
    this.getlkupLocation();
    this.getlkupBudgetType();
    this.getlkupBudgetCurrency();
    this.getlkupEmploymenyType();
    this.getlkupHiringManager();
    this.getlkupClient();
    this.getlkupAccountManager();
  }

  getlkupLocation() {
    this.SharedServices.getLocation().subscribe(
      response => {
        if (response != '') {         
          this.LkupLocation = response;
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }   

  onNoClick(): void {
    this.dialogRef.close();
  }

  getlkupBudgetType() {
    this.SharedServices.getBudgetType().subscribe(
      response => {
        if (response != '') {         
          this.LkupBudgetType = response;
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }  

  getlkupBudgetCurrency() {
    this.SharedServices.getBudgetCurrency().subscribe(
      response => {
        if (response != '') {         
          this.LkupBudgetCurrency = response;
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }  

  getlkupEmploymenyType() {
    this.SharedServices.getEmploymentType().subscribe(
      response => {
        if (response != '') {         
          this.LkupEmploymentType = response;
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }  

  getlkupHiringManager() {
    this.SharedServices.getHiringManager().subscribe(
      response => {
        if (response != '') {         
          this.LkupHiringManager = response;
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }  

  getlkupClient() {
    this.SharedServices.getClient().subscribe(
      response => {
        if (response != '') {         
          this.LkupClient = response;
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }   

  getlkupAccountManager() {
    this.SharedServices.getAccountManager().subscribe(
      response => {
        if (response != '') {         
          this.LkupAccountManager = response;
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }   


  getViewRequisitionDetails() {  

  
    this.ViewrequisitionServices.getRequisitionDetails(this.data['ReqId']).subscribe(
      response => {
        if (response != "No data") {
          if (response == "Login Failed") {           
            alert ("Your given details are not existed.");
            this.routerObj.navigate(["/login"]);           
          }
          else {                     
            this.requisitionDetails = response;   
            if(this.requisitionDetails['Data'][0]['Skillset'])
            {
              let displaySkill =  this.requisitionDetails['Data'][0]['Skillset'].split(";");
              this.descriptionSkill = displaySkill;
            }
            else{
              this.descriptionSkill = '';
            }
            if(this.requisitionDetails['Data'][0]['EduQlfn'])
            {
              let displayEducation =  this.requisitionDetails['Data'][0]['EduQlfn'].split(";");
              this.descriptionEducation = displayEducation;
            }
            else{
              this.descriptionEducation ='';
            }
            if(this.requisitionDetails['Data'][0]['Competency'])
            {
              let displayCompetency =  this.requisitionDetails['Data'][0]['Competency'].split(";");
              this.descriptionCompetency = displayCompetency;
            }
            else{
              this.descriptionCompetency = '';
            }

            
            if(this.requisitionDetails['Data'][0]['ReqStatus'] =='OP'){
              this.reqStatus = 'Open'
            }
            else if(this.requisitionDetails['Data'][0]['ReqStatus'] =='DR'){
              this.reqStatus = 'Draft'
            }
            else if(this.requisitionDetails['Data'][0]['ReqStatus'] =='AR'){
              this.reqStatus = 'Archieved'
            }
            else if(this.requisitionDetails['Data'][0]['ReqStatus'] =='OH'){
              this.reqStatus = 'On hold'
            }

           // this.addRequisitionForm.controls['Noofposition'].disable();

            this.addRequisitionForm.patchValue({
              Reqtitle: this.requisitionDetails['Data'][0]['Reqtitle'],
              EmploymentType:this.requisitionDetails['Data'][0]['Employmenttype'],
              ClientId:this.requisitionDetails['Data'][0]['ClientName'],
              EACManager:this.requisitionDetails['Data'][0]['EACmanager'],              
              Emplocation:this.requisitionDetails['Data'][0]['EmpLocation'],
              Noofposition:this.requisitionDetails['Data'][0]['NoOfPosition'],
              Designation:this.requisitionDetails['Data'][0]['Designation'],
              Minexperience:this.requisitionDetails['Data'][0]['MinExperience'],
              Maxexperience:this.requisitionDetails['Data'][0]['MaxExperience'],
              Budgetminamt:this.requisitionDetails['Data'][0]['BudgetMinAmt'],
              Budgetmaxamt:this.requisitionDetails['Data'][0]['BudgetMaxAmt'],
              BudgetType:this.requisitionDetails['Data'][0]['BudgetType'],
              Budgetccy:this.requisitionDetails['Data'][0]['BudgetCcy'],
              Jobdescription:this.requisitionDetails['Data'][0]['JobDescription'],
            //Jdattachment:this.requisitionDetails['Data'][0]['JDAttachment'],
              Hiringmanager:this.requisitionDetails['Data'][0]['ContactPerson'],
              ReqStatus:this.reqStatus,
              ReqStatusRemarks:this.requisitionDetails['Data'][0]['ReqStatusRemarks']
            });
          

            if(!this.requisitionDetails['Data'][0]['JDAttachment']){
              this.attachmentShow = 0;
            }
            else{
              let getFileName =  this.requisitionDetails['Data'][0]['JDAttachment'].split("#$#");
              this.attachment = getFileName['1'];
              this.attachmentShow = 1;
            }
            if(this.requisitionDetails['Data'][0]['JDAttachment'] == " ")
            {
              this.attachmentShow = 0;
            }
            
          /*  if(this.requisitionDetails['Data'][0]['JDAttachment'] != "")
            {
              this.attachment = this.requisitionDetails['Data'][0]['JDAttachment'];
              this.attachmentShow = 1
            }
            else if(this.requisitionDetails['Data'][0]['JDAttachment'] != " ")
            {
              this.attachment = this.requisitionDetails['Data'][0]['JDAttachment'];
              this.attachmentShow = 1
            }
            else{
              this.attachmentShow = 0;
            }*/
          
            this.createdOn = this.requisitionDetails['Data'][0]['CreatedDate'] ;
            this.openedOn = this.requisitionDetails['Data'][0]['OpenedDate'] ;
            this.modifyOn = this.requisitionDetails['Data'][0]['ModifiedDate'] ;

            sessionStorage.setItem("reqTitle", this.requisitionDetails['Data'][0]['Reqtitle']);
            sessionStorage.setItem("reqStatus", this.requisitionDetails['Data'][0]['ReqStatus']);

            if(this.requisitionDetails['Data'][0]['ReqStatus'] == "HO")
            {
              this.reqcode = 1;
              this.show=true;
            } 
            if(this.requisitionDetails['Data'][0]['ReqStatus'] == "AR")
            {
              this.reqcode = 2;
              this.show=true;
            }
            if(this.requisitionDetails['Data'][0]['ReqStatus'] == "DR")
            {
              this.showMenu=true;
            } 
            else{
              this.showMenu=false;
            }
          }
        } else {
            console.log("something is wrong with Service Execution");
        }
      });
  }
  
  downLoadFile(data: any) {    
    let contenType = data.headers.get("content-type");
    let contdisp = data.headers.get("content-disposition").split("=");
    let fileName = contdisp[1].trim();
    let blob = new Blob([data._body], {  type: contenType });  
    let file = new File([blob], fileName, { type: contenType});
    saveAs(file);
  }

  downloadJD(reqId) {

    this.ViewrequisitionServices.downloadJDLink(reqId).subscribe(
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
}
