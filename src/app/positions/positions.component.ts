import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { PositionsService } from './positions.service';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {

  positionsList:[];
  message:any;
  id:any;
  addPositionForm: FormGroup;
  reqTitle:any;
  reqStatus:any;
  inputValue:number;
  dataTable: any;
  dtOptions: any;
  tableData = [];
  @ViewChild('dataTable', {static: true}) table;

  constructor(private route: ActivatedRoute,private formBuilderObj: FormBuilder,private routerObj: Router,private PositionsServices: PositionsService)
  { 
    this.addPositionForm = this.formBuilderObj.group({
      NumberofPositions: ['', [Validators.required]],
    });
    
    this.getPositionsList();
    this.reqTitle = sessionStorage.getItem("reqTitle");
    this.reqStatus = sessionStorage.getItem("reqStatus");
  }
 



  ngOnInit() {

    setTimeout(function () {       
      $(function () {
        $('#positionList').DataTable({
          "paging": false,
          "searching": false,
          "info": false,
          "responsive": true
        });           
      });
    }, 1500);  

  }

  openSnackBar() { 
    var x = document.getElementById("snackbar")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800);
  }

  getPositionsList() { 

    this.route.params.subscribe(params => {
      this.id = params['id'];      
    });

    this.PositionsServices.getPositionList(this.id).subscribe(
      response => {   
            
        if (response != "No data") {          
          let getMessage =  response['Message'].split(":");
          if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
            this.message = getMessage['1'];
            this.openSnackBar(); 
          }
          else {                     
           this.positionsList = response['Data'];   

           response['Data'].forEach(item => {
              if(item['CandidateStage'] == 'NH')
              {
                item['stageString'] = 'Not Hired'
              }else if(item['CandidateStage'] == 'OF')
              {
                item['stageString'] = 'Offered'
              }else if(item['CandidateStage'] == 'JO')
              {
                item['stageString'] = 'Joined'
              }else if(item['CandidateStage'] == 'SC')
              {
                item['stageString'] = 'Screening'
              }else if(item['CandidateStage'] == 'SO')
              {
                item['stageString'] = 'Sourcing'
              }else if(item['CandidateStage'] == 'AS')
              {
                item['stageString'] = 'Assessment'
              }
           });
           this.tableData = this.positionsList;
           this.dtOptions = {
             data: this.tableData,
             columns: [
               {title: 'ID', data: 'id'},
               {title: 'Email', data: 'email'},
               {title: 'First Name', data: 'first_name'},
               {title: 'Last Name', data: 'last_name'},
               {title: 'Avatar', data: 'avatar'},
             ]
           };
          
          }    
            
        } else {
         console.log("something is wrong with Service Execution"); 
        }
      },
      error => console.log(error)      
    );
  }

  addPosition(formobj) { 

    this.route.params.subscribe(params => {
      this.id = params['id'];      
    });

    this.PositionsServices.addPositions(this.id,formobj).subscribe(
      response => {   
            
        if (response != "No data") {          
          let getMessage =  response['Message'].split(":");
          if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
            this.message = getMessage['1'];
            this.openSnackBar(); 
          }
          else {                  
            this.message = getMessage['1'];
            this.openSnackBar();   
            this.getPositionsList(); 
          }    
            
        } else {
         console.log("something is wrong with Service Execution"); 
        }
      },
      error => console.log(error)      
    );
  }
  
  deletePosition(formobj) { 

    
    this.route.params.subscribe(params => {
      this.id = params['id'];      
    });
     
    if(this.positionsList.length <= 1 || formobj > this.positionsList.length){
      this.message = 'Not deleted with one row';
      this.openSnackBar(); 
      return;
    }

    this.PositionsServices.deletePositions(this.id,formobj).subscribe(
      response => {   
            
        if (response != "No data") {          
          let getMessage =  response['Message'].split(":");
          if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
            this.message = getMessage['1'];
            this.openSnackBar(); 
          }
          else {                  
            this.message = getMessage['1'];
            this.openSnackBar();    
            this.getPositionsList();    
          }    
            
        } else {
         console.log("something is wrong with Service Execution"); 
        }
      },
      error => console.log(error)      
    );
  }

  validation_messages = {
    'NumberofPositions': [
      { type: 'required', message: 'Please enter number of positions' }      
    ]
  }
}
