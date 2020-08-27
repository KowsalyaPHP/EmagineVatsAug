import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { VendorregService } from './vendorreg.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-vendorreg',
  templateUrl: './vendorreg.component.html',
  styleUrls: ['./vendorreg.component.css']
})
export class VendorregComponent implements OnInit {

  addVendorForm: FormGroup;
  cityLookups:[];
  LookupCategory:[];
  LookupType:[];
  LookupExpertise:[];
  VLookupStatus:[];
  submitted = false;
  message:any;
  id:any;
  vendorSingle:[];
  vendorList:[];
  vendorname:any;
  
  constructor(private formBuilderObj: FormBuilder,private routerObj: Router,private VendorregServices: VendorregService,private SharedServices: SharedService,private route: ActivatedRoute) { 
    
    this.route.params.subscribe(params => {
      this.id = params['id'];     
    }); 

    this.addVendorForm = this.formBuilderObj.group({     
      VendorName: ['', [Validators.required]],      
      RegdAddressL1: ['', [Validators.required]],
      Area: ['', [Validators.required]],
      City:['', [Validators.required]],
      PINCODE: ['', [Validators.required]],
      VendorPhoneNo: ['', [Validators.required,Validators.pattern("[0-9]\\d{9}")]],
      VendorMobileNo:['', [Validators.required,Validators.pattern("[0-9]\\d{9}")]],
      VendorEMAILID: ['', [Validators.required,Validators.pattern("[a-z A-Z,0-9,.,_]+@[a-z A-Z]+[.]+[a-z A-Z,.]+")]],
      MainContact:['', [Validators.required]],
      MainContactDesgn:'',
      MainContactNo:['', [Validators.pattern("[0-9]\\d{9}")]],
      MainContactEmailId:['', [Validators.pattern("[a-z A-Z,0-9,.,_]+@[a-z A-Z]+[.]+[a-z A-Z,.]+")]],
      AltContact:['', [Validators.required]],
      AltContactDesgn:'',
      AltContactNo:['', [Validators.pattern("[0-9]\\d{9}")]],
      AltContactEmailId:['', [Validators.pattern("[a-z A-Z,0-9,.,_]+@[a-z A-Z]+[.]+[a-z A-Z,.]+")]],               
      VendorGSTNo:'' ,
      VendorLandMark:'',    
      VendorTier: '',
      VendorExpertise:'' ,
      VendorType:'' ,
      TeamSize:'' ,
      AllowedUserCt:'',
      ConcurrentUserCt:'',
      CommonPoolYorN:'' ,
      OwnPoolPermitYorN:'' ,
      AdminRightsYorN:'',            
      VendorGLCode:'',
      VendorStatus:''
    });  

    this.cityLookup();
    this.getVLookupCategories();
    this.getVLookupTypes();
    this.getVLookupExpertises();
    this.getStatusLookup();
    this.viewVendorDetails();

    

    var userName = sessionStorage.getItem("userName"); 

    if (userName && this.id != 0){           
      this.viewSingleVendor(this.id);
    }
  }

  ngOnInit() {
  }

  cityLookup() {
    this.SharedServices.getLkupCity().subscribe(
      response => {
        if (response != '') {         
          this.cityLookups = response;
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }

  getVLookupCategories() {
    this.SharedServices.getVLookupCategory().subscribe(
      response => {
        if (response != '') {         
          this.LookupCategory = response;
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }

  getVLookupTypes() {
    this.SharedServices.getVLookupType().subscribe(
      response => {
        if (response != '') {         
          this.LookupType = response;
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }
  getVLookupExpertises() {
    this.SharedServices.getVLookupExpertise().subscribe(
      response => {
        if (response != '') {         
          this.LookupExpertise = response;
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }
  getStatusLookup() {
    this.SharedServices.getVLookupStatus().subscribe(
      response => {
        if (response != '') {         
          this.VLookupStatus = response;
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }

  openSnackBar() { 
    var x = document.getElementById("snackbar")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800);
  }

  getId(id){
    this.viewSingleVendor(id);
  }

  viewSingleVendor(vendorId){
    this.VendorregServices.viewVendorSingleProfile(vendorId).subscribe(
      response =>  { 
          if (response != "No data") {          
            let getMessage =  response['Message'].split(":");
            if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
              this.message = getMessage['1'];
              this.openSnackBar(); 
            }
            else {                     
              this.vendorSingle = response;   
              this.vendorname =  this.vendorSingle['Data'][0]['VendorName'];

              this.addVendorForm.patchValue({
                VendorName: this.vendorSingle['Data'][0]['VendorName'],
                RegdAddressL1:this.vendorSingle['Data'][0]['RegdAddressL1'],
                Area:this.vendorSingle['Data'][0]['Area'],
                City:this.vendorSingle['Data'][0]['CityCode'],
                PINCODE:this.vendorSingle['Data'][0]['PINCODE'],
                VendorPhoneNo:this.vendorSingle['Data'][0]['VendorPhoneNo'],
                VendorMobileNo:this.vendorSingle['Data'][0]['VendorMobileNo'],
                VendorEMAILID:this.vendorSingle['Data'][0]['VendorEMAILID'],
                VendorGSTNo:this.vendorSingle['Data'][0]['VendorGSTNo'],
                VendorLandMark:this.vendorSingle['Data'][0]['VendorLandMark'],
                MainContact:this.vendorSingle['Data'][0]['MainContact'],
                MainContactDesgn:this.vendorSingle['Data'][0]['MainContactDesgn'],
                MainContactNo:this.vendorSingle['Data'][0]['MainContactNo'],
                MainContactEmailId:this.vendorSingle['Data'][0]['MainContactEmailId'],
                AltContact:this.vendorSingle['Data'][0]['AltContact'],
                AltContactDesgn:this.vendorSingle['Data'][0]['AltContactDesgn'],
                AltContactNo:this.vendorSingle['Data'][0]['AltContactNo'],
                AltContactEmailId:this.vendorSingle['Data'][0]['AltContactEmailId'],                 
                VendorTier:this.vendorSingle['Data'][0]['VendorTierCode'],
                VendorExpertise:this.vendorSingle['Data'][0]['VendorExpertiseCode'],
                VendorType:this.vendorSingle['Data'][0]['VendorTypeCode'],
                TeamSize:this.vendorSingle['Data'][0]['TeamSize'],
                VendorGLCode:this.vendorSingle['Data'][0]['VendorGLCode'],
                AllowedUserCt:this.vendorSingle['Data'][0]['AllowedUserCt'],
                ConcurrentUserCt:this.vendorSingle['Data'][0]['ConcurrentUserCt'],
                CommonPoolYorN:this.vendorSingle['Data'][0]['CommonPoolYorN'],
                OwnPoolPermitYorN:this.vendorSingle['Data'][0]['OwnPoolPermitYorN'],
                AdminRightsYorN:this.vendorSingle['Data'][0]['AdminRightsYorN'],
                VendorStatus:this.vendorSingle['Data'][0]['VendorStatusCode']                
              }); 
            }    
              
          } else {
          console.log("something is wrong with Service Execution"); 
          }
        },
        error => console.log(error)      
      );
  }

  get f() { return this.addVendorForm.controls; }

  addVendor(formObj){

    this.submitted = true;

    if (this.addVendorForm.invalid) {
      return;
    }
    

    var userId = sessionStorage.getItem("uniqueSessionId");    
    var userName = sessionStorage.getItem("userName");

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    if (userId && this.id != 0){   
      
      var confirm = window.confirm('Do you want to update the vendor details?');
      if (confirm == true) {    
       
        this.VendorregServices.UpdateVendorDetails(formObj,this.id).subscribe(
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
                this.routerObj.routeReuseStrategy.shouldReuseRoute = () => false;
                this.routerObj.navigate(['vendorreg/0']);
              }            
            }            
            else{
              console.log('something is wrong with Service Execution');
            }
          },
          error => console.log("Error Occurd!")
        );
      }
    }
    else{
    
      var confirm = window.confirm('Do you want to add this vendor details?');
      
      if (confirm == true) {         
        
        this.VendorregServices.addVendorDetails(formObj).subscribe(
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
                this.routerObj.routeReuseStrategy.shouldReuseRoute = () => false;
                window.location.reload();
                //this.routerObj.navigate(['vendorreg/0']);
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

  
  viewVendorDetails(){
    this.VendorregServices.viewVendorDetails().subscribe(
      response => {  
        if (response != "No data") {
          let getMessage =  response['Message'].split(":");
          if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
            this.message = getMessage['1'];
            this.openSnackBar(); 
          }          
          else{
            this.vendorList = response['Data'];
            //this.routerObj.navigate(['manage/',this.id,'SO']);
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
    'VendorName': [
      { type: 'required', message: 'Please enter client name' }      
    ],
    'RegdAddressL1': [
      { type: 'required', message: 'Please enter door no,address' }      
    ],
    'Area': [
      { type: 'required', message: 'Please enter area' }
    ],
    'City': [
      { type: 'required', message: 'Please select city' }
    ],
    'PINCODE': [
      { type: 'pattern', message: 'Please enter pincode' }      
    ],
    'VendorPhoneNo': [
      { type: 'pattern', message: 'Please enter phone number' }
    ],
    'VendorMobileNo': [
      { type: 'pattern', message: 'Please enter mobile number' }
    ],
    'VendorEMAILID': [
      { type: 'pattern', message: 'Please enter email id' }
    ],
    'MainContact': [
      { type: 'pattern', message: 'Please enter main contact' }
    ],
    'AltContact': [
      { type: 'pattern', message: 'Please enter alternate contact' }
    ],
    'VendorCategory': [
      { type: 'pattern', message: 'Please enter vendor category' }
    ],
    'VendorType': [
      { type: 'pattern', message: 'Please enter vendor type' }
    ],
    'VendorExpertise': [
      { type: 'pattern', message: 'Please enter vendor expertise' }
    ],
    'VendorTier': [
      { type: 'pattern', message: 'Please enter vendor tier' }
    ],
    'VendorStatus': [
      { type: 'pattern', message: 'Please enter vendor status' }
    ],
    'MainContactNo': [
      { type: 'pattern', message: 'Please enter correct main contact no' }
    ],
    'MainContactEmailId': [
      { type: 'pattern', message: 'Please enter correct main email id' }
    ],
    'AltContactNo': [
      { type: 'pattern', message: 'Please enter correct alternate contact no' }
    ],
    'AltContactEmailId': [
      { type: 'pattern', message: 'Please enter correct alternate mail id' }
    ]
  }

}
