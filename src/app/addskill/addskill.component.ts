import { Component, OnInit, Inject, ViewChild,Input, Output, EventEmitter , TemplateRef } from '@angular/core';
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
import { MatDialog } from '@angular/material';
import { AddskillService } from './addskill.service';
import { AddskillcompetencyComponent } from '../addskillcompetency/addskillcompetency.component';

interface SkillSet {
  code: any;
  description: string;
  checked?: boolean;
}

@Component({
  selector: 'app-addskill',
  templateUrl: './addskill.component.html',
  styleUrls: ['./addskill.component.css']
})
export class AddskillComponent implements OnInit {
  public skillSets: SkillSet[];
  //skillSets:[];
  term: any;
  skillsetselect:any;
 
  message:any;

  constructor(private AddskillServices: AddskillService,public dialogRef: MatDialogRef<AddskillComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private SharedServices: SharedService,private dialog: MatDialog,private formBuilderObj: FormBuilder) {
   
  }
    
    onNoClick(): void {
      this.dialogRef.close();
    }

    ngOnInit() {
      this.getSkillSets();      
    }
  
    getSkillSets() {
      this.SharedServices.getSkillSet().subscribe(
        response => {
          if (response != '') {         
            if(this.data['checkedValue']){              
              this.skillSets = this.data['checkedValue'];
            }
            else if(this.data['skillcode']){ 
              let getSkillCode = this.data['skillcode'].split(";");             
              response.forEach(item => {
                for (let i = 0; i < getSkillCode.length; i++) {                  
                  if(getSkillCode[i] == item['Code'])
                  {
                    item.checked = true;
                  }
                }               
              });     
                      
              this.skillSets = response;
            }
            else{
              this.skillSets = response;
            }            
            
          }
          else {         
            console.log('something is wrong with Service  Execution');
          }
        },
        error => console.log("Error Occurd!")
      );
    }

    openDialogaddNewSkill(): void {
  
      const dialogRef = this.dialog.open(AddskillcompetencyComponent, {
        width: '400px',
        data: {addType: 'skill'}      
      });
      
      dialogRef.afterClosed().subscribe(result => {
        if(result && result.action === 1) {
          if(this.data['skillcode']){ 
            let getSkillCode = this.data['skillcode'].split(";");             
            result['data'].forEach(item => {
              for (let i = 0; i < getSkillCode.length; i++) {                  
                if(getSkillCode[i] == item['Code'])
                {
                  item.checked = true;
                }
              }               
            });     
                    
            this.skillSets = result['data'];
          }
          else{
            this.skillSets = result['data'];
          }           
          console.log(this.skillSets);
          console.log(result);
          console.log(this.data['skillcode']);

        } 
          //this.viewcustomTemplateDetails();
      });    
    }

    sendCheckedskillset(){
      this.skillsetselect = this.skillSets.filter( (skillSets) => skillSets.checked );
      console.log(this.skillsetselect);
      this.dialogRef.close({action: 1, data: this.skillsetselect, array:this.skillSets});   
    }

    openSnackBar() { 
      var x = document.getElementById("snackbar")
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800);
    }

  
}
