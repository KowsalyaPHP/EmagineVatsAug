import { Component, OnInit,ViewChild,Input, Output, EventEmitter , TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { MatFormFieldControl, MatFormField} from '@angular/material';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective
} from "@angular/forms";

import { MatDialog } from '@angular/material';
declare var $: any

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {
 functionList:any;
  constructor(private formBuilderObj: FormBuilder,private routerObj: Router,private dialog: MatDialog) { 
    var userName = sessionStorage.getItem("FunctionList");
    this.functionList = userName.split(',');
    //this.reload();
  }


  ngOnInit() {
  }
  reload(){
    this.routerObj.routeReuseStrategy.shouldReuseRoute = () => false;
    this.routerObj.onSameUrlNavigation = 'reload';
    this.routerObj.navigate(['/landingpage']);
  }
  
}
