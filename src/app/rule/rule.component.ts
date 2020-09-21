import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { MatFormFieldControl, MatFormField, MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatChipInputEvent } from '@angular/material';
import { RuleaddComponent } from '../ruleadd/ruleadd.component';
import { RuleService } from './rule.service';
import { SharedService } from '../shared/shared.service';
declare var $: any

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.css']
})
export class RuleComponent implements OnInit {

  RuleList:[];
  userName:any;
  message:any;
  clientSingleList:any;
  ClientList:[];

  constructor(private routerObj: Router,private RuleServices: RuleService,private route: ActivatedRoute,public dialog: MatDialog,private SharedServices: SharedService) { 
     this.userName = sessionStorage.getItem("userName");
     this.viewRuleList();
     this.getClientList();
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
      if(result && result.action === 1) {
          this.viewRuleList();
      }
    }); 
   
  }

  openSnackBar() { 
    var x = document.getElementById("snackbar")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800);
  }

  getClientList() {
    this.SharedServices.getClientList().subscribe(
      response => {
        if (response != '') {         
          if(typeof(this.clientSingleList) != 'undefined' || this.clientSingleList != null){
            //this.disable=true;
            response.forEach(item => {
              for (let i = 0; i < this.clientSingleList.length; i++) {  
                console.log('eee'+this.clientSingleList);                
                if(this.clientSingleList[i] == item['Code'])
                {
                  item.checked = true;
                }
              }               
            });

            this.ClientList = response;
          }
         // this.ClientList = response;
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }

  viewSingleRuleList(ruleId,index){
    $('#ruleList'+index).removeClass('selected');
    this.RuleServices.viewSingleRuleList(ruleId).subscribe(
      response =>  { 
          if (response != "No data") {          
            let getMessage =  response['Message'].split(":");
            if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
              this.message = getMessage['1'];
              this.openSnackBar(); 
            }
            else {                  
              this.clientSingleList = response['Data'][0]['ClientId'].split(",");
              console.log(this.clientSingleList);
              this.getClientList();
              this.viewRuleList();
              setTimeout(() => {               
                
                $('#ruleList'+index).addClass('selected');
                }
                , 500);                        
              }    
              
          } else {
          console.log("something is wrong with Service Execution"); 
          }
        },
        error => console.log(error)      
      );
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
