import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { UserdashboardService } from './userdashboard.service';
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

  constructor(private routerObj: Router,private UserdashboardServices: UserdashboardService) {
    this.viewUserDetails();
   }

  ngOnInit() {
    setTimeout(function () {
      $(function () {
        $('#userDashboard').DataTable({
          scrollY: '310px'
        });    
        $("#loader").hide();
      });      
    }, 1500);  
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
                  item.UserCategoryName = 'Emagine';
                }
                else if(response['Data'][i]['UserCategory'] == 'C'){
                  item.UserCategoryName = 'Client';
                }
                else if(response['Data'][i]['UserCategory'] == 'V'){
                  item.UserCategoryName = 'Vendor';
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


}
