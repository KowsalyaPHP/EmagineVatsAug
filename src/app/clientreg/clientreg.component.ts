import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { ClientregService } from './clientreg.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-clientreg',
  templateUrl: './clientreg.component.html',
  styleUrls: ['./clientreg.component.css']
})
export class ClientregComponent implements OnInit {

  addClientForm: FormGroup;
  submitted = false;
  message:any;
  cityLookups:[];
  LookupCategory:[];
  LookupType:[];
  CLookupStatus:[];
  id:any;
  clientSingle:[];

  constructor(private ClientregServices: ClientregService,private SharedServices: SharedService,private formBuilderObj: FormBuilder,private routerObj: Router,private route: ActivatedRoute) {

    this.addClientForm = this.formBuilderObj.group({
      ClientName: ['', [Validators.required]],
      RegdAddressL1: ['', [Validators.required]],
      Area: ['', [Validators.required]],
      City:['', [Validators.required]],
      PINCODE:['', [Validators.required]],
      ClientPhoneNo:['', [Validators.required]],
      ClientMobileNo: ['', [Validators.required]],
      ClientEMAILID:['', [Validators.required]],
      MainContact:['', [Validators.required]],
      MainContactDesgn: '',
      MainContactNo:'',
      MainContactEmailId: '',
      AltContact: ['', [Validators.required]],
      AltContactDesgn: '',
      AltContactNo: '',
      AltContactEmailId:'',
      ClientGSTNo:'',
      ClientLandMark:'',
      ClientCategory:['', [Validators.required]],
      ClientType:['', [Validators.required]] ,
      MasterClientID:'',
      ClientGLCode:'',     
      AccountManager:'',
      Coordinator:'',
    });    

    this.cityLookup();
    this.getCLookupCategories();
    this.getCLookupTypes();
    this.getStatusLookup();
    //this.viewClientDetails();

    this.route.params.subscribe(params => {
      this.id = params['id'];     
    }); 

    var userName = sessionStorage.getItem("userName");  
    if (userName && this.id != 0){           
      this.ClientregServices.viewClientSingleProfile(this.id).subscribe(
        response =>  { 
            if (response != "No data") {          
              let getMessage =  response['Message'].split(":");
              if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
                this.message = getMessage['1'];
                this.openSnackBar(); 
              }
              else {                     
                this.clientSingle = response;   
              
                this.addClientForm.patchValue({
                  ClientName: this.clientSingle['Data'][0]['ClientName'],
                  RegdAddressL1:this.clientSingle['Data'][0]['RegdAddressL1'],
                  Area:this.clientSingle['Data'][0]['Area'],
                  City:this.clientSingle['Data'][0]['CityCode'],
                  PINCODE:this.clientSingle['Data'][0]['PINCODE'],
                  ClientPhoneNo:this.clientSingle['Data'][0]['ClientPhoneNo'],
                  ClientMobileNo:this.clientSingle['Data'][0]['ClientMobileNo'],
                  ClientEMAILID:this.clientSingle['Data'][0]['ClientEMAILID'],
                  MainContact:this.clientSingle['Data'][0]['MainContact'],
                  MainContactDesgn:this.clientSingle['Data'][0]['MainContactDesgn'],
                  MainContactNo:this.clientSingle['Data'][0]['MainContactNo'],
                  MainContactEmailId:this.clientSingle['Data'][0]['MainContactEmailId'],
                  AltContact:this.clientSingle['Data'][0]['AltContact'],
                  AltContactDesgn:this.clientSingle['Data'][0]['AltContactDesgn'],
                  AltContactNo:this.clientSingle['Data'][0]['AltContactNo'],
                  AltContactEmailId:this.clientSingle['Data'][0]['AltContactEmailId'],
                  ClientGSTNo:this.clientSingle['Data'][0]['ClientGSTNo'],
                  ClientLandMark:this.clientSingle['Data'][0]['ClientLandMark'],
                  ClientCategory:this.clientSingle['Data'][0]['ClientCategoryCode'],
                  ClientType:this.clientSingle['Data'][0]['ClientTypeCode'],
                  MasterClientID:this.clientSingle['Data'][0]['MasterClientID'],
                  ClientGLCode:this.clientSingle['Data'][0]['ClientGLCode'],
                  AccountManager:this.clientSingle['Data'][0]['AccountManager'],
                  Coordinator:this.clientSingle['Data'][0]['Coordinator'],
                }); 
              }    
                
            } else {
            console.log("something is wrong with Service Execution"); 
            }
          },
          error => console.log(error)      
        );
    }
    
  }
  
   


  ngOnInit() {
  }

  openSnackBar() { 
    var x = document.getElementById("snackbar")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800);
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

  getCLookupCategories() {
    this.SharedServices.getCLookupCategory().subscribe(
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

  getCLookupTypes() {
    this.SharedServices.getCLookupType().subscribe(
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

  getStatusLookup() {
    this.SharedServices.getCLookupStatus().subscribe(
      response => {
        if (response != '') {         
          this.CLookupStatus = response;
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }

  get f() { return this.addClientForm.controls; }

  addClient(formObj){

    this.submitted = true;

    if (this.addClientForm.invalid) {
      return;
    }

    var userId = sessionStorage.getItem("uniqueSessionId");    
    var userName = sessionStorage.getItem("userName");

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    if (userId && this.id != 0){   
      
      var confirm = window.confirm('Do you want to update the client details?');
      if (confirm == true) {    
       
        this.ClientregServices.UpdateClientDetails(formObj,this.id).subscribe(
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
               // this.routerObj.navigate(['req-dashboard/',formObj['ReqStatus']]);
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
    
      var confirm = window.confirm('Do you want to add this client details?');
      
      if (confirm == true) {         
        
        this.ClientregServices.addClientDetails(formObj).subscribe(
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
  }
    
  }

  viewClientDetails(){
    this.ClientregServices.viewClientDetails().subscribe(
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
    'ClientName': [
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
    'ClientPhoneNo': [
      { type: 'pattern', message: 'Please enter phone number' }
    ],
    'ClientMobileNo': [
      { type: 'pattern', message: 'Please enter mobile number' }
    ],
    'ClientEMAILID': [
      { type: 'pattern', message: 'Please enter email id' }
    ],
    'MainContact': [
      { type: 'pattern', message: 'Please enter main contact' }
    ],
    'AltContact': [
      { type: 'pattern', message: 'Please enter alternate contact' }
    ],
    'ClientCategory': [
      { type: 'pattern', message: 'Please enter client category' }
    ],
    'ClientType': [
      { type: 'pattern', message: 'Please enter client type' }
    ]
  }
}
