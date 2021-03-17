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
import { AddcityComponent } from '../addcity/addcity.component';
import { MatDialog } from '@angular/material';

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
  RuleList1:[];
  userName:any;
  ClientList:[];
  VendorList:[];
  DesignationList:[];
  userCategory:any;
  sessionTypeName:any;
  userCategoryName:any;
  categoryName:any;
  show=false;
  functionList:any;
  funclist:any;
  
  constructor(private formBuilderObj: FormBuilder,private routerObj: Router,private UserregServices: UserregService,private SharedServices: SharedService,private route: ActivatedRoute,private dialog: MatDialog) {

    this.route.params.subscribe(params => {
      this.id = params['id'];     
    }); 

    this.addUserForm = this.formBuilderObj.group({     
      usercategory: ['', [Validators.required]],      
      UserMrMs: '',
      UserName: ['', [Validators.required]],
      UserLastName:['', [Validators.required]],
      UserRemarks:'',
      UserEmail: ['', [Validators.pattern("[a-z A-Z,0-9,.,_]+@[a-z A-Z]+[.]+[a-z A-Z,.]+")]],
      UserContactNo:  ['', [Validators.required,Validators.pattern("[0-9]\\d{9}")]],
      userRole: ['', [Validators.required]],
      userRule: ['', [Validators.required]],
      UserStatus: '',
      clientName: '',
      vendorName: '',
      Designation:''
    });  

    this.getStatusLookup();
    this.getRoleList();
    this.getRulebyId(sessionStorage.getItem("RefId"));
    this.getClientList();
    this.getVendorList();
    this.getDesignationList();
    this.userCategory = sessionStorage.getItem("USERCATEGORY");
    this.sessionTypeName = sessionStorage.getItem("Refname"); 

    if(this.userCategory != '' && this.userCategory == 'C'){
      this.userCategoryName = 'Client';
      this.addUserForm.patchValue({           
        usercategory:this.userCategoryName,
        clientName:this.sessionTypeName
      }); 
      $("#clientName").prop('readonly', true);
    }
    else if(this.userCategory != '' && this.userCategory == 'V'){
      this.userCategoryName = 'Vendor';
      this.addUserForm.patchValue({           
        usercategory:this.userCategoryName,
        vendorName:this.sessionTypeName
      }); 
      $("#vendorName").prop('readonly', true);
    }
    else{
      this.userCategoryName = 'Emagine';
      this.addUserForm.patchValue({           
        usercategory:this.userCategoryName
      }); 
    }

    if (this.sessionTypeName && this.id != 0){           
      this.viewSingleUser(this.id);
    }
   }

  ngOnInit() {
    this.funclist = sessionStorage.getItem("FunctionList");      
    if(typeof(this.funclist) != 'object')
    this.functionList = this.funclist.split(','); 
  }

  openSnackBar() { 
    var x = document.getElementById("snackbar")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800);
  }

  get f() { return this.addUserForm.controls; }

  getRulebyId(EntityId){
    this.show=true;
    this.UserregServices.getRuleListbyId(EntityId).subscribe(
      response => {
        if (response != '') {         
          this.RuleList1 = response['Data'];
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }

 /* getRulebyId1(EntityId){
    this.show = false;
    this.UserregServices.getRuleListbyId(EntityId).subscribe(
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
  }*/

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
      $("#designationlist").hide();         
               
    }
    else if(userType == 'V'){
      $("#clientlist").hide();
      $("#vendorlist").show();
      $("#designationlist").hide();
    }    
    else{
      $("#vendorlist").hide();
      $("#clientlist").hide();
      $("#designationlist").show();
      
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
              
              if(sessionStorage.getItem("USERCATEGORY") != 'E') {
                if( this.userSingle['Data'][0]['USERCATEGORY'] == 'C'){
                  this.categoryName = 'Client';                
                }
                else if( this.userSingle['Data'][0]['USERCATEGORY'] == 'V'){
                  this.categoryName = 'Vendor';
                }
              } 
              else{
                this.categoryName = this.userSingle['Data'][0]['USERCATEGORY'];
                $("#designationlist").show();
              }

              //const toSelect = this.RuleList1['Data'].find(c => c.DataAccessRuleId == this.userSingle['Data'][0]['UserDataRule']);
              this.addUserForm.get('userRule').setValue(this.userSingle['Data'][0]['UserDataRule']);

              this.addUserForm.patchValue({           
                usercategory: this.categoryName,
                UserMrMs:this.userSingle['Data'][0]['USERMRMS'],
                UserName:this.userSingle['Data'][0]['USERNAME'],
                UserLastName:this.userSingle['Data'][0]['USERLastNAME'],
                UserRemarks:this.userSingle['Data'][0]['Remarks'],
                UserEmail:this.userSingle['Data'][0]['USEREMAIL'],
                UserContactNo:this.userSingle['Data'][0]['USERCONTACTNO'],
                userRole:this.userSingle['Data'][0]['UserRoles'],
                userRule:this.userSingle['Data'][0]['DataRuleName'],
                UserStatus:this.userSingle['Data'][0]['STATUSCODE'],
                Designation:this.userSingle['Data'][0]['DesignationCode']
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

  
  /*getRuleList() {
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
  }*/

  
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

  getDesignationList() {
    this.SharedServices.getDesignation().subscribe(
      response => {
        if (response != '') {         
          this.DesignationList = response;
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
                this.routerObj.navigate(['user'], { skipLocationChange: true });
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
                this.routerObj.navigate(['user'], { skipLocationChange: true });
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
openDialogaddNewCity(): void {
  
  const dialogRef = this.dialog.open(AddcityComponent, {
    width: '400px',
    data: {addType: 'skill'}      
  });
  
  dialogRef.afterClosed().subscribe(result => {
    if(result && result.action === 1) {
    } 
  });    
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
    ],
    'UserLastName': [
      { type: 'required', message: 'Please enter last name' }      
    ]
  }
}
