import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AppComponent } from '../app.component';

@Component({
  
  // templateUrl: './docviewjd.component.html',
  // locally we define
  template: ` <ng-container *ngTemplateOutlet="templateRef; "></ng-container> 
  <ng-template #templateRef>
  <div mat-dialog-title class="flex-container">
  <button mat-button class="close-icon" [mat-dialog-close]="true">
      <mat-icon>close</mat-icon>
  </button>
</div>   
<div>
<ngx-doc-viewer
   url="{{base_path}}ViewJD?EntityId={{PEntityid}}&RequisitionId={{PRequisitionId}}" viewer="google"  style="width:100%;height:93vh;"> 
  </ngx-doc-viewer>
</div>
</ng-template>
`,
  // styleUrls: [ './docviewjd.component.css' ],
  styles: [`:host {
    display: block;
  }
  p {
    font-family: Lato;
  }
  
  .cdk-overlay-pane.my-dialog {
    
    position: relative!important;
  }
  .close.mat-button {
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px;
    line-height: 14px;
    min-width: auto;
  }`]
})
export class DocviewjdComponent implements OnInit {

  PEntityid = sessionStorage.getItem('Entityid');
  PRequisitionId = sessionStorage.getItem('RequisitionId');

  base_path:any;

  constructor(public dialogRef: MatDialogRef<DocviewjdComponent>,@Inject(MAT_DIALOG_DATA) public data:any) {
    
    this.base_path = AppComponent.urlPath;   
      
  }
 

  ngOnInit() {
  }

}
