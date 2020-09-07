import { Component, OnInit,Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { RoleaddService } from './roleadd.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-roleadd',
  templateUrl: './roleadd.component.html',
  styleUrls: ['./roleadd.component.css']
})
export class RoleaddComponent implements OnInit {

  addRoleForm: FormGroup;

  constructor(private routerObj: Router,private RoleaddServices: RoleaddService,private formBuilderObj: FormBuilder,private route: ActivatedRoute,public dialogRef: MatDialogRef<RoleaddComponent>,@Inject(MAT_DIALOG_DATA) public data:any) {
    this.addRoleForm = this.formBuilderObj.group({
      role_name: ['', [Validators.required]]
    });    
  }

  ngOnInit() {
  }
  
  validation_messages = {
    'role_name': [
      { type: 'required', message: 'Please enter requisition title' }      
    ]
  }
}
