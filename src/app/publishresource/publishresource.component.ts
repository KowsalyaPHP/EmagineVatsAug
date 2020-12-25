import { Component, OnInit, Inject, ViewChild,Input, Output, EventEmitter , TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { PublishresourceService } from './publishresource.service';
import { MatSnackBar } from '@angular/material';
import { SharedService } from '../shared/shared.service';
import { PublishComponent } from '../publish/publish.component';
import { MatFormFieldControl, MatFormField, MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatChipInputEvent } from '@angular/material';
declare var $: any

@Component({
  selector: 'app-publishresource',
  templateUrl: './publishresource.component.html',
  styleUrls: ['./publishresource.component.css']
})
export class PublishresourceComponent implements OnInit {

  publishParentlist=[];
  publishChildlist:any;
  publishOptionlist=[];

  constructor(private PublishresourceServices: PublishresourceService,public dialogRef: MatDialogRef<PublishresourceComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog,) { 
    
    this.getPublishResource();

  }

  ngOnInit() {
  }

  actionMethod(i) { 
    $(".dropdown-menu").fadeOut("fast");
    $("#option"+i).show();
    $(document).on("click", function(event){
      var $trigger = $(".dropdown");
      if($trigger !== event.target && !$trigger.has(event.target).length){
        $(".dropdown-menu").fadeOut("fast");
      }            
   });
  }

  openDialogpublish(): void {
  
    const dialogRef = this.dialog.open(PublishComponent, {
      width: '1000px',
      height:'900px',
      data: {ReqId: this.data['ReqId']}      
    });
    
    dialogRef.afterClosed().subscribe(result => {

    });    
  }

  getPublishResource() {
    this.PublishresourceServices.getPublishResource().subscribe(
      response => {
        if (response != '') {      
          this.publishParentlist = response['Data']['PrimaryResourceList']; 
          //this.publishChildlist = response['Data']['ResourceList']; 
          this.publishOptionlist = response['Data']['OptionsList']; 

          var optiongroups = response['Data']['OptionsList'].reduce(function(obj,item){
            obj[item.ResourceName] = obj[item.ResourceName] || [];           
            obj[item.ResourceName].push({ SourceId: item.SourceId, SourceName: item.SourceName ,ResourceId: item.ResourceId, ResourceName:item.ResourceName,OptionsId:item.OptionsId,OptionsName:item.OptionsName});
            return obj;
          }, {});

          this.publishOptionlist = Object.keys(optiongroups).map(function(key){
            return {SourceId:optiongroups[key][0]['SourceId'],SourceName:optiongroups[key][0]['SourceName'],ResourceName: key, ResourceId:optiongroups[key][0]['ResourceId'], optionGroupList: optiongroups[key]};
        });

          var Childgroups = this.publishOptionlist.reduce(function(obj,item){
            obj[item.SourceName] = obj[item.SourceName] || [];
            obj[item.SourceName].push({ SourceId: item.SourceId, SourceName: item.SourceName ,ResourceId: item.ResourceId, ResourceName:item.ResourceName,optionGroupList:item.optionGroupList});
            return obj;
          }, {});
         

         this.publishChildlist = Object.keys(Childgroups).map(function(key){
              return {SourceName: key, SourceId:Childgroups[key][0]['SourceId'], ChildGroupList: Childgroups[key]};
          });

          //console.log(this.publishOptionlist)
          console.log(this.publishChildlist)
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  } 

}
