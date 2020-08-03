import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ChangepasswordService } from './Changepassword.service'

export function ConfirmedValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.ConfirmedValidator) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ ConfirmedValidator: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})



export class ChangepasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  message:any;
  sessionID:any;

  constructor(private formBuilderObj: FormBuilder,private routerObj: Router,private ChangepasswordServices: ChangepasswordService) { 

    this.changePasswordForm = this.formBuilderObj.group({
      OldPassword: ['', Validators.required],
      NewPassword: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, { 
      validator: ConfirmedValidator('NewPassword', 'ConfirmPassword')
    }
    );  
    if(this.changePasswordForm.get('OldPassword').value == this.changePasswordForm.get('NewPassword').value)
    { /*   
      account_validation_messages = {
        'OldPassword': [
          { type: 'required', message: 'Please enter current password' }
          /*{ type: 'minlength', message: 'Username must be at least 5 characters long' },
          { type: 'maxlength', message: 'Username cannot be more than 25 characters long' },
          { type: 'pattern', message: 'Your username must contain only numbers and letters' },
          { type: 'validUsername', message: 'Your username has already been taken' }
        ],
        'NewPassword': [
          { type: 'required', message: 'Please enter new password' }
        ],
      }
      this.SignupVendorForm.get('PINCODE').setValidators([Validators.pattern("[0-9]*")]);      
      pincodeControl.updateValueAndValidity();*/
    }
  }

  ngOnInit() {
  }

  openSnackBar() { 
    var x = document.getElementById("snackbar")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800);
  }

 
  ChangePasswordDetails(formObj) {
     
    this.ChangepasswordServices.changePassword(formObj).subscribe(
      response => {
        if (response != "No data") {
          let getMessage =  response['Message'].split(":");
          if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
            this.message = getMessage['1'];
            this.openSnackBar();            
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
  
  account_validation_messages = {
    'OldPassword': [
      { type: 'required', message: 'Please enter current password' }
      /*{ type: 'minlength', message: 'Username must be at least 5 characters long' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters' },
      { type: 'validUsername', message: 'Your username has already been taken' }*/
    ],
    'NewPassword': [
      { type: 'required', message: 'Please enter new password' }
    ],
    'ConfirmPassword': [
      { type: 'required', message: 'Please enter correct confirm password' }
    ]
  }
}
