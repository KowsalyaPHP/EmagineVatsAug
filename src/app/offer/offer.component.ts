import { Component, OnInit, ContentChild, ViewChild,Inject,Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { SharedService } from '../shared/shared.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { OfferService } from './offer.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  offerForm: FormGroup;
  message:any;
  id:any;
  date:any;
  assessmentDetails:[]; 
  getUpdateValues:[];
  minDate = new Date();
  maxDate:any;

  constructor(public dialogRef: MatDialogRef<OfferComponent>,@Inject(MAT_DIALOG_DATA) public data:any,private SharedServices: SharedService,private OfferServices: OfferService,private formBuilderObj: FormBuilder,private routerObj: Router,private route: ActivatedRoute,private datePipe : DatePipe) {

    this.offerForm = this.formBuilderObj.group({
      JoiningDate: '',
      SalaryOffered:['', [Validators.max(999999999), Validators.min(0)]],
      BillableCTC:['', [Validators.max(999999999), Validators.min(0)]],
      AgencyFees:['', [Validators.max(999999999), Validators.min(0)]],
      GSTYesNo:'',
      Remarks:'',      
      AgencyFee_Mode:['flatrate'],
     // variable: ['', [Validators.required,Validators.max(100), Validators.min(0)]]
      AgencyFees_percent: ''
    });    

    
  }
  
  ngOnInit() {
    let currentdate = new Date();
    this.maxDate = new Date(currentdate.setMonth(currentdate.getMonth() + 2));    
    this.viewofferForm(this.data['applicationId'],this.data['candidateId'],this.data['requisitionId']);
  }

  onNoClick(): void {
    this.dialogRef.close({action:0});
  }

  openSnackBar() { 
    var x = document.getElementById("snackbar")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800);
  }

  textboxMode(mode){
    
    if(mode == 'variable')
    {
      if(this.offerForm.get('AgencyFees_percent').value != '.')
      { 
        const variable = this.offerForm.get('AgencyFees_percent');    
        //variable.setValidators(Validators.required);
        this.offerForm.get('AgencyFees_percent').setValidators([Validators.required]);      
        variable.updateValueAndValidity();
      }
      $("#displayVariable").show();
      //$("#variable").removeAttr("disabled");
      $("#variable").prop('readonly', false);
      $("#agencyfee").prop('readonly', true);
     // $("#variable").prop('disabled', false);   
     // $("#agencyfee").prop('disabled', true);       
    }
    else{
      $("#displayVariable").hide();
      $("#variable").prop('readonly', true);
      $("#agencyfee").prop('readonly', false);
    //  $("#variable").prop('disabled', true);  
    //  $("#agencyfee").prop('disabled', false); 
    }    
  }

  onPercentageEnter(event: any){
    let percentage = 0;
    if( event.target.value != '' ){
      percentage += ((Number($("#BillableCTC").val())*Number($("#variable").val()))/100);          
    }
    this.offerForm.patchValue({AgencyFees: percentage});
  }
  
  addOfferFormDetails(formObj){

    if (this.offerForm.invalid) {
      return;
    }
    this.route.params.subscribe(params => {
      this.id = params['id'];     
    }); 

    this.date = this.datePipe.transform(formObj.JoiningDate, 'MM/dd/yyyy');

    this.OfferServices.addOfferDetails(formObj,this.data['applicationId'],this.data['requisitionId'],this.data['candidateId'],this.date).subscribe(
      response => {  
        if (response != "No data") {
          let getMessage =  response['Message'].split(":");
          if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
            this.message = getMessage['1'];
            this.openSnackBar(); 
          }          
          else{
            this.getUpdateValues = response['Data'];    
            this.dialogRef.close({action:1,values: this.getUpdateValues});  
          }                   
        }
        else {         
          console.log('something is wrong with Service Execution');
        }        
      },
      error => console.log("Error Occurd!")
    );  
  }   

  viewofferForm(appId,CandId,ReqId){

    this.OfferServices.viewofferDetails(appId,CandId,ReqId).subscribe(
      response => {
        if (response != "No data") {
          if (response == "Login Failed") {           
            alert ("Your given details are not existed.");
            this.routerObj.navigate(["/login"]);           
          }
          else {                     
            this.assessmentDetails = response;   
           
            if(this.assessmentDetails['Data'] != null){
              this.offerForm.patchValue({             
                  JoiningDate: this.assessmentDetails['Data'][0]['JoiningDate'],
                  SalaryOffered:this.assessmentDetails['Data'][0]['SalaryOffered'],
                  BillableCTC:this.assessmentDetails['Data'][0]['BillableCTC'],
                  AgencyFees:this.assessmentDetails['Data'][0]['AgencyFees'],
                  AgencyFee_Mode:this.assessmentDetails['Data'][0]['AgencyFee_Mode'],
                  AgencyFees_percent:this.assessmentDetails['Data'][0]['AgencyFees_percent'],
                  GSTYesNo:this.assessmentDetails['Data'][0]['GSTYesNo'],
                  Remarks:this.assessmentDetails['Data'][0]['Remarks']                                  
              });            
            }
          }
        } else {
            console.log("something is wrong with Service Execution");
        }
      });
  }

  validation_messages = {
    'JoiningDate': [
      { type: 'required', message: 'Please enter joining date' }      
    ],
    'SalaryOffered': [
      { type: 'required', message: 'Please enter salary offer' }
    ],
    'BillableCTC': [
      { type: 'required', message: 'Please enter billablectc' }
    ],
    'AgencyFees': [
      { type: 'required', message: 'Please enter agency fees' }
    ],
    'GSTYesNo': [
      { type: 'required', message: 'Please select GST' }
    ],
    'AgencyFees_percent': [
      { type: 'required', message: 'Please enter agency fees percentage' }
    ]
  }
}
