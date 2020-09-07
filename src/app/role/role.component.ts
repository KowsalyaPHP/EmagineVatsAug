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

  constructor(private routerObj: Router,private RoleServices: RoleService,private route: ActivatedRoute,public dialog: MatDialog) { }

  ngOnInit() {
  }

  opendialogaddrole() {
  
    const dialogRef = this.dialog.open(RoleaddComponent, {
      width: '300px',
      height:'300px',
    //  data: {ReqId: reqId,Stage:stage}      
    });
    
    dialogRef.afterClosed().subscribe(result => {

    });   
   /* this.RoleServices.downloadCVLink(reqId,CandId,AppId).subscribe(
      response => {
        if (response != '') {         
          this.downLoadFile(response);      
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
    
  }*/
}
}
