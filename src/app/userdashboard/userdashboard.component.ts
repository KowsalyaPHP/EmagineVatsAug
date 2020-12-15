import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { UserdashboardService } from './userdashboard.service';
import { ResetpasswordComponent } from '../resetpassword/resetpassword.component';
import { MatFormFieldControl, MatFormField, MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatChipInputEvent } from '@angular/material';
import { AddcityComponent } from '../addcity/addcity.component';
declare var $: any

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {
  
  message:any;  
  userList:[];
  dataTable: any;
  userCategory:any;
  functionList:any;
  funclist:any;
  
  constructor(private routerObj: Router,private UserdashboardServices: UserdashboardService,public dialog: MatDialog) {
    this.viewUserDetails();
    this.userCategory = sessionStorage.getItem("USERCATEGORY");
   }

  ngOnInit() {
    this.funclist = sessionStorage.getItem("FunctionList");      
    if(typeof(this.funclist) != 'object')
    this.functionList = this.funclist.split(','); 

    setTimeout(function () {
      $(function () {
        $('#userDashboard').DataTable({
          scrollY: '310px'
        });    
        $("#loader").hide();
      });      
    }, 1500);  
  }

  openDialogResetPassword(UserId) {
  
    const dialogRef = this.dialog.open(ResetpasswordComponent, {     
      data: {userId: UserId}      
    });
    
    dialogRef.afterClosed().subscribe(result => {
      
    }) 
   
  }

  actionMethod(i) { 
    $("#showmenu"+i).show();
    $(document).on("click", function(event){
      var $trigger = $(".dropdown");
      if($trigger !== event.target && !$trigger.has(event.target).length){
          $(".dropdown-menu").slideUp("fast");
      }            
   });
  }

  openSnackBar() { 
    var x = document.getElementById("snackbar")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800);
  }
  
  viewUserDetails(){
    this.UserdashboardServices.viewUserDetails().subscribe(
      response => {  
        if (response != "No data") {
          let getMessage =  response['Message'].split(":");
          if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
            this.message = getMessage['1'];
            this.openSnackBar(); 
          }          
          else{
            response['Data'].forEach(item => {
              for (let i = 0; i < response['Data'].length; i++) {                  
                if(response['Data'][i]['UserCategory'] == 'E')
                {
                  response['Data'][i]['UserCategoryName'] = 'Emagine';
                }
                else if(response['Data'][i]['UserCategory'] == 'C'){
                  response['Data'][i]['UserCategoryName'] = 'Client';
                }
                else if(response['Data'][i]['UserCategory'] == 'V'){
                  response['Data'][i]['UserCategoryName'] = 'Vendor';
                }
              }               
            });
          
            this.userList = response['Data'];
            //this.routerObj.navigate(['manage/',this.id,'SO']);
          }            
        }
        else {         
          console.log('something is wrong with Service Execution');
        }        
      },
      error => console.log("Error Occurd!")
    );  
  }

  openDialogaddNewCity(): void {
  
    const dialogRef = this.dialog.open(AddcityComponent, {
      width: '400px',
      data: {addType: 'skill'}      
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result && result.action === 1) {
      } 
    });    
  }
}
