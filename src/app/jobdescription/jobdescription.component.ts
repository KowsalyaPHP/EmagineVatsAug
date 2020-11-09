import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { MatFormFieldControl, MatFormField, MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatChipInputEvent } from '@angular/material';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';  
import { EduGrid,EmpGrid } from '../grid.model';
import { SharedService } from '../shared/shared.service';
import { JobdescriptionService } from './jobdescription.service';
declare var $: any

@Component({
  selector: 'app-jobdescription',
  templateUrl: './jobdescription.component.html',
  styleUrls: ['./jobdescription.component.css']
})
export class JobdescriptionComponent implements OnInit {
  
  message:any;
  requisitionDetails:[]; 
  id:any;
  vendorId:any;

  constructor(private JobdescriptionServices: JobdescriptionService,private route: ActivatedRoute) {
    this.showJobDescription();
  }

  ngOnInit() {
 
  }

  
  openSnackBar() { 
    var x = document.getElementById("snackbar")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800);
  }


  showJobDescription(){
    this.route.params.subscribe(params => {
      this.id = params['id'],
      this.vendorId = params['uid'] ;  
    });
    this.JobdescriptionServices.getRequisitionDetails(this.id).subscribe(
      response => {
        if (response != "No data") {
          let getMessage =  response['Message'].split(":");
          if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
            this.message = getMessage['1'];
            this.openSnackBar(); 
          }          
          else{
            this.requisitionDetails = response['Data'];
          } 
        } else {
            console.log("something is wrong with Service Execution");
        }
      });
    }
}
