import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { PublishService } from './publish.service';
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

  constructor(private PublishServices: PublishService,private routerObj: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAllVendorLists();


  /*  $("#PlatinumAll").click(function () {
      $(".Platinum").prop('checked', $(this).prop('checked'));
    });*/

  }

  getAllVendorLists() {

    this.route.params.subscribe(params => {
      this.id = params['id'];     
    });

    this.PublishServices.getAllVendorList(this.id).subscribe(
      response => {
        if (response != '') {         
          this.allVendorList = response['Data'];
              
          for (let i = 0; i < this.allVendorList['BronzeCategory'].length; i++) {                 
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
          } 
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

    this.route.params.subscribe(params => {
      this.id = params['id'];     
    });

    this.bronzeCategory = this.allvendorBronze.filter( element => element.checked);
    this.silverCategory = this.allvendorSilver.filter( element => element.checked);
    this.goldCategory = this.allvendorGold.filter( element => element.checked);
    this.platinumCategory = this.allvendorPlatinum.filter( element => element.checked);

    this.bronzeVendorId = this.bronzeCategory.map(element => element.VendorId);
    this.silverVendorId = this.silverCategory.map(element => element.VendorId);
    this.goldVendorId = this.goldCategory.map(element => element.VendorId);
    this.platinumVendorId = this.platinumCategory.map(element => element.VendorId);

    if(this.bronzeVendorId.length > 0)
    {
     this.allVendorId = this.bronzeVendorId.join(';') + ';';
    }
    if(this.silverVendorId.length > 0)
    {
      this.allVendorId += this.silverVendorId.join(';') + ';';
    }
    if(this.goldVendorId.length > 0)
    {
      this.allVendorId += this.goldVendorId.join(';') + ';';
    }
    if(this.platinumVendorId.length > 0)
    {
      this.allVendorId += this.platinumVendorId.join(';') + ';';
    }

    this.PublishServices.reqAddPublish(this.id,this.allVendorId).subscribe(
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
}
