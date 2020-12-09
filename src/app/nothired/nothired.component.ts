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
import { NothiredService } from './nothired.service';

@Component({
  selector: 'app-nothired',
  templateUrl: './nothired.component.html',
  styleUrls: ['./nothired.component.css']
})

export class NothiredComponent implements OnInit {

  notHiredForm: FormGroup;
  message:any;
  LkupNotHiredReason:[];
  selectedCandidate: any;
  NotHiredDetails:any;
  nothiredDetails:[];
  submitted = false;
  private control: FormArray;
  
  constructor(public dialogRef: MatDialogRef<NothiredComponent>,@Inject(MAT_DIALOG_DATA) public data:any,private SharedServices: SharedService,private NothiredServices: NothiredService,private formBuilderObj: FormBuilder,private routerObj: Router,private route: ActivatedRoute) {
  
    this.selectedCandidate = JSON.stringify(this.data['selectedValue']);
    
    let arr=[];  

    for(let i=0;i< this.data['selectedValue'].length;i++)  
    {     
      arr.push(this.BuildFormDynamic(this.data['selectedValue'][i]));      
    }  
        
    this.notHiredForm = this.formBuilderObj.group({ 
      NotHiredDetails: this.formBuilderObj.array(arr)
    });  

    /*this.notHiredForm = this.formBuilderObj.group({ 
      NotHiredDetails: this.formBuilderObj.array(arr, Validators.required)
    }); */

    this.control = <FormArray>this.notHiredForm.controls['NotHiredDetails'];
    
  }

  getControls(frmGrp: FormGroup, key: string) {
    return (<FormArray>frmGrp.controls[key]).controls;
  }

  BuildFormDynamic(value):FormGroup{  
    return this.formBuilderObj.group({  
          CandidateName:[value.Candidate_FN], 
          CandidateId:[value.CandidateId],    
          ApplicationId:[value.ApplicationId],            
          Reason:[''],  
          Remarks :['']  
     })  
  }


  ngOnInit() {
    this.getlkupNotHiredReason();   
  }

  onNoClick(): void {
    this.dialogRef.close({action:0});
  }

  get f() { return this.notHiredForm.controls; }

  getlkupNotHiredReason() {

    this.submitted = true;
 
    if (this.notHiredForm.invalid) {
      return;
    }
    if(this.data['CStage'] == "CR"){
      this.SharedServices.getLkupClientRejectReason().subscribe(
        response => {
          if (response != '') {         
            this.LkupNotHiredReason = response;
          }
          else {         
            console.log('something is wrong with Service  Execution');
          }
        },
        error => console.log("Error Occurd!")
      );
    }
    else{
      this.SharedServices.getLkupInternalRejectReason().subscribe(
        response => {
          if (response != '') {         
            this.LkupNotHiredReason = response;
          }
          else {         
            console.log('something is wrong with Service  Execution');
          }
        },
        error => console.log("Error Occurd!")
      );
    }
  }  

  addNothiredReason(formObj){

    if (this.notHiredForm.invalid) {
      return;
    }
    
    this.NothiredServices.addNotHiredReason(JSON.stringify(formObj['NotHiredDetails']),this.data['requisitionId']).subscribe(
      response => {
        if (response != '') {         
        //  this.LkupNotHiredReason = response;
        this.dialogRef.close({action:1,stage: this.data['CStage']}); 
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );

  }

  validation_messages = {
    'Reason': [
      { type: 'required', message: 'Please select reason' }      
    ]
  }
  
}
