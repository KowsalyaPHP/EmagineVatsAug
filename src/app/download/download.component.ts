import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { DownloadService } from './download.service';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialog} from '@angular/material';
import { ToastrService } from 'ngx-toastr'; 
import { TemplateComponent } from '../template/template.component';
import { saveAs } from 'file-saver';
declare var $: any

interface Fields {
  Field_Id: any;
  Field_Display_Name: string;
  checked?: boolean;
}

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
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {
 
  message:any;  
  templateList:[];
  public StageValueList: Applicationlist[];
  submitted = false;
  id:any;
  public FieldList: Fields[];
  Fieldselect:any;
  FieldselectId:any;
  templateSingle:[];
  FieldListData:any;
  stage:any;
  templateId:any;
  selectedApplication:any;
  selectedApplicationId:any;
  selectedCandidateId:any;

  constructor(private routerObj: Router,private DownloadServices: DownloadService,private formBuilderObj: FormBuilder,private route: ActivatedRoute,public dialogRef: MatDialogRef<DownloadComponent>,@Inject(MAT_DIALOG_DATA) public data:any,private toastr: ToastrService,public dialog: MatDialog) {
    
    this.route.params.subscribe(params => {
      this.id = params['id'],
      this.stage = params['stage'] 
    }); 
   
    this.viewTemplateDetails();
    this.getCandidateValue();

   }

   onNoClick(): void {
    this.dialogRef.close();
   }

  ngOnInit() {
  }

  openSnackBar() { 
    var x = document.getElementById("dialogDownloadsnackbar")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800);
  }

  viewcustomTemplateDetails(){
 
    this.DownloadServices.viewTemplateDetails().subscribe(
      response => {  
        if (response != "No data") {
          let getMessage =  response['Message'].split(":");
          if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
            this.message = getMessage['1'];
            this.openSnackBar(); 
          }          
          else{ 
            this.templateList = response['Data']['templateDetail'];         
            this.FieldList = response['Data']['FieldDetails'];            
          }            
        }
        else {         
          console.log('something is wrong with Service Execution');
        }        
      },
      error => console.log("Error Occurd!")
    );  
  }

  viewTemplateDetails(){
   // $('#templateList0').addClass('selected');
    this.DownloadServices.viewTemplateDetails().subscribe(
      response => {  
        if (response != "No data") {
          let getMessage =  response['Message'].split(":");
          if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
            this.message = getMessage['1'];
            this.openSnackBar(); 
          }          
          else{ 
            this.templateList = response['Data']['templateDetail'];
            if(typeof(this.FieldListData) != 'undefined'){
              response['Data']['FieldDetails'].forEach(item => {
                for (let i = 0; i < this.FieldListData.length; i++) {                  
                  if(this.FieldListData[i] == item['Field_Id'])
                  {
                    item.checked = true;
                  }
                }               
              });
              this.FieldList = response['Data']['FieldDetails'];
            }
            else{
              this.FieldList = response['Data']['FieldDetails'];
            }

          }            
        }
        else {         
          console.log('something is wrong with Service Execution');
        }        
      },
      error => console.log("Error Occurd!")
    );  
  }

  viewSingleTemplate(templateId,index){

    this.templateId = templateId;

    this.DownloadServices.viewTemplateSingle(templateId).subscribe(
      response =>  { 
          if (response != "No data") {          
            let getMessage =  response['Message'].split(":");
            if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
              this.message = getMessage['1'];
              this.openSnackBar();               
            }
            else {                  
              this.FieldListData = response['Data'][0]['Field_List'].split(";"); 
              this.templateSingle = response['Data']; 
              this.viewTemplateDetails();
              setTimeout(() => {               
                $('#downtemplateList'+index).removeClass('selected');
                $('#downtemplateList'+index).addClass('selected');
                }
                , 400);
                
            }    
              
          } else {
          console.log("something is wrong with Service Execution"); 
          }
        },
        error => console.log(error)      
      );
    }

  getCandidateValue(){    
    this.DownloadServices.getStageValues(this.data['ReqId'],this.data['Stage']).subscribe(
      response => {
        if (response != "No data") {  
          this.StageValueList = response['Data']['SSAHNGrid'];  
        }
      }
    );
  }

  openDialogTemplate(): void {
  
    const dialogRef = this.dialog.open(TemplateComponent, {
      width: '600px',
      height:'900px',
     // data: {ReqId: reqId,Stage:stage}      
    });
    
    dialogRef.afterClosed().subscribe(result => {
        //this.viewcustomTemplateDetails();
    });    
  }

  downLoadFile(data: any) {  
    
    console.log(data.headers);  
    let contenType = data.headers.get("content-type");
    let contdisp = data.headers.get("content-disposition").split("=");
    let fileName = contdisp[1].trim();
    let blob = new Blob([data._body], {  type: contenType });  
    let file = new File([blob], fileName, { type: contenType});
    saveAs(file);

   /* let downloadZipUrl = 'http://myserver/test-download';
let json: any = {};
let headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('responseType', ResponseContentType.Blob);
headers.append('X-HTTP-Method-Override', 'GET');
this.http.post(downloadZipUrl, json, {headers: headers}).subscribe(response => {
var blob = new Blob([response['_body']], {type: 'application/zip'});
var url= URL.createObjectURL(blob);
window.open(url);*/
  }

  downloadTracker(){
    this.selectedApplication = this.StageValueList.filter( (application) => application.checked ); 
    this.selectedApplicationId = this.selectedApplication.map(element => element.ApplicationId);
    this.selectedCandidateId = this.selectedApplication.map(element => element.CandidateId);

  
    if(this.selectedApplication == ''){ 
      this.message = "Please select atleast one candidate to download tracker.";
      this.openSnackBar();
      return; 
    }


    this.DownloadServices.downloadTracker(this.data['ReqId'],this.templateId,this.selectedApplicationId,this.selectedCandidateId).subscribe(
      response =>  { 
          if (response != "No data") {          
           
             this.downLoadFile(response);  
              
              
          } else {
          console.log("something is wrong with Service Execution"); 
          }
        },
        error => console.log(error)      
      );
  }

 

}
