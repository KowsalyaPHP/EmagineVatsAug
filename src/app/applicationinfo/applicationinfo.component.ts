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
import { ApplicationinfoService } from './applicationinfo.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-applicationinfo',
  templateUrl: './applicationinfo.component.html',
  styleUrls: ['./applicationinfo.component.css']
})
export class ApplicationinfoComponent implements OnInit {

  primaryinfoDetails:any;
  cvlogDetails:[];
  public candidateId:any;
  public applicationId:any;
  public reqId:any;

  constructor(private SharedServices: SharedService,private ApplicationinfoServices: ApplicationinfoService,private formBuilderObj: FormBuilder,private routerObj: Router,private route: ActivatedRoute) {
    
    this.route.params.subscribe(params => {
      this.reqId = params['rid'],
      this.candidateId = params['cid'],
      this.applicationId = params['aid']
    });

    this.getPrimaryInfos();
    this.getcvlogInfos();


  }
  
  ngOnInit() {

  }

  getPrimaryInfos() {

    this.ApplicationinfoServices.getPrimaryInfo(this.reqId,this.candidateId,this.applicationId).subscribe(
      response => {
        if (response != '') {         
          this.primaryinfoDetails = response['Data'];          
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }   

  getcvlogInfos() {

    this.ApplicationinfoServices.getcvlogInfo(this.reqId,this.candidateId,this.applicationId).subscribe(
      response => {
        if (response != '') {         
          this.cvlogDetails = response['Data'];
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }   
}
