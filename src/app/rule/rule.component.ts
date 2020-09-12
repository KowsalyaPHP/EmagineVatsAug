import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { MatFormFieldControl, MatFormField, MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatChipInputEvent } from '@angular/material';
import { RuleaddComponent } from '../ruleadd/ruleadd.component';
import { RuleService } from './rule.service';
declare var $: any

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.css']
})
export class RuleComponent implements OnInit {

  RuleList:[];
  userName:any;

  constructor(private routerObj: Router,private RuleServices: RuleService,private route: ActivatedRoute,public dialog: MatDialog) { 
     this.userName = sessionStorage.getItem("userName");
     this.viewRuleList();
  }

  ngOnInit() {
  }

  opendialogaddrule() {
  
    const dialogRef = this.dialog.open(RuleaddComponent, {
      width: '700px',
      height: '600px',
      //data: {addType: type,Mode:mode}      
    });
    
    dialogRef.afterClosed().subscribe(result => {
      
    }); 
   
  }

  viewRuleList(){
    this.RuleServices.getRuleList().subscribe(
      response => {
        if (response != "No data") {
            this.RuleList = response['Data'];
        } else {
            console.log("something is wrong with Service Execution");
        }
      });
    }
}
