import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AppComponent } from '../app.component';

@Component({
  
  // templateUrl: './docview.component.html',
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
   url="{{base_path}}ViewFile?EntityId={{PEntityid}}&RequisitionId={{PRequisitionId}}&CandidateId={{PCandidateId}}&ApplicationId={{PApplicationId}}" viewer="google"  style="width:100%;height:93vh;"> 
  </ngx-doc-viewer>
</div>
</ng-template>
`,
  // styleUrls: [ './docview.component.css' ],
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

export class DocviewComponent implements OnInit {
  PEntityid = sessionStorage.getItem('Entityid');
  PRequisitionId = sessionStorage.getItem('RequisitionId');
  PCandidateId = sessionStorage.getItem('CandidateId');
  PApplicationId = sessionStorage.getItem('ApplicationId');

  base_path:any;

  constructor(public dialogRef: MatDialogRef<DocviewComponent>,@Inject(MAT_DIALOG_DATA) public data:any) {
    
    this.base_path = AppComponent.urlPath;
    
      
  }
 
  // http://b2ed65fa.ngrok.io
  // https://docs.google.com/gview?url=http%3A%2F%2Fa7351096.ngrok.io%2FViewFile%3FEntityId%3DEmagine%26RequisitionId%3D58%26CandidateId%3D91%26ApplicationId%3D90&embedded=true
  
  //https://docs.google.com/gview?url=http%3A%2F%2F2ec98354.ngrok.io%2FViewFile%3FEntityId%3DEmagine%26RequisitionId%3D58%26CandidateId%3D91%26ApplicationId%3D90&embedded=true

  ngOnInit() {
  }

}
