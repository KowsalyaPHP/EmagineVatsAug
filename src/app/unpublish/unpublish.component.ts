import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { UnpublishService } from './unpublish.service';
import { MatSnackBar } from '@angular/material';
import { SharedService } from '../shared/shared.service';
declare var $: any

interface Vendor {
  vendorId: any;
  VendorName:string;
  VendorTier:any;
  checked?: boolean;
}

@Component({
  selector: 'app-unpublish',
  templateUrl: './unpublish.component.html',
  styleUrls: ['./unpublish.component.css']
})
export class UnpublishComponent implements OnInit {

  id:any;
  publishedVendorList:[];
  public publishedvendorBronze : Vendor[];
  public publishedvendorSilver : Vendor[];
  public publishedvendorGold : Vendor[];
  public publishedvendorPlatinum : Vendor[];
  bronzeCategory:any;
  silverCategory:any;
  goldCategory:any;
  platinumCategory:any;
  bronzeVendorId:any;
  silverVendorId:any;
  goldVendorId:any;
  platinumVendorId:any;
  publishedVendorId:string = '';
  message:any;

  constructor(private UnpublishServices: UnpublishService,private routerObj: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.getpublishedVendors();
    
    /*$("#Bronzepublished").click(function () {
      $(".Bronze").prop('checked', $(this).prop('checked'));
    });
    $("#Silverpublished").click(function () {
      $(".Silver").prop('checked', $(this).prop('checked'));
    });
    $("#Goldpublished").click(function () {
      $(".Gold").prop('checked', $(this).prop('checked'));
    });
    $("#Platinumpublished").click(function () {
      $(".Platinum").prop('checked', $(this).prop('checked'));
    });*/

  }

  openSnackBar() { 
    var x = document.getElementById("snackbar")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800);
  }

  getpublishedVendors() {

    this.route.params.subscribe(params => {
      this.id = params['id'];     
    });
    this.UnpublishServices.getPublishedVendorList(this.id).subscribe(
      response => { 
        if (response != '') {                
          this.publishedVendorList = response['Data'];               
          this.publishedvendorBronze = this.publishedVendorList['BronzeCategory'];
          this.publishedvendorSilver = this.publishedVendorList['SilverCategory'];
          this.publishedvendorGold = this.publishedVendorList['GoldCategory'];
          this.publishedvendorPlatinum = this.publishedVendorList['PlatinumCategory'];        
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }    

    
  checkallBronzevendor(){
   
    for (let i = 0; i < this.publishedVendorList['BronzeCategory'].length; i++) {                

        this.publishedVendorList['BronzeCategory'][i].checked = true;
    }      
  }
  checkallSilvervendor(){
   
    for (let i = 0; i < this.publishedVendorList['SilverCategory'].length; i++) {                

        this.publishedVendorList['SilverCategory'][i].checked = true;
    }      
  }
  checkallGoldvendor(){
   
    for (let i = 0; i < this.publishedVendorList['GoldCategory'].length; i++) {                

        this.publishedVendorList['GoldCategory'][i].checked = true;
    }      
  }
  checkallPlatinumvendor(){
   
    for (let i = 0; i < this.publishedVendorList['PlatinumCategory'].length; i++) {                

        this.publishedVendorList['PlatinumCategory'][i].checked = true;
    }      
  }

  UnPublish(){

    this.route.params.subscribe(params => {
      this.id = params['id'];     
    });

    this.bronzeCategory = this.publishedvendorBronze.filter( element => element.checked);
    this.silverCategory = this.publishedvendorSilver.filter( element => element.checked);
    this.goldCategory = this.publishedvendorGold.filter( element => element.checked);
    this.platinumCategory = this.publishedvendorPlatinum.filter( element => element.checked);

    this.bronzeVendorId = this.bronzeCategory.map(element => element.VendorId);
    this.silverVendorId = this.silverCategory.map(element => element.VendorId);
    this.goldVendorId = this.goldCategory.map(element => element.VendorId);
    this.platinumVendorId = this.platinumCategory.map(element => element.VendorId);

    if(this.bronzeVendorId.length > 0)
    {
      this.publishedVendorId = this.bronzeVendorId.join(';') + ';';
    }
    if(this.silverVendorId.length > 0)
    {
      this.publishedVendorId += this.silverVendorId.join(';') + ';';
    }
    if(this.goldVendorId.length > 0)
    {
      this.publishedVendorId += this.goldVendorId.join(';') + ';';
    }
    if(this.platinumVendorId.length > 0)
    {
      this.publishedVendorId += this.platinumVendorId.join(';') + ';';
    }

    this.UnpublishServices.reqUnPublish(this.id,this.publishedVendorId).subscribe(
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
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }
}
