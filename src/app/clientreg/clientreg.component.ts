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
declare var $: any

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
  clientList :[];
  LkupClient:[];
  LkupAccountManager:[];
  LkupClientStatus:[];
  child:any;
  clientname:any;
  clientname1:any;
  childList:[];
  clientId:any;
  type:any;
  getChildType:any;
  userCategory:any;

  constructor(private ClientregServices: ClientregService,private SharedServices: SharedService,private formBuilderObj: FormBuilder,private routerObj: Router,private route: ActivatedRoute) {
    
    this.route.params.subscribe(params => {
      this.id = params['id'] 
    }); 

    this.addClientForm = this.formBuilderObj.group({
      ClientName: ['', [Validators.required]],
      RegdAddressL1: '',
      Area: '',
      City:'',
      PINCODE:'',
      ClientPhoneNo:['', [Validators.pattern("[0-9]\\d{9}")]],
      ClientMobileNo: ['', [Validators.required,Validators.pattern("[0-9]\\d{9}")]],
      ClientEMAILID:['', [Validators.required,Validators.pattern("[a-z A-Z,0-9,.,_]+@[a-z A-Z]+[.]+[a-z A-Z,.]+")]],
      MainContact:'',
      MainContactDesgn: '',
      MainContactNo:['', [Validators.pattern("[0-9]\\d{9}")]],
      MainContactEmailId:['', [Validators.pattern("[a-z A-Z,0-9,.,_]+@[a-z A-Z]+[.]+[a-z A-Z,.]+")]],
      AltContact: '',
      AltContactDesgn: '',
      AltContactNo: ['', [Validators.pattern("[0-9]\\d{9}")]],
      AltContactEmailId:['', [Validators.pattern("[a-z A-Z,0-9,.,_]+@[a-z A-Z]+[.]+[a-z A-Z,.]+")]],
      ClientGSTNo:'',
      ClientLandMark:'',    
      ClientCategory:'',
      ClientType:'' ,
      MasterClientID:[this.id],
      ClientGLCode:'',     
      AccountManager:'',
      Coordinator:'',
      clientstatus:''
    });    

    this.cityLookup();
    this.getCLookupCategories();
    this.getCLookupTypes();
    this.getStatusLookup();
    this.getlkupAccountManager();
    this.getlkupClient();
    this.getLkupClientStatus();
    this.viewClientDetails();
    this.clientname = sessionStorage.getItem("clientname");
    this.userCategory = sessionStorage.getItem("USERCATEGORY");
    
   var userName = sessionStorage.getItem("userName");
   if (userName && this.id != 0){              
    this.viewSingleClient(this.id);
  //  this.routerObj.routeReuseStrategy.shouldReuseRoute = () => false;
  }  
  /* console.log(this.getChildType);
    if (userName && this.id != 0 &&  this.child == 0 && this.getChildType != 'C'){              
      this.viewSingleClient(this.id);
      console.log('P'+this.getChildType);
    }
    else if(userName && this.id != 0 && this.child == 1 && this.getChildType == 'C'){
      this.viewSingleClient(this.id);
      console.log('V'+this.getChildType);
    }*/
  }
  
   

  ngOnInit() {
    
   
  }

  getId(clientid){  
    this.viewSingleClient(clientid);
  }

  childlist(clientid){
    this.clientId = clientid;
    this.viewChildClientDetails(clientid);    
  }

  getMasterId(clientId){
    this.getChildType = 'P';
    //this.routerObj.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  viewSingleClient(clientId){
    this.ClientregServices.viewClientSingleProfile(clientId).subscribe(
      response =>  { 
          if (response != "No data") {          
            let getMessage =  response['Message'].split(":");
            if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
              this.message = getMessage['1'];
              this.openSnackBar(); 
            }
            else {                     
              this.clientSingle = response; 
              sessionStorage.setItem("clientname", this.clientSingle['Data'][0]['ClientName']);  
              this.clientname = this.clientSingle['Data'][0]['ClientName'];
               
              $("#ClientName").prop('readonly', true);
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
                MasterClientID:this.clientSingle['Data'][0]['MASTERCLIENTID"'],
                clientstatus:this.clientSingle['Data'][0]['ClientStatusCode'],                  
                ClientGLCode:this.clientSingle['Data'][0]['CLIENTGLCODE'],
                AccountManager:this.clientSingle['Data'][0]['AccountManagerCode'],
                Coordinator:this.clientSingle['Data'][0]['CoordinatorCode'],
              }); 
            }    
              
          } else {
          console.log("something is wrong with Service Execution"); 
          }
        },
        error => console.log(error)      
      );
  }


  getlkupClient() {
    this.SharedServices.getHiringManager().subscribe(
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

  getLkupClientStatus() {
    this.SharedServices.getLkupClientStatus().subscribe(
      response => {
        if (response != '') {         
          this.LkupClientStatus = response;
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
      this.id = params['id']     
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
                this.routerObj.routeReuseStrategy.shouldReuseRoute = () => false; 
                setTimeout(() => {
                  this.routerObj.navigate(['clientreg/'+this.id]);
                  }
                  , 3000);
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
               
               this.routerObj.routeReuseStrategy.shouldReuseRoute = () => false;
               setTimeout(() => {
                this.routerObj.navigate(['clientreg/'+response['Data']]);
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
  }
    
  }

  viewChildClientDetails(clientId){
    this.ClientregServices.viewChildClientDetails(clientId).subscribe(
      response => {  
        if (response != "No data") {
          let getMessage =  response['Message'].split(":");
          if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
           // this.message = getMessage['1'];
           // this.openSnackBar(); 
          }          
          else{
            this.childList = response['Data'];
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
            this.clientList = response['Data'];
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
      { type: 'pattern', message: 'Please  enter phone number'}
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
      { type: 'required', message: 'Please enter client category' }
    ],
    'ClientType': [
      { type: 'required', message: 'Please enter client type' }
    ],
    'AccountManager': [
      { type: 'required', message: 'Please select account manager' }
    ],
    'Coordinator': [
      { type: 'required', message: 'Please select coordinator' }
    ],
    'MainContactNo': [
      { type: 'pattern', message: 'Please enter correct main contact no ' }
    ],
    'MainContactEmailId': [
      { type: 'pattern', message: 'Please enter correct main mail id' }
    ],
    'AltContactNo': [
      { type: 'pattern', message: 'Please enter correct alternate contact no' }
    ],
    'AltContactEmailId': [
      { type: 'pattern', message: 'Please enter correct alternate contact email id' }
    ]
  }
}
