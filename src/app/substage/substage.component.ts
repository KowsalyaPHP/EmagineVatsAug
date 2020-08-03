import { Component, OnInit, ContentChild, ViewChild,Inject,Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators, FormArray
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { SharedService } from '../shared/shared.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SubstageService } from './substage.service';

@Component({
  selector: 'app-substage',
  templateUrl: './substage.component.html',
  styleUrls: ['./substage.component.css']
})
export class SubstageComponent implements OnInit {

  substageForm: FormGroup;
  message:any;
  assessmentDetails:[]; 
  radioSelected: any;
  round_details = [
    {name: 'Round 1'},
    {name: 'Round 2'},
    {name: 'Round 3'},
    {name: 'Round 4'}
  ]
  currentstage:any;

  constructor(public dialogRef: MatDialogRef<SubstageComponent>,@Inject(MAT_DIALOG_DATA) public data:any,private SharedServices: SharedService,private SubstageServices: SubstageService,private formBuilderObj: FormBuilder,private routerObj: Router,private route: ActivatedRoute) {
   
    this.substageForm = this.formBuilderObj.group({
      Remarks: ''
    }); 

  }
  
  ngOnInit() {
    this.viewAssessmentForm(this.data['applicationId'],this.data['candidateId'],this.data['requisitionId']);
    
  }

  onNoClick(): void {
    this.dialogRef.close({action:0});
  }

  error(){
    $("#errormessage").hide();
    $("#errormsg").hide();
  }

  openSnackBar() { 
    var x = document.getElementById("snackbar")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800);
  }

  addSubstageDetails(formObj){

    if(this.radioSelected == undefined){   
      $("#errormessage").show();     
      return;
    }
    else{
      $("#errormessage").hide();
    }

    if (this.substageForm.invalid) {
      return;
    }
    if(this.radioSelected == this.currentstage){
      $("#errormsg").show();  
      return;
    } 
    else{
      $("#errormsg").hide();
    }


    this.SubstageServices.addAssementDetails(formObj,this.data['applicationId'],this.data['requisitionId'],this.data['candidateId'],this.radioSelected,this.currentstage).subscribe(
      response => {  
        if (response != "No data") {
          let getMessage =  response['Message'].split(":");
          if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
            this.message = getMessage['1'];
            this.openSnackBar();  
          }          
          else{
           // this.message = getMessage['1'];
           // this.openSnackBar();
           
           // this.routerObj.navigate(['manage/',this.data['requisitionId'],this.data['currentStage']]);
            this.dialogRef.close({action:1});  
          }                   
        }
        else {         
          console.log('something is wrong with Service Execution');
        }        
      },
      error => console.log("Error Occurd!")
    );  
  }     
  
  viewAssessmentForm(appId,CandId,ReqId){
    this.currentstage = "Assessment";
    this.SubstageServices.viewAssessmentDetails(appId,CandId,ReqId).subscribe(
      response => {
        if (response != "No data") {
          if (response == "Login Failed") {           
            alert ("Your given details are not existed.");
            this.routerObj.navigate(["/login"]);           
          }
          else {                     
            this.assessmentDetails = response; 
            
            if(this.assessmentDetails['Data'] != null){
              
              if(this.assessmentDetails['Data'][0]['CurrentStage'] == "AS"){
                this.currentstage = "Assessment";
              }
              else{
                this.currentstage = this.assessmentDetails['Data'][0]['CurrentStage'];
                this.radioSelected = this.assessmentDetails['Data'][0]['CurrentStage'];
                this.round_details.forEach(item => {                                    
                    if(this.round_details == this.currentstage)
                    {
                      this.radioSelected.checked = true;
                    }                              
                });                
              }
              this.substageForm.patchValue({             
                Remarks: this.assessmentDetails['Data'][0]['Remarks']
              });            
            }
          }
        } else {
            console.log("something is wrong with Service Execution");
        }
      });
  }
}
