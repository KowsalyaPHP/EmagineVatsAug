import { Component, OnInit,Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { RuleaddService } from './ruleadd.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-ruleadd',
  templateUrl: './ruleadd.component.html',
  styleUrls: ['./ruleadd.component.css']
})
export class RuleaddComponent implements OnInit {

  addRuleForm: FormGroup;
  submitted = false;
  message:any;
  ClientList=[];

  constructor(private routerObj: Router,private RuleaddServices: RuleaddService,private formBuilderObj: FormBuilder,private route: ActivatedRoute,public dialogRef: MatDialogRef<RuleaddComponent>,@Inject(MAT_DIALOG_DATA) public data:any,private SharedServices: SharedService) {

    this.addRuleForm = this.formBuilderObj.group({
      DataAccessRuleName: ['', [Validators.required]],
      clientName: ['', [Validators.required]]
    });

    this.getClientList();
  }

  ngOnInit() {
  }

  openSnackBar() { 
    var x = document.getElementById("snackbar")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800);
  }

  addRule(formObj) {

    this.submitted = true;
 
    if (this.addRuleForm.invalid) {
      return;
    }
    this.RuleaddServices.addRules(formObj).subscribe(
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
            this.dialogRef.close({action: 1, data: response['Data']});
          }            
        }
        else {         
          console.log('something is wrong with Service Execution');
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  validation_messages = {
    'DataAccessRuleName': [
      { type: 'required', message: 'Please enter rule name' }      
    ],
    'clientName': [
      { type: 'required', message: 'Please enter client name' }      
    ]

  }

}
