import { Component, OnInit, Inject, ViewChild,Input, Output, EventEmitter , TemplateRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { CvtransferService } from './cvtransfer.service';
//import { CvtransferComponent } from '../cvtransfer/cvtransfer.component';

interface requisitionList {
  EntityId: any;
  RequisitionId: string;
  ReqTitle: string;
  Clientname: string;
  Positions: string;
  checked?: boolean;
}

@Component({
  selector: 'app-cvtransfer',
  templateUrl: './cvtransfer.component.html',
  styleUrls: ['./cvtransfer.component.css']
})
export class CvtransferComponent implements OnInit {

  CvCopyTransferForm: FormGroup;
  submitted = false;
  message:any;
  selectedRequisition:any;
  ReqId:any;

  public requisitionList: requisitionList[];

  constructor(private CvtransferServices: CvtransferService,public dialogRef: MatDialogRef<CvtransferComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private formBuilderObj: FormBuilder) { 
    
    this.CvCopyTransferForm = this.formBuilderObj.group({
      NewRequisitionId: ['', [Validators.required]]
    });    

   // this.viewRequisitions();
  }

  ngOnInit() {
   
  }

  openSnackBar() { 
    var x = document.getElementById("Cvsnackbar")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800);
  }

 /* viewRequisitions() {

    this.CvtransferServices.ViewRequisitionForCopyTransfer(this.data['ReqId'],this.data['selectId'],this.data['AppId']).subscribe(
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
            this.requisitionList = response['Data'];
         
            //this.dialogRef.close({action: 1, data: response['Data']});
          }            
          setTimeout(function () {
            $(function () {
              $('#CVTransferCopyDashboard').DataTable({
                scrollY: '310px'
              });    
              $("#loader").hide();
            });      
          }, 1500); 
        }
        else {         
          console.log('something is wrong with Service Execution');
        }        
      },
      error => console.log("Error Occurd!")
    );  
  }*/

  CVTransferToAnotherReq(formObj) {

    this.submitted = true;

    if (this.CvCopyTransferForm.invalid) {
      return;
    }

    this.CvtransferServices.CVTransferToAnotherReq(this.data['ReqId'],this.data['selectId'],formObj).subscribe(
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
            setTimeout(() => {
              this.dialogRef.close({action: 1, data: response['Data']});
            }
            , 3000);

          }            
        }
        else {         
          console.log('something is wrong with Service Execution');
        }        
      },
      error => console.log("Error Occurd!")
    );  
  }

  
CVCopyToAnotherReq(formObj) {

  this.submitted = true;

  if (this.CvCopyTransferForm.invalid) {
    return;
  }

  this.CvtransferServices.CVCopyToAnotherReq(this.data['ReqId'],this.data['selectId'],formObj).subscribe(
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
          setTimeout(() => {
            this.dialogRef.close({action: 2, data: response['Data']});
          }
          , 3000);
         
        }            
      }
      else {         
        console.log('something is wrong with Service Execution');
      }        
    },
    error => console.log("Error Occurd!")
  );  
  }

  validation_messages = {
    'NewRequisitionId': [
      { type: 'required', message: 'Please enter valid requisition id' }      
    ]
  }
}

