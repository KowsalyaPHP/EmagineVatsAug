import { Component, OnInit,Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { SearchService } from './search.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup;
  SearchList = [];
  showName:boolean=false;
  showMobileNo:boolean=false;
  showEmailId:boolean=false;
  showCandidateId:boolean=false;
  showApplicationId:boolean=false;
  checkData:any;

  constructor(private routerObj: Router,private SearchServices: SearchService,private formBuilderObj: FormBuilder,private route: ActivatedRoute,public dialogRef: MatDialogRef<SearchComponent>,@Inject(MAT_DIALOG_DATA) public data:any) {

    this.searchForm = this.formBuilderObj.group({
      SearchData: ['', [Validators.required]]
    }); 
    
  }

  ngOnInit() {
    setTimeout(function () {
      $(function () {
        $('#SearchList').DataTable({
        });               
      });      
      $("#loader").hide();
    }, 1500);  
  }

  changeTextBox(val){
    this.checkData = val;
    this.showName = false;
    this.showMobileNo=false;
    this.showEmailId=false;
    this.showCandidateId=false;
    this.showApplicationId=false;

    if(val == "Name"){
      this.showName = true;      
    }
    else if(val == "MobileNo"){
      this.showMobileNo = true;
    }
    else if(val == "EmailId"){
      this.showEmailId = true;
    }
    else if(val == "Candidateid"){
      this.showCandidateId = true;
    }
    else if(val == "ApplicationId"){
      this.showApplicationId = true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getSearchValue(formObj){

    $('#SearchList').DataTable().clear().destroy();

    this.SearchServices.getSearchDetails(formObj,this.checkData).subscribe(
      response => {
        if (response != "No data") {
            response['Data'].forEach(item => {
              for (let i = 0; i < response['Data'].length; i++) {                            
                if(response['Data'][i]['CurrentStage'] == 'SO')
                {
                  response['Data'][i]['CurrentStageString'] = 'Sourcing';
                }
                else if(response['Data'][i]['CurrentStage'] == 'SC')
                {
                  response['Data'][i]['CurrentStageString'] = 'Screening';
                }
                else if(response['Data'][i]['CurrentStage'] == 'AS')
                {
                  response['Data'][i]['CurrentStageString'] = 'Assessment';
                }
                else if(response['Data'][i]['CurrentStage'] == 'HR')
                {
                  response['Data'][i]['CurrentStageString'] = 'HR Round';
                }
                else if(response['Data'][i]['CurrentStage'] == 'OF')
                {
                  response['Data'][i]['CurrentStageString'] = 'Offered';
                }
                else if(response['Data'][i]['CurrentStage'] == 'JO')
                {
                  response['Data'][i]['CurrentStageString'] = 'Joined';
                }
                else if(response['Data'][i]['CurrentStage'] == 'CR')
                {
                  response['Data'][i]['CurrentStageString'] = 'Client reject';
                }
                else if(response['Data'][i]['CurrentStage'] == 'IR')
                {
                  response['Data'][i]['CurrentStageString'] = 'Internal reject';
                }

                if(response['Data'][i]['RequisitionStatus'] == 'OP')
                {
                  response['Data'][i]['RequisitionStatusString'] = 'Open';
                }
                else if(response['Data'][i]['RequisitionStatus'] == 'DR')
                {
                  response['Data'][i]['RequisitionStatusString'] = 'Draft';
                }
                else if(response['Data'][i]['RequisitionStatus'] == 'HO')
                {
                  response['Data'][i]['RequisitionStatusString'] = 'On Hold';
                }
                else if(response['Data'][i]['RequisitionStatus'] == 'AR')
                {
                  response['Data'][i]['RequisitionStatusString'] = 'Archive';
                }
              } 
            })
            this.SearchList = response['Data'];
            setTimeout(function () {
              $(function () {
                $('#SearchList').DataTable({
                });               
              });      
              $("#loader").hide();
            }, 1500);  
        } else {
            console.log("something is wrong with Service Execution");
        }
      });
  }
}
