import { Component, OnInit,Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { ResetpasswordService } from './resetpassword.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  
  message:any;
  
  constructor(private ResetpasswordServices: ResetpasswordService,public dialogRef: MatDialogRef<ResetpasswordComponent>,@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
  }

  
  openSnackBar() { 
    var x = document.getElementById("resetsnackbar")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800);
  }


  sendResetPassword(){
   
    this.ResetpasswordServices.sendResetPassword(this.data['userId']).subscribe(
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
            this.message = getMessage['1'];
            this.openSnackBar(); 
            setTimeout(() => {
              this.dialogRef.close({action: 1}); 
            }
            , 3000);     
            
          }
        } else {
            console.log("something is wrong with Service Execution");
        }       
      },
      error => console.log(error)
    );
  }

}
