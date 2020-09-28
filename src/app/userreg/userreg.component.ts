import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { UserregService } from './userreg.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-userreg',
  templateUrl: './userreg.component.html',
  styleUrls: ['./userreg.component.css']
})
export class UserregComponent implements OnInit {
  
  addUserForm: FormGroup;
  submitted = false;
  id:any;
  message:any;
  userSingle:[];
  VLookupStatus:[];
  RoleList:[];
  RuleList:[];
  userName:any;
  ClientList:[];
  VendorList:[];
  userCategory:any;
  sessionUserName:any;
  userCategoryName:any;
  
  constructor(private formBuilderObj: FormBuilder,private routerObj: Router,private UserregServices: UserregService,private SharedServices: SharedService,private route: ActivatedRoute) {

    this.route.params.subscribe(params => {
      this.id = params['id'];     
    }); 

    this.addUserForm = this.formBuilderObj.group({     
      usercategory: ['', [Validators.required]],      
      UserMrMs: '',
      UserName: ['', [Validators.required]],
      UserRemarks:'',
      UserEmail: ['', [Validators.pattern("[a-z A-Z,0-9,.,_]+@[a-z A-Z]+[.]+[a-z A-Z,.]+")]],
      UserContactNo:  ['', [Validators.required,Validators.pattern("[0-9]\\d{9}")]],
      userRole: ['', [Validators.required]],
      userRule: ['', [Validators.required]],
      UserStatus: '',
      clientName: '',
      vendorName: ''
    });  

    this.getStatusLookup();
    this.getRoleList();
    this.getRuleList();
    this.getClientList();
    this.getVendorList();
    this.userCategory = sessionStorage.getItem("USERCATEGORY");
    this.sessionUserName = sessionStorage.getItem("userName"); 

    if(this.userCategory != '' && this.userCategory == 'C'){
      this.userCategoryName = 'Client';
      this.addUserForm.patchValue({           
        usercategory:this.userCategoryName,
        clientName:this.sessionUserName
      }); 

    }
    else if(this.userCategory != '' && this.userCategory == 'V'){
      this.userCategoryName = 'Vendor';
      this.addUserForm.patchValue({           
        usercategory:this.userCategoryName,
        vendorName:this.sessionUserName
      }); 
    }

    if (this.sessionUserName && this.id != 0){           
      this.viewSingleUser(this.id);
    }
   }

  ngOnInit() {
  }

  openSnackBar() { 
    var x = document.getElementById("snackbar")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800);
  }

  get f() { return this.addUserForm.controls; }

  userType(userType){
    
    if(userType == 'C')
    {
     /* if(this.addUserForm.get('AgencyFees_percent').value != '')
      { 
        const variable = this.addUserForm.get('AgencyFees_percent');  
        this.addUserForm.get('AgencyFees_percent').setValidators([Validators.required]);      
        variable.updateValueAndValidity();
      }*/
      $("#vendorlist").hide();
      $("#clientlist").show();          
               
    }
    else if(userType == 'V'){
      $("#clientlist").hide();
      $("#vendorlist").show();
    }    
    else{
      $("#vendorlist").hide();
      $("#clientlist").hide();
    }
  }
  viewSingleUser(userId){

    this.UserregServices.viewUserSingleProfile(userId).subscribe(
      response =>  { 
          if (response != "No data") {          
            let getMessage =  response['Message'].split(":");
            if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
              this.message = getMessage['1'];
              this.openSnackBar(); 
            }
            else {                     
              this.userSingle = response;
              this.userName = this.userSingle['Data'][0]['USERNAME'];
              this.addUserForm.patchValue({           
                usercategory: this.userSingle['Data'][0]['USERCATEGORY'],
                UserMrMs:this.userSingle['Data'][0]['USERMRMS'],
                UserName:this.userSingle['Data'][0]['USERNAME'],
                UserRemarks:this.userSingle['Data'][0]['Remarks'],
                UserEmail:this.userSingle['Data'][0]['USEREMAIL'],
                UserContactNo:this.userSingle['Data'][0]['USERCONTACTNO'],
                userRole:this.userSingle['Data'][0]['UserRoles'],
                userRule:this.userSingle['Data'][0]['UserDataRule'],
                UserStatus:this.userSingle['Data'][0]['STATUSCODE']
              }); 
            }    
              
          } else {
          console.log("something is wrong with Service Execution"); 
          }
        },
        error => console.log(error)      
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

  getRoleList() {
    this.SharedServices.getRoleList().subscribe(
      response => {
        if (response != '') {         
          this.RoleList = response;
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }

  
  getRuleList() {
    this.UserregServices.getRuleList().subscribe(
      response => {
        if (response != '') {         
          this.RuleList = response['Data'];
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }

  
  getClientList() {
    this.SharedServices.getClientList().subscribe(
      response => {
        if (response != '') {         
          this.ClientList = response;
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }
  
  getVendorList() {
    this.SharedServices.getVendorList().subscribe(
      response => {
        if (response != '') {         
          this.VendorList = response;
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }

  addUser(formObj){

    this.submitted = true;

    if (this.addUserForm.invalid) {
      return;
    }

    var userId = sessionStorage.getItem("uniqueSessionId");    
    var userName = sessionStorage.getItem("userName");

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    if (userId && this.id != 0){   
      
      var confirm = window.confirm('Do you want to update the user details?');
      if (confirm == true) {    
       
        this.UserregServices.UpdateUserDetails(formObj,this.id).subscribe(
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
                this.routerObj.navigate(['user']);
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
    
      var confirm = window.confirm('Do you want to add this user details?');
      
      if (confirm == true) {         
        
        this.UserregServices.addUserDetails(formObj).subscribe(
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
                this.routerObj.navigate(['user']);
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

  validation_messages = {
    'usercategory': [
      { type: 'required', message: 'Please select user category' }      
    ],
    'UserName': [
      { type: 'required', message: 'Please enter user name' }      
    ],
    'UserEmail': [
      { type: 'pattern', message: 'Please enter email id' }
    ],
    'UserContactNo': [
      { type: 'pattern', message: 'Please enter contact number' }
    ],
    'userRole': [
      { type: 'pattern', message: 'Please enter user role' }      
    ],
    'userRule': [
      { type: 'pattern', message: 'Please enter user rule' }
    ],
    'UserStatus': [
      { type: 'pattern', message: 'Please enter user status' }
    ],
    'clientName': [
      { type: 'required', message: 'Please select client name' }      
    ],
    'vendorName': [
      { type: 'required', message: 'Please select vendor name' }      
    ]
  }
}
