import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { MatFormFieldControl, MatFormField, MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatChipInputEvent } from '@angular/material';
import { RoleaddComponent } from '../roleadd/roleadd.component';
import { RoleService } from './role.service';
declare var $: any


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  message:any;
  ModuleList=[];
  RoleList=[];
  SubfunctionList=[];
  FunctionList=[];

  constructor(private routerObj: Router,private RoleServices: RoleService,private route: ActivatedRoute,public dialog: MatDialog) { 

    this.viewRoleList();
    this.viewModuleList();
    this.viewFunctionList();
    this.viewSubfunctionList();

  }

  ngOnInit() {
  }

  opendialogaddrole(type) {
  
    const dialogRef = this.dialog.open(RoleaddComponent, {
      width: '300px',
      height:'300px',
      data: {addType: type}      
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result && result.action === 1) {
        if(type == 'Role'){
          this.RoleList = result['data'];
        }
        else if(type == 'Module'){
          this.ModuleList = result['data']; 
        }
        else if(type == 'Function'){
          this.FunctionList = result['data']; 
        }
        else if(type == 'Subfunction'){
          this.SubfunctionList = result['data']; 
        }
      }
    }); 
   
  }

  viewRoleList(){
    this.RoleServices.getRoleList().subscribe(
      response => {
        if (response != "No data") {
          if (response == "Login Failed") {           
            alert ("Your given details are not existed.");
            this.routerObj.navigate(["/login"]);           
          }
          else {                     
            this.RoleList = response['Data']; 
          }
        } else {
            console.log("something is wrong with Service Execution");
        }
      });
    }

    viewModuleList(){
      this.RoleServices.getModuleList().subscribe(
        response => {
          if (response != "No data") {
            if (response == "Login Failed") {           
              alert ("Your given details are not existed.");
              this.routerObj.navigate(["/login"]);           
            }
            else {                     
              this.ModuleList = response['Data']; 
            }
          } else {
              console.log("something is wrong with Service Execution");
          }
        });
      }

    viewFunctionList(){
      this.RoleServices.getFunctionList().subscribe(
        response => {
          if (response != "No data") {
            if (response == "Login Failed") {           
              alert ("Your given details are not existed.");
              this.routerObj.navigate(["/login"]);           
            }
            else {                     
              this.FunctionList = response['Data']; 
            }
          } else {
              console.log("something is wrong with Service Execution");
          }
        });
      }

      viewSubfunctionList(){
        this.RoleServices.getSubfunctionList().subscribe(
          response => {
            if (response != "No data") {
              if (response == "Login Failed") {           
                alert ("Your given details are not existed.");
                this.routerObj.navigate(["/login"]);           
              }
              else {                     
                this.SubfunctionList = response['Data']; 
              }
            } else {
                console.log("something is wrong with Service Execution");
            }
          });
        }
}
