import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SharedService } from '../shared/shared.service';

export interface DialogData {
  description: string;
}
interface Education {
  code: any;
  description: string;
  checked?: boolean;
}

@Component({
  selector: 'app-addeducation',
  templateUrl: './addeducation.component.html',
  styleUrls: ['./addeducation.component.css']
})
export class AddeducationComponent implements OnInit {

  public educations: Education[];
  education:[];
  term: string;
  educationselect:any;
  constructor(public dialogRef: MatDialogRef<AddeducationComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private SharedServices: SharedService) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

    ngOnInit() {
      this.getEducations();
    }

    getEducations() {
      this.SharedServices.getEducation().subscribe(
        response => {         
          if (response != '') { 
            if(this.data['checkedValue']){              
              this.educations = this.data['checkedValue'];
            }
            else if(this.data['Educode']){ 
              let getEduCode = this.data['Educode'].split(";");  
              console.log(getEduCode)       
              response.forEach(item => {
                for (let i = 0; i < getEduCode.length; i++) {                  
                  if(getEduCode[i] == item['Code'])
                  {
                    item.checked = true;
                  }
                }               
              });

              this.educations = response;
            }
            else{              
              this.educations = response;
            }            
          }
          else {         
            console.log('something is wrong with Service  Execution');
          }
        },
        error => console.log("Error Occurd!")
      );
    }    

  sendCheckededucation(){
    this.educationselect = this.educations.filter( (education) => education.checked );
    this.dialogRef.close({action: 1, data: this.educationselect, array:this.educations});
  }

}
