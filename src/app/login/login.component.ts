import { Component, OnInit,ViewChild,Input, Output, EventEmitter , TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { MatFormFieldControl, MatFormField} from '@angular/material';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective
} from "@angular/forms";
import { LoginService } from './login.service';
import { MatDialog } from '@angular/material';
declare var $: any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  submitted = false;
  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  modelform: any = 'false';
  signform: any = 'false';
  userValues: any = 'false';
  display='none';
  signdisplay='none';
  sessionID:any;
  message:any;

  @ViewChild('callAPIDialog',{static:true}) callAPIDialog: TemplateRef<any>;

  constructor(private LoginServices: LoginService,private formBuilderObj: FormBuilder,private routerObj: Router,private dialog: MatDialog) { 
    this.loginForm = this.formBuilderObj.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.forgotPasswordForm = this.formBuilderObj.group({
      UserId: ['', Validators.required]
    });

    var userName = sessionStorage.getItem("userName");

    if (typeof userName !== "undefined" && userName !== null) {         
      sessionStorage.clear();   
      this.routerObj.navigate(['/login']);
    }
  }
 
  @ViewChild(FormGroupDirective,{static:true}) formGroupDirective: FormGroupDirective;

  ngOnInit() {

  }
  
  callAPI() {
    let dialogRef = this.dialog.open(this.callAPIDialog);  
  }

forgotPasswordFormSubmit(formObj) {
  if (this.forgotPasswordForm.invalid) {
    return;
  }
  $("#Forgotloader").css("display", "block");
  this.LoginServices.forgotpasswordDetails(formObj).subscribe(
    response => {
      if (response != "No data") {
        let getMessage =  response['Message'].split(":");
        if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
          this.message = getMessage['1'];
          this.openSnackBar();
          $("#Forgotloader").css("display", "none");
        }         
        else {                     
          $("#Forgotloader").css("display", "none");       
          
        }
      } else {
          console.log("something is wrong with Service Execution");
      }
      this.dialog.closeAll();
    },
    error => console.log(error)
  );
}
  resetErrorForm(){
    this.loginForm.reset();           
    this.loginForm.controls.username.setErrors(null);
    this.loginForm.controls.password.setErrors(null);
    this.loginForm.updateValueAndValidity();
  }
  account_validation_messages = {
    'username': [
      { type: 'required', message: 'Please enter valid details' }
      /*{ type: 'minlength', message: 'Username must be at least 5 characters long' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters' },
      { type: 'validUsername', message: 'Your username has already been taken' }*/
    ],'UserId': [
      { type: 'required', message: 'Please enter valid details' }     
    ],
    'password': [
      { type: 'required', message: 'Please enter valid password' }
    ]
  }
  openSnackBar() { 
    var x = document.getElementById("snackbar")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800);
  }
  validateLoginDetails(formObj) {
    if (this.loginForm.invalid) {
      return;
    }
    $("#loader").css("display", "block");
    this.LoginServices.LoginUser(formObj).subscribe(
      response => {
        if (response != "No data") {
          let getMessage =  response['Message'].split(":");
          if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
            this.message = getMessage['1'];
            this.openSnackBar(); 
            this.resetErrorForm();
            $("#loader").css("display", "none");
          }         
          else {                     
            $("#loader").css("display", "none");
          
            this.sessionID = response['Data']["Userdetail"][0]["USERID"]; 
            sessionStorage.setItem("uniqueSessionId", this.sessionID);            
            sessionStorage.setItem("userName", response['Data']["Userdetail"][0]["USERNAME"]);
            sessionStorage.setItem("RefId", response['Data']["Userdetail"][0]["REFID"]);
            sessionStorage.setItem("USERMOBILENO", response['Data']["Userdetail"][0]["USERMOBILENO"]);
            sessionStorage.setItem("USERCATEGORY", response['Data']["Userdetail"][0]["USERCATEGORY"]);
            sessionStorage.setItem("ClientList", response['Data']["Userdetail"][0]["ClientList"]);
            sessionStorage.setItem("FunctionList", response['Data']["Userdetail"][0]["FList"]);
           // sessionStorage.setItem("userID", formObj.username);
            //sessionStorage.setItem("Menudetails", JSON.stringify(response['Data']["Menudetails"]));
           // sessionStorage.setItem("Roles", response['Data']["Roles"]);       
            
            this.routerObj.navigate(["/req-dashboard/OP"]);
          }
        } else {
            console.log("something is wrong with Service Execution");
        }
      },
      error => console.log(error)
    );
  }
  openForgetDialog(){
    this.modelform = 'true';
    this.display='block'; 
    this.userValues = 'true';
    
   // this.viewForm.patchValue({user_id: item.userid, user_name: item.username, password: item.password});
    //this.getCreateUser(Value);
  }
  openSignDialog(){
    this.signform = 'true';
    this.signdisplay='block'; 
    // this.viewForm.patchValue({user_id: item.userid, user_name: item.username, password: item.password});
    //this.getCreateUser(Value);
  }
  
  closeForgetDialog(){
    this.display='none';
  }
  closeSignDialog(){
    this.signdisplay='none';
  }
}
