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
import { ScreeningService } from './screening.service';

@Component({
  selector: 'app-screening',
  templateUrl: './screening.component.html',
  styleUrls: ['./screening.component.css']
})
export class ScreeningComponent implements OnInit {

  screeningForm: FormGroup;
  LkupCurrency:[];
  Lkuplocation:[];
  message:any;
  id:any;
  screeningDetails:[]; 
  getUpdateValues:[];
  totalAmount:any;
  public name: any;
  constructor(public dialogRef: MatDialogRef<ScreeningComponent>,@Inject(MAT_DIALOG_DATA) public data:any,private SharedServices: SharedService,private ScreeningServices: ScreeningService,private formBuilderObj: FormBuilder,private routerObj: Router,private route: ActivatedRoute) {

    this.screeningForm = this.formBuilderObj.group({
      RecruitersComments: '',
      Experience:['', [Validators.required,Validators.max(50), Validators.min(0)]],
      LeavingReason:'',
      NoticePeriod:['', [Validators.max(200), Validators.min(0)]],
      BuyoutPoassibility:'',
      PrSalCurrency:['INR', [Validators.required]],
      PrSalFixed:['', [Validators.max(999999999), Validators.min(0)]],
      PrSalVariable:['', [Validators.max(999999999), Validators.min(0)]],
      PrSalTotal:['', [Validators.max(999999999), Validators.min(0)]],
      ExpSalCurrency:['INR', [Validators.required]],
      ExpSalary:['', [Validators.max(999999999), Validators.min(0)]],
      ExpHike:['', [Validators.max(99.9), Validators.min(0)]],
      PresentLocation:'',
      PrefLocation:'',
      SalaryComment:'',
      CommunicationSkils:'',
      OtherRemarks:'',
      ConfidentioalRemarks:''
    });    

  }
  
  ngOnInit() {

    this.getlkupCurrency();
    this.getlkupLocation();    
    this.viewscreeningForm(this.data['applicationId'],this.data['candidateId'],this.data['requisitionId']);
  
    /*$(function() {
      $('.present').keyup(function() {
          var total = 0;
          $('.present').each(function() {
              if( $(this).val() != '' )
                  total += Number($(this).val());
          });
        $(".total").val(total).trigger('input');
      });
     });*/
    
  }

  onKey(event: any){
    let hike = 0;
    if( event.target.value != '' ){
      hike += (((Number(event.target.value)-Number($(".total").val()))/Number($(".total").val()))*100);          
    }
    this.screeningForm.patchValue({ExpHike: hike.toFixed(2)});
  }
  
  calculateAverage(){
    let sum = 0
    $(".present").each(function(){
      if( $(this).val() != '' )
      sum += Number($(this).val());
    })
    this.screeningForm.patchValue({PrSalTotal: sum});    
  } 

  onNoClick(): void {
    this.dialogRef.close({action:0});
  }

  openSnackBar() { 
    var x = document.getElementById("snackbar")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800);
  }

  getlkupCurrency() {
    this.SharedServices.getBudgetCurrency().subscribe(
      response => {
        if (response != '') {         
          this.LkupCurrency = response;
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }  

  getlkupLocation() {
    this.SharedServices.getLocation().subscribe(
      response => {
        if (response != '') {         
          this.Lkuplocation = response;
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }



  addScreeningDetails(formObj){
    this.route.params.subscribe(params => {
      this.id = params['id'];     
    }); 
    if (this.screeningForm.invalid) {
      return;
    }
    this.ScreeningServices.addScreeningDetails(formObj,this.data['applicationId'],this.data['requisitionId'],this.data['candidateId']).subscribe(
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
  
  viewscreeningForm(appId,CandId,ReqId){

    this.ScreeningServices.viewScreeningDetails(appId,CandId,ReqId).subscribe(
      response => {
        if (response != "No data") {
          if (response == "Login Failed") {           
            alert ("Your given details are not existed.");
            this.routerObj.navigate(["/login"]);           
          }
          else {                     
            this.screeningDetails = response;   
           
            if(this.screeningDetails['Data'] != null){
              this.screeningForm.patchValue({             
                  RecruitersComments: this.screeningDetails['Data'][0]['RecruitersComments'],
                  Experience:this.screeningDetails['Data'][0]['Experience'],
                  LeavingReason:this.screeningDetails['Data'][0]['LeavingReason'],
                  NoticePeriod:this.screeningDetails['Data'][0]['NoticePeriod'],
                  BuyoutPoassibility:this.screeningDetails['Data'][0]['BuyoutPoassibility'],
                  PrSalCurrency:this.screeningDetails['Data'][0]['PrSalCurrencyCode'],            
                  PrSalFixed:this.screeningDetails['Data'][0]['PrSalFixed'],
                  PrSalVariable:this.screeningDetails['Data'][0]['PrSalVariable'],
                  PrSalTotal:this.screeningDetails['Data'][0]['PrSalTotal'],
                  ExpSalCurrency:this.screeningDetails['Data'][0]['ExpSalCurrencyCode'],
                  ExpSalary:this.screeningDetails['Data'][0]['ExpSalary'],
                  ExpHike:this.screeningDetails['Data'][0]['ExpHike'],
                  PresentLocation:this.screeningDetails['Data'][0]['PrLocationCode'],
                  PrefLocation:this.screeningDetails['Data'][0]['PrefrdLocationCode'],
                  SalaryComment:this.screeningDetails['Data'][0]['SalaryComment'],
                  CommunicationSkils:this.screeningDetails['Data'][0]['CommunicationSkils'],
                  OtherRemarks:this.screeningDetails['Data'][0]['OtherRemarks'],
                  ConfidentioalRemarks:this.screeningDetails['Data'][0]['ConfidentioalRemarks']                
              });            
            }
          }
        } else {
            console.log("something is wrong with Service Execution");
        }
      });
  }

  screen_validation_messages = {   
    'Experience': [
      { type: 'required', message: 'Please enter experience' }
    ],
    'PrSalCurrency': [
      { type: 'required', message: 'Please select present salary' }
    ],
    'ExpSalCurrency': [      
      { type: 'max', message: 'Please select present salary'}
    ],
    'PrSalFixed': [
      { type: 'max', message: 'Maximum limit reached'}
    ],
    'PrSalVariable': [
      { type: 'max', message: 'Maximum limit reached'}
    ],
    'PrSalTotal': [
      { type: 'max', message: 'Maximum limit reached'}
    ],
    'ExpSalary': [
      { type: 'max', message: 'Maximum limit reached'}
    ],
    'ExpHike': [
      { type: 'max', message: 'Maximum limit reached'}
    ]
  }
}
