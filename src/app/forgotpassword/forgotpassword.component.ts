import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ForgotpasswordService } from './forgotpassword.service';

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
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  message:any;
  username:any;

  constructor(private ForgotpasswordServices: ForgotpasswordService,private formBuilderObj: FormBuilder,private routerObj: Router,private route: ActivatedRoute) { 
    this.forgotPasswordForm = this.formBuilderObj.group({
      NewPassword: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmNewPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, { 
      validator: ConfirmedValidator('NewPassword', 'ConfirmNewPassword')
    });

  }

  ngOnInit() {
  }

  openSnackBar() { 
    var x = document.getElementById("snackbar")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800);
  }

  forgotPasswordFormDetails(formObj) {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.route.params.subscribe(params => {
      this.username = params['username'];   
    });

    $("#Forgotloader").css("display", "block");
    this.ForgotpasswordServices.forgotpasswordDetails(formObj,this.username).subscribe(
      response => {
        if (response != "No data") {
          let getMessage =  response['Message'].split(":");
          if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
            this.message = getMessage['1'];
            this.openSnackBar();
            $("#Forgotloader").css("display", "none");
          }         
          else {               
            this.message = getMessage['1'];
            this.openSnackBar();      
            $("#Forgotloader").css("display", "none");       
            this.routerObj.navigate(["/"]);
          }
        } else {
            console.log("something is wrong with Service Execution");
        }
      },
      error => console.log(error)
    );
  }
  account_validation_messages = {
    'NewPassword': [
      { type: 'required', message: 'Please enter valid password' }    
    ],
    'ConfirmNewPassword': [
      { type: 'required', message: 'Please enter correct password' }
    ]
  }
}
