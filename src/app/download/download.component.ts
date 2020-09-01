import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { DownloadService } from './download.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

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

  constructor(private routerObj: Router,private DownloadServices: DownloadService,private formBuilderObj: FormBuilder,private route: ActivatedRoute,public dialogRef: MatDialogRef<DownloadComponent>,@Inject(MAT_DIALOG_DATA) public data:any) {
    
   

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
    var x = document.getElementById("snackbar")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800);
  }

  viewTemplateDetails(){
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
        }
        else {         
          console.log('something is wrong with Service Execution');
        }        
      },
      error => console.log("Error Occurd!")
    );  
  }

  viewSingleTemplate(templateId){
    
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

}
