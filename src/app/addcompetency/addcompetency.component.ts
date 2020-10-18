import { Component, OnInit, Input, Inject } from '@angular/core';
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
import { AddskillcompetencyComponent } from '../addskillcompetency/addskillcompetency.component';
import { MatDialog } from '@angular/material';

interface Competency {
  code: any;
  description: string;
  checked?: boolean;
}

@Component({
  selector: 'app-addcompetency',
  templateUrl: './addcompetency.component.html',
  styleUrls: ['./addcompetency.component.css']
})

export class AddcompetencyComponent implements OnInit {
  public competencies: Competency[];
  competency:[];
  term: string;
  competencyselect:any;
  constructor(public dialogRef: MatDialogRef<AddcompetencyComponent>,@Inject(MAT_DIALOG_DATA) public data:any,private SharedServices: SharedService,private dialog: MatDialog) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

    ngOnInit() {
      this.getCompetencies();
    }

    openDialogaddNewCompetency(): void {
  
      const dialogRef = this.dialog.open(AddskillcompetencyComponent, {
        width: '400px',
        data: {addType: 'competency'}      
      });
      
      dialogRef.afterClosed().subscribe(result => {
        if(result && result.action === 1) {
          if(this.data['Compcode']){ 
            let getCompcode = this.data['Compcode'].split(";");             
            result['data'].forEach(item => {
              for (let i = 0; i < getCompcode.length; i++) {                  
                if(getCompcode[i] == item['Code'])
                {
                  item.checked = true;
                }
              }               
            });
            this.competencies = result['data'];
          }
          else{              
            this.competencies = result['data'];
          }          
        }
      });    
    }

    getCompetencies() {
      this.SharedServices.getCompetency().subscribe(
        response => {
          if (response != '') { 
            if(this.data['checkedValue']){              
              this.competencies = this.data['checkedValue'];
            }
            else if(this.data['Compcode']){ 
              let getCompcode = this.data['Compcode'].split(";");             
              response.forEach(item => {
                for (let i = 0; i < getCompcode.length; i++) {                  
                  if(getCompcode[i] == item['Code'])
                  {
                    item.checked = true;
                  }
                }               
              });
              this.competencies = response;
            }
            else{              
              this.competencies = response;
            }            
          }
          else {         
            console.log('something is wrong with Service  Execution');
          }
        },
        error => console.log("Error Occurd!")
      );
    }    

  sendCheckedcompetency(){
    this.competencyselect = this.competencies.filter( (competency) => competency.checked );
    this.dialogRef.close({action: 1, data: this.competencyselect, array:this.competencies});
  }
} 