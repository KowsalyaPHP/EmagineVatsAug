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
import { CloneService } from './clone.service';
import { SharedService } from '../shared/shared.service';
import { saveAs } from 'file-saver';

export function BudgetValidator(minBudget: string, maxBudget: string, minExp: string, maxExp:string) {
  return (formGroup: FormGroup) => {
      const minBudgetControl = formGroup.controls[minBudget];
      const maxBudgetControl = formGroup.controls[maxBudget];
      const minExpControl = formGroup.controls[minExp];
      const maxExpControl = formGroup.controls[maxExp];

      if (maxBudgetControl.errors && !maxBudgetControl.errors.BudgetValidator) {
          // return if another validator has already found an error on the matchingControl
          return;
      }
      if (maxExpControl.errors && !maxExpControl.errors.BudgetValidator) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
      // set error on matchingControl if validation fails
      if(maxBudgetControl.value != 0 || maxBudgetControl.value != ''){
        if (minBudgetControl.value >= maxBudgetControl.value) {
          maxBudgetControl.setErrors({ BudgetValidator: true });
        } else {
          maxBudgetControl.setErrors(null);
        }
      }
      if(maxExpControl.value != 0 || maxExpControl.value != ''){
        if (minExpControl.value >= maxExpControl.value) {
          maxExpControl.setErrors({ BudgetValidator: true });
        } else {
          maxExpControl.setErrors(null);
        }
      }
  }
}

@Component({
  selector: 'app-clone',
  templateUrl: './clone.component.html',
  styleUrls: ['./clone.component.css']
})
export class CloneComponent implements OnInit {

  @Input()
  data;

  public tools: object = {
      items: [
          'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
          'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
          'LowerCase', 'UpperCase', '|', 'Undo', 'Redo', '|',
          'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
          'Indent', 'Outdent', '|', 'CreateLink','CreateTable',
          'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
  };
  
  cloneRequisitionForm: FormGroup;
  skillCode:any;
  eduCodes:any;
  compCode:any;
  selCompCode:any;
  selSkillCode:any;
  selEduCode:any;
  descriptionCompetency:any;
  descriptionSkill:any;
  descriptionEducation:any;
  value:string;
  /*Chip */
  
  selectCompetency : any;
  selectSkillset : any;
  selectEducation : any;
  visible = true; 
  addOnBlur = true;
  disabled = true;
  message:any;
  competency:[];
  LkupLocation:[];
  LkupBudgetType:[];
  LkupBudgetCurrency:[];
  LkupEmploymentType:[];
  LkupHiringManager:[];
  LkupDeliveryManager:[];
  LkupBusinessFunction:[];
  LkupClient:[];
  LkupAccountManager:[];
  showwithCheckedcomp:[];
  showwithCheckedEduc:[];
  showwithCheckedSkill:[];
  id:any;
  requisitionDetails:[]; 
  reqcode= 0;
  show:boolean=false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];  
  fileList:FileList;
  submitted = false;
  attachment:any;
  attachmentShow:any;
  /*Chip */
  
  constructor(private SharedServices: SharedService,private CloneServices: CloneService,private formBuilderObj: FormBuilder,private routerObj: Router,private route: ActivatedRoute,public dialog: MatDialog) {

    this.cloneRequisitionForm = this.formBuilderObj.group({
      Reqtitle: ['', [Validators.required]],
      EmploymentType:['', [Validators.required]],
      ClientId:['', [Validators.required]],
      Hiringmanager:'',
      Emplocation:['', [Validators.required]],
      Noofposition:['', [Validators.required,Validators.pattern("[0-9]*")]],
      Skillset:'',
      Designation:'',
      Minexperience:['', [Validators.max(99.9), Validators.min(0)]],
      Maxexperience:['', [Validators.max(99.9), Validators.min(0)]],
      Budgetminamt:['', [Validators.pattern("[0-9]*"),Validators.max(9999999), Validators.min(0)]],
      Budgetmaxamt:['', [Validators.pattern("[0-9]*"),Validators.max(9999999), Validators.min(0)]],
      BudgetType:['', [Validators.required]],
      Budgetccy:['', [Validators.required]],
      Eduqlfn:'',
      Jobdescription:['', [Validators.required]],
      Competency:'',
      Jdattachment:'',
      EACManager:'',
      ReqStatus:'',
      ReqStatusRemarks:'', 
      DeliveryManager:'',
      BusinessFunction:'',
      JDVideoLink: ''           
    }, { 
      validator: BudgetValidator('Budgetminamt', 'Budgetmaxamt','Minexperience', 'Maxexperience')
    });    
    
    var userId = sessionStorage.getItem("uniqueSessionId");    
    var userName = sessionStorage.getItem("userName");  
    this.route.params.subscribe(params => {
      this.id = params['id'];     
    }); 

    if (userName && this.id!=0){  
      this.CloneServices.getRequisitionDetails(this.id).subscribe(
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
            
              this.cloneRequisitionForm.patchValue({
                Reqtitle: this.requisitionDetails['Data'][0]['Reqtitle'],
                EmploymentType:this.requisitionDetails['Data'][0]['EmploymentTypecode'],
                ClientId:this.requisitionDetails['Data'][0]['ClientId'],
                Hiringmanager:this.requisitionDetails['Data'][0]['ContactPersonCode'],
                Emplocation:this.requisitionDetails['Data'][0]['EmpLocationcode'],
                Noofposition:this.requisitionDetails['Data'][0]['NoOfPosition'],
               // Skillset:this.requisitionDetails['Data'][0]['Skillset'],
                Designation:this.requisitionDetails['Data'][0]['Designation'],
                Minexperience:this.requisitionDetails['Data'][0]['MinExperience'],
                Maxexperience:this.requisitionDetails['Data'][0]['MaxExperience'],
                Budgetminamt:this.requisitionDetails['Data'][0]['BudgetMinAmt'],
                Budgetmaxamt:this.requisitionDetails['Data'][0]['BudgetMaxAmt'],
                BudgetType:this.requisitionDetails['Data'][0]['BudgetTypecode'],
                Budgetccy:this.requisitionDetails['Data'][0]['BudgetCcycode'],
               // Eduqlfn:this.requisitionDetails['Data'][0]['EduQlfn'],
                Jobdescription:this.requisitionDetails['Data'][0]['JobDescription'],
              //  Competency:this.requisitionDetails['Data'][0]['Competency'],
                //Jdattachment:this.requisitionDetails['Data'][0]['JAttachment'],
                EACManager:this.requisitionDetails['Data'][0]['EACmanagerCode'],
                ReqStatus:this.requisitionDetails['Data'][0]['ReqStatus'],
                ReqStatusRemarks:this.requisitionDetails['Data'][0]['ReqStatusRemarks'],
                DeliveryManager:this.requisitionDetails['Data'][0]['DeliveryManagerCode'],
                BusinessFunction:this.requisitionDetails['Data'][0]['BusinessFunctionCode'],
                JDVideoLink:this.requisitionDetails['Data'][0]['JDVideoLink']
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
              /*if(this.requisitionDetails['Data'][0]['JDAttachment'] != " ")
              {
                this.attachment = this.requisitionDetails['Data'][0]['JDAttachment'];
              }
              else{
                this.attachment = 0;
              }*/

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
            }
          } else {
              console.log("something is wrong with Service Execution");
          }
        });
    } 
  }

  showRemarks(status){
    if(status == "HO")
    {
     // this.reqcode = 1;
      this.show=true;
    }
    else if(status == "AR"){
     // this.reqcode = 2;
      this.show=true;
    }
    else{
      this.show=false;
    //  this.reqcode = 0;
    }
  }

  openDialogSkill(): void {
    
    if(this.requisitionDetails){
      this.skillCode = this.requisitionDetails['Data'][0]['SkillSetcode'];   
    }
    else{
      this.skillCode = '';
    }
   
    const dialogRef = this.dialog.open(AddskillComponent, {
      width: '600px',
      data: {checkedValue: this.showwithCheckedSkill,skillcode:this.skillCode}      
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.action === 1) {
        this.selectSkillset = result['data']; 
        this.showwithCheckedSkill = result['array'];    
        this.descriptionSkill = this.selectSkillset.map(element => element.Description);   
      }
    });   
  }

  openDialogCompetency(): void {

    if(this.requisitionDetails){
      this.compCode = this.requisitionDetails['Data'][0]['Competencycode'];
    }
    else{
      this.compCode = '';
    }

    const dialogRef = this.dialog.open(AddcompetencyComponent, {
      width: '600px',
      data: {checkedValue: this.showwithCheckedcomp,Compcode:this.compCode}      
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result && result.action === 1) {
        this.selectCompetency = result['data'];
        this.showwithCheckedcomp = result['array'];   
        this.descriptionCompetency= this.selectCompetency.map(element => element.Description);     
      }
    });    
  }

  openDialogEducation(): void {

    if(this.requisitionDetails){
      this.eduCodes = this.requisitionDetails['Data'][0]['EduQlfncode'];
    }
    else{
      this.eduCodes = '';
    }

    const dialogRef = this.dialog.open(AddeducationComponent, {
      width: '600px',      
      data: {checkedValue: this.showwithCheckedEduc,Educode:this.eduCodes}
    });  
    
    dialogRef.afterClosed().subscribe(result => {
      if(result && result.action === 1) {
        this.selectEducation = result['data']; 
        this.showwithCheckedEduc = result['array'];    
        this.descriptionEducation= this.selectEducation.map(element => element.Description);  
      }
    });
  }


  openSnackBar() { 
    var x = document.getElementById("snackbar")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800);
  }


 /* add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;   
    if ((value || '').trim()) {
      this.selectCompetency.push({Description: value.trim()});
    }
    if (input) {
      input.value = '';
    }
  }

  removeCompetency(item): void {
    const index = this.selectCompetency.indexOf(item);
    if (index >= 0) {
      this.selectCompetency.splice(index, 1);
    }   
  }
  removeSkillset(item): void {
    const index = this.selectSkillset.indexOf(item);
    if (index >= 0) {
      this.selectSkillset.splice(index, 1);
    }
  }
  removeEducation(item): void {
    const index = this.selectEducation.indexOf(item);
    if (index >= 0) {
      this.selectEducation.splice(index, 1);
    }
  }*/

  @ContentChild(MatFormFieldControl,{static:true}) _control: MatFormFieldControl<any>;
  @ViewChild(MatFormField,{static:true}) _matFormField: MatFormField;

 // options: string[] = ['Innovatus', 'Tata Consultancy Service', 'Cognizant'];
  filteredOptions: Observable<any>;

  ngOnInit() {
      this._matFormField._control = this._control;
      this.getlkupLocation();
      this.getlkupBudgetType();
      this.getlkupBudgetCurrency();
      this.getlkupEmploymenyType();
      this.getlkupHiringManager();      
      this.getlkupDeliveryManager();
      this.getlkupBusinessFunction();
      this.getlkupClient();
      this.getlkupAccountManager();
      
      $(function () {
        $('input[type="file"]').change(function () {
             if ($(this).val() != "") {
                    $(this).css('color', '#333');
             }else{
                    $(this).css('color', 'transparent');
             }
        });
      });

    /*  this.filteredOptions = this.cloneRequisitionForm.get('ClientId').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );*/
  
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

  getlkupDeliveryManager() {
    this.SharedServices.getDeliveryManager().subscribe(
      response => {
        if (response != '') {         
          this.LkupDeliveryManager = response;
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }  

  getlkupBusinessFunction() {
    this.SharedServices.getBusinessFunction().subscribe(
      response => {
        if (response != '') {         
          this.LkupBusinessFunction = response;
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

  get f() { return this.cloneRequisitionForm.controls; }

  fileChange(event) {
    this.fileList  = event.target.files;
  }


  cloneRequisition(formObj){
    
    this.submitted = true;

    if (this.cloneRequisitionForm.invalid) {
      return;
    }
    var userId = sessionStorage.getItem("uniqueSessionId");    
    var userName = sessionStorage.getItem("userName");

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    if (userId && this.id != 0){   
     
      var confirm = window.confirm('Do you want to clone this requisition?');
      
      if (confirm == true) {         
        if(this.selectCompetency){ 
          const CompetencyCode= this.selectCompetency.map(element => element.Code);
          this.selCompCode = CompetencyCode.join(';'); 
        }
        else if(this.requisitionDetails){
          this.selCompCode = this.requisitionDetails['Data'][0]['Competencycode'];   
        }
        
        if(this.selectSkillset){ 
          const SkillsetCode= this.selectSkillset.map(element => element.Code);
          this.selSkillCode = SkillsetCode.join(';');  
        }
        else if(this.requisitionDetails){
          this.selSkillCode = this.requisitionDetails['Data'][0]['SkillSetcode'];   
        }        
        if(this.selectEducation){ 
          const EducationCode= this.selectEducation.map(element => element.Code);
          this.selEduCode = EducationCode.join(';');
        }
        else if(this.requisitionDetails){
          this.selEduCode = this.requisitionDetails['Data'][0]['EduQlfncode'];   
        } 

        this.CloneServices.cloneRequisitions(formObj,this.fileList,this.selCompCode,this.selSkillCode,this.selEduCode,this.id).subscribe(
          response => {  
            if (response != "No data") {
              let getMessage =  response['Message'].split(":");
              if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
                this.message = getMessage['1'];
                this.openSnackBar(); 
              }          
              else{
                this.message = getMessage['1'];
                this.openSnackBar();
                this.routerObj.navigate(["/req-dashboard/DR"]);
              }            
            }
            else {         
              console.log('something is wrong with Service Execution');
            }        
          },
          error => console.log("Error Occurd!")
        );  
      }     
    }
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

    this.CloneServices.downloadJDLink(reqId).subscribe(
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

  requisition_validation_messages = {
    'Reqtitle': [
      { type: 'required', message: 'Please enter requisition title' }      
    ],
    'EmploymentType': [
      { type: 'required', message: 'Please select employment type' }
    ],
    'ClientId': [
      { type: 'required', message: 'Please select client' }
    ],
    'EACManager': [
      { type: 'required', message: 'Please select account manager' }
    ],
    'Emplocation': [
      { type: 'required', message: 'Please select location' }
    ],
    'Noofposition': [
      /*{ type: 'required', message: 'Please enter number of position' },*/
      { type: 'pattern', message: 'Please enter valid position' }
    ],
    'BudgetType': [
      { type: 'required', message: 'Please select budget type' }
    ],
    'Budgetccy': [
      { type: 'required', message: 'Please select budget currency' }
    ],
    'Hiringmanager': [
      { type: 'required', message: 'Please select contact person' }
    ],
    'Minexperience': [
      { type: 'min', message: 'Please enter valid minimum experience' }
    ],
    'Maxexperience': [
      { type: 'max', message: 'Please enter valid maximum experience' }
    ],
    'Budgetminamt': [
      { type: 'min', message: 'Please enter valid minimum amount' }
    ],
    'Budgetmaxamt': [
      { type: 'max', message: 'Please enter valid maximum amount' }
    ],
    'Jobdescription': [
      { type: 'required', message: 'Please enter job description' }
    ]
  }
}
