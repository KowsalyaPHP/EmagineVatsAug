import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SharedService } from '../shared/shared.service';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AboutreleaseService } from './aboutrelease.service';

@Component({
  selector: 'app-aboutrelease',
  templateUrl: './aboutrelease.component.html',
  styleUrls: ['./aboutrelease.component.css']
})
export class AboutreleaseComponent implements OnInit {

  message:any;
  aboutContent:any;

  constructor(private AboutreleaseServices: AboutreleaseService,public dialogRef: MatDialogRef<AboutreleaseComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
    this.aboutReleaseContent();
   }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openSnackBar() { 
    var x = document.getElementById("aboutrelease")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800);
  }

  aboutReleaseContent(){

    this.AboutreleaseServices.aboutRelease().subscribe(
      response => {
        if (response != "No data") {
          let getMessage =  response['Message'].split(":");
          if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
            this.message = getMessage['1'];
            this.openSnackBar();
            $("#loader").css("display", "none");
          }         
          else {                     
           this.aboutContent=response['Data'];
          }
        } else {
            console.log("something is wrong with Service Execution");
        }       
      },
      error => console.log(error)
    );
  }

}
