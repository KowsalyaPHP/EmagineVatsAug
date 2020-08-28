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
      UserStatus: ''
    });  

    this.getStatusLookup();
    this.getRoleList();
    this.getRuleList();

    var userName = sessionStorage.getItem("userName"); 

    if (userName && this.id != 0){           
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
    this.SharedServices.getRuleList().subscribe(
      response => {
        if (response != '') {         
          this.RuleList = response;
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
    ]
  }
}
