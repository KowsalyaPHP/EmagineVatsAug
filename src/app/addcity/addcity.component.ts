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
import { AddcityService } from './addcity.service';

@Component({
  selector: 'app-addcity',
  templateUrl: './addcity.component.html',
  styleUrls: ['./addcity.component.css']
})
export class AddcityComponent implements OnInit {
  
  addNewCityForm: FormGroup;
  message:any;
  city:any;

  constructor(private AddcityServices: AddcityService,private formBuilderObj: FormBuilder,public dialogRef: MatDialogRef<AddcityComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
    this.addNewCityForm = this.formBuilderObj.group({
      CityName: ['', Validators.required]
    });
   }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openSnackBar() { 
    var x = document.getElementById("addcity")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800);
  }

  addNewCityFormSubmit(formObj){

    this.AddcityServices.addNewCity(formObj).subscribe(
      response => {
        if (response != "No data") {
          let getMessage =  response['Message'].split(":");
          if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
            this.message = getMessage['1'];
            this.openSnackBar();
            $("#loader").css("display", "none");
          }         
          else {      
            this.message = getMessage['1'];
            this.openSnackBar();     
            $("#loader").css("display", "none"); 
            setTimeout(() => {
              this.dialogRef.close({action: 1, data: response['Data']});
            }
            , 3000);                       
           //this.city=response;
          }
        } else {
            console.log("something is wrong with Service Execution");
        }       
      },
      error => console.log(error)
    );
  }

  account_validation_messages = {
    'CityName': [
      { type: 'required', message: 'Please enter city name' }
    ]
  }
}
