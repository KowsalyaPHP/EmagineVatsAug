import { Component, OnInit, Inject, ViewChild,Input, Output, EventEmitter , TemplateRef } from '@angular/core';

import { Router, ActivatedRoute } from "@angular/router";
import { PublishService } from './publish.service';
import { MatFormFieldControl, MatFormField, MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatChipInputEvent,MatSnackBar } from '@angular/material';
import { SharedService } from '../shared/shared.service';
declare var $: any

interface Vendor {
  VendorId: any;
  VendorName:string;
  VendorTier:any;
  P_Status?: boolean;
}

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {

  allVendorList:[];
  public allvendorBronze : Vendor[];
  public allvendorSilver : Vendor[];
  public allvendorGold : Vendor[];
  public allvendorPlatinum : Vendor[];
  id:any;
  bronzeCategory:any;
  silverCategory:any;
  goldCategory:any;
  platinumCategory:any;
  bronzeVendorId:any;
  silverVendorId:any;
  goldVendorId:any;
  platinumVendorId:any;
  allVendorId:string = '';
  message:any;
  selectVendor:boolean=false;

  constructor(private PublishServices: PublishService,public dialogRef: MatDialogRef<PublishComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private routerObj: Router,private route: ActivatedRoute) { 
    this.getAllVendorLists();
  }

  ngOnInit() {
  
    $(document).ready(function() { 
      
   
      var triggers = $('ul.alphabet li a');
      
      
      triggers.click(function() {
        var filters = $('ul.medical_dictionary li strong');
          var takeLetter = $(this).text();
          
          filters.parent().hide();
          
          filters.each(function(i) {
          
              var compareFirstLetter = $(this).text().substr(0,1);
            
              if ( compareFirstLetter ==  takeLetter ) {
                  $(this).parent().fadeIn(222);
              }
              
              //problem on detecting empty one. Press 'B' for example.
              //i can reach manually but this way is useless
              if (takeLetter ==='B') {console.log('There is no result.');}
          });
  
      });
    });
 
  }

  

  getAllVendorLists() {

    this.PublishServices.getAllVendorList(this.data['ReqId']).subscribe(
      response => {
        if (response != '') {         
          this.allVendorList = response['Data'];
              
         /* for (let i = 0; i < this.allVendorList['BronzeCategory'].length; i++) {                 
            if(this.allVendorList['BronzeCategory'][i]['P_Status'] == 'P')
            {
              this.allVendorList['BronzeCategory'][i].checked = true;
            }
          }               
          for (let i = 0; i < this.allVendorList['SilverCategory'].length; i++) {                 
            if(this.allVendorList['SilverCategory'][i]['P_Status'] == 'P')
            {
              this.allVendorList['SilverCategory'][i].checked = true;
            }
          }   
          for (let i = 0; i < this.allVendorList['GoldCategory'].length; i++) {                 
            if(this.allVendorList['GoldCategory'][i]['P_Status'] == 'P')
            {
              this.allVendorList['GoldCategory'][i].checked = true;
            }
          } 
          for (let i = 0; i < this.allVendorList['PlatinumCategory'].length; i++) {                 
            if(this.allVendorList['PlatinumCategory'][i]['P_Status'] == 'P')
            {
              this.allVendorList['PlatinumCategory'][i].checked = true;
            }
          } */
          this.allvendorBronze = this.allVendorList['BronzeCategory'];
          this.allvendorSilver = this.allVendorList['SilverCategory'];
          this.allvendorGold = this.allVendorList['GoldCategory'];
          this.allvendorPlatinum = this.allVendorList['PlatinumCategory'];
            
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }
  
  selectAll(category,SelectedorNot){
    console.log(category)
    console.log(SelectedorNot)

    if(SelectedorNot == true){
      if(category == "Bronze"){
        for (let i = 0; i < this.allvendorBronze.length; i++) { 
            this.allvendorBronze[i]['P_Status'] = true; 
          }
        }
      }
      else{
        for (let i = 0; i < this.allvendorBronze.length; i++) { 
          this.allvendorBronze[i]['P_Status'] = false; 
        }
      }
      if(SelectedorNot == true){
        if(category == "Silver"){
            for (let i = 0; i < this.allvendorSilver.length; i++) { 
                this.allvendorSilver[i]['P_Status'] = true; 
              }
            }
          }
      else{
          for (let i = 0; i < this.allvendorSilver.length; i++) { 
            this.allvendorSilver[i]['P_Status'] = false; 
          }
        }
      if(SelectedorNot == true){
        if(category == "Gold"){
            for (let i = 0; i < this.allvendorGold.length; i++) { 
                this.allvendorGold[i]['P_Status'] = true; 
              }
            }
          }
      else{
            for (let i = 0; i < this.allvendorGold.length; i++) { 
              this.allvendorGold[i]['P_Status'] = false; 
            }
          }
      if(SelectedorNot == true){ 
          if(category == "Platinum"){
              for (let i = 0; i < this.allvendorPlatinum.length; i++) { 
                  this.allvendorPlatinum[i]['P_Status'] = true; 
                }
              }
        }
        else{
          for (let i = 0; i < this.allvendorPlatinum.length; i++) { 
             this.allvendorPlatinum[i]['P_Status'] = false; 
         }
    }
 
    /*if(SelectedorNot == true){
      for (let i = 0; i < this.FunctionList.length; i++) {                
          for(let j=0; j< this.FunctionList[i]['functionGroupList'].length;j++){
            if(this.FunctionList[i]['functionGroupList'][j]['ModuleId'] == moduleId){
              this.FunctionList[i]['functionGroupList'][j]['FunctionSelected'] = true;
            }
          }       
      }
    }
    else{
      for (let i = 0; i < this.FunctionList.length; i++) {                
        for(let j=0; j< this.FunctionList[i]['functionGroupList'].length;j++){
          if(this.FunctionList[i]['functionGroupList'][j]['ModuleId'] == moduleId){
            this.FunctionList[i]['functionGroupList'][j]['FunctionSelected'] = false;
          }
        }       
      }
    }*/
   /* else{
      for (let i = 0; i < this.FunctionList.length; i++) {                
        for(let j=0; j< this.FunctionList[i]['functionGroupList'].length;j++){
          if(this.FunctionList[i]['functionGroupList'][j]['ModuleId'] == moduleId){
            this.FunctionList[i]['functionGroupList'][j]['FunctionSelected'] = false;
          }
        }       
      }
    }
    if(SelectedorNot == true){
      for (let i = 0; i < this.SubfunctionList.length; i++) {                
        for(let j=0; j< this.SubfunctionList[i]['subfunctionGroupList'].length;j++){
          if(this.SubfunctionList[i]['subfunctionGroupList'][j]['ModuleId'] == moduleId){
            this.SubfunctionList[i]['subfunctionGroupList'][j]['SubFunctionSelected'] = true;
          }
        }       
      }
    }
    else{
      for (let i = 0; i < this.SubfunctionList.length; i++) {                
        for(let j=0; j< this.SubfunctionList[i]['subfunctionGroupList'].length;j++){
          if(this.SubfunctionList[i]['subfunctionGroupList'][j]['ModuleId'] == moduleId){
            this.SubfunctionList[i]['subfunctionGroupList'][j]['SubFunctionSelected'] = false;
          }
        }       
      }
    }*/
  }

  checkallBronzevendor(){
   
    for (let i = 0; i < this.allVendorList['BronzeCategory'].length; i++) {                

        this.allVendorList['BronzeCategory'][i].checked = true;
    }      
  }
  checkallSilvervendor(){
   
    for (let i = 0; i < this.allVendorList['SilverCategory'].length; i++) {                

        this.allVendorList['SilverCategory'][i].checked = true;
    }      
  }
  checkallGoldvendor(){
   
    for (let i = 0; i < this.allVendorList['GoldCategory'].length; i++) {                

        this.allVendorList['GoldCategory'][i].checked = true;
    }      
  }
  checkallPlatinumvendor(){
   
    for (let i = 0; i < this.allVendorList['PlatinumCategory'].length; i++) {                

        this.allVendorList['PlatinumCategory'][i].checked = true;
    }      
  }
  openSnackBar() { 
    var x = document.getElementById("snackbar")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800);
  }


  addPublish(){

    this.bronzeCategory = this.allvendorBronze.filter( element => element.P_Status);
    this.silverCategory = this.allvendorSilver.filter( element => element.P_Status);
    this.goldCategory = this.allvendorGold.filter( element => element.P_Status);
    this.platinumCategory = this.allvendorPlatinum.filter( element => element.P_Status);
    console.log(this.silverCategory)
    this.bronzeVendorId = this.bronzeCategory.map(element => element.VendorId);
    this.silverVendorId = this.silverCategory.map(element => element.VendorId);
    this.goldVendorId = this.goldCategory.map(element => element.VendorId);
    this.platinumVendorId = this.platinumCategory.map(element => element.VendorId);

    if(this.bronzeVendorId.length > 0)
    {
     this.allVendorId = this.bronzeVendorId.join(',') + ',';
    }
    if(this.silverVendorId.length > 0)
    {
      this.allVendorId += this.silverVendorId.join(',') + ',';
    }
    if(this.goldVendorId.length > 0)
    {
      this.allVendorId += this.goldVendorId.join(',') + ',';
    }
    if(this.platinumVendorId.length > 0)
    {
      this.allVendorId += this.platinumVendorId.join(',') + ',';
    }

    this.PublishServices.reqAddPublish(this.data['ReqId'],this.allVendorId).subscribe(
      response => {
        if (response != '') {  
          let getMessage =  response['Message'].split(":");
          if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
            this.message = getMessage['1'];
            this.openSnackBar(); 
          }          
          else{
            this.message = getMessage['1'];
            this.openSnackBar();      
            this.routerObj.navigate(["/req-dashboard"]);           
          }       
         // this.allVendorList = response['Data'];
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }
  unPublish(){
    this.PublishServices.reqUnPublish(this.data['ReqId']).subscribe(
      response => {
        if (response != '') {  
          let getMessage =  response['Message'].split(":");
          if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
            this.message = getMessage['1'];
            this.openSnackBar(); 
          }          
          else{
            this.message = getMessage['1'];
            this.openSnackBar();      
            //this.routerObj.navigate(["/req-dashboard"]);           
          }       
         // this.allVendorList = response['Data'];
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }
}
