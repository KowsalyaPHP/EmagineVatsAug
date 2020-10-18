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
import { AddskillcompetencyService } from './addskillcompetency.service';

@Component({
  selector: 'app-addskillcompetency',
  templateUrl: './addskillcompetency.component.html',
  styleUrls: ['./addskillcompetency.component.css']
})
export class AddskillcompetencyComponent implements OnInit {

  addNewSkillForm: FormGroup;
  addNewCompetencyForm:FormGroup;
  message:any;
  showSkillForm = false;
  showCompetencyForm = false;

  constructor(private AddskillcompetencyServices: AddskillcompetencyService,private formBuilderObj: FormBuilder,public dialogRef1: MatDialogRef<AddskillcompetencyComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { 
    
    this.addNewSkillForm = this.formBuilderObj.group({
      SkillSetTitle: ['', Validators.required]
    });
    
    this.addNewCompetencyForm = this.formBuilderObj.group({
      CompetencyTitle: ['', Validators.required]
    });


    if(this.data['addType'] == 'skill'){
      this.showSkillForm = true;
    }   
    else if(this.data['addType'] == 'competency'){
      this.showCompetencyForm = true;
    }  
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef1.close();
  }

  openSnackBar() { 
    var x = document.getElementById("addskillcompetency")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800);
  }

  
  addNewSkillFormSubmit(formObj){

    if (this.addNewSkillForm.invalid) {
      return;
    }
    $("#loader").css("display", "block");

    this.AddskillcompetencyServices.addNewSkill(formObj).subscribe(
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
            this.dialogRef1.close({action: 1,data: response['Data']}); 
          }
        } else {
            console.log("something is wrong with Service Execution");
        }       
      },
      error => console.log(error)
    );
  }

  addNewCompetencyFormSubmit(formObj){

    if (this.addNewCompetencyForm.invalid) {
      return;
    }
    $("#loader").css("display", "block");

    this.AddskillcompetencyServices.addNewCompetency(formObj).subscribe(
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
            this.dialogRef1.close({action: 1, data: response['Data']});  
          }
        } else {
            console.log("something is wrong with Service Execution");
        }       
      },
      error => console.log(error)
    );
  }


  account_validation_messages = {
    'SkillSetTitle': [
      { type: 'required', message: 'Please enter title' }
    ],
    'CompetencyTitle':[
      { type: 'required', message: 'Please enter title' }
    ]
  }
}
