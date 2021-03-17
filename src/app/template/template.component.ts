import { Component, OnInit,Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { TemplateService } from './template.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
declare var $: any

interface Fields {
  Field_Id: any;
  Field_Display_Name: string;
  checked?: boolean;
}

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  addTemplateForm: FormGroup;
  message:any;  
  templateList:[];
 // FieldList:[];
  submitted = false;
  id:any;
  public FieldList: Fields[];
  Fieldselect:any;
  FieldselectId:any;
  templateSingle:[];
  FieldListData:any;
  disable=false;

  constructor(private routerObj: Router,private TemplateServices: TemplateService,private formBuilderObj: FormBuilder,private route: ActivatedRoute,public dialogRef: MatDialogRef<TemplateComponent>,@Inject(MAT_DIALOG_DATA) public data:any) {

    this.addTemplateForm = this.formBuilderObj.group({     
      Template_Name: ['', [Validators.required]]
    });  

    
    this.route.params.subscribe(params => {
      this.id = params['id'];     
    }); 
    
    var userName = sessionStorage.getItem("userName"); 

   /* if (userName && this.id != 0){           
      this.viewSingleTemplate(this.id);
    }*/

    this.viewTemplateDetails();
   }

  ngOnInit() {
  }

  openSnackBar() { 
    var x = document.getElementById("dialogsnackbar")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800);
  }
  
  onNoClick(): void {
    this.dialogRef.close();
   }

   viewcustomTemplateDetails(){
 
    this.disable=false;
    $('#createTemplate').show();

    this.TemplateServices.viewTemplateDetails().subscribe(
      response => {  
        if (response != "No data") {
          let getMessage =  response['Message'].split(":");
          if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
            this.message = getMessage['1'];
            this.openSnackBar(); 
          }          
          else{ 
            this.templateList = response['Data']['templateDetail'];         
            this.FieldList = response['Data']['FieldDetails'];
            
              $('#customtemplate').removeClass('selected');
              $('#customtemplate').addClass('selected');
          }            
        }
        else {         
          console.log('something is wrong with Service Execution');
        }        
      },
      error => console.log("Error Occurd!")
    );  
  }

  viewTemplateDetails(){
    //$('#customtemplate').addClass('selected');
    this.TemplateServices.viewTemplateDetails().subscribe(
      response => {  
        if (response != "No data") {
          let getMessage =  response['Message'].split(":");
          if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
            this.message = getMessage['1'];
            this.openSnackBar(); 
          }          
          else{ 
            this.templateList = response['Data']['templateDetail'];
           
            if(typeof(this.FieldListData) != 'undefined' || this.FieldListData != null){
              this.disable=true;
              response['Data']['FieldDetails'].forEach(item => {
                for (let i = 0; i < this.FieldListData.length; i++) {                  
                  if(this.FieldListData[i] == item['Field_Id'])
                  {
                    item.checked = true;
                  }
                }               
              });
              this.FieldList = response['Data']['FieldDetails'];
            }
            else{             
              this.FieldList = response['Data']['FieldDetails'];            
            }
          }            
        }
        else {         
          console.log('something is wrong with Service Execution');
        }        
      },
      error => console.log("Error Occurd!")
    );  
  }

  viewSingleTemplate(templateId,index){
  
      this.TemplateServices.viewTemplateSingle(templateId).subscribe(
        response =>  { 
            if (response != "No data") {          
              let getMessage =  response['Message'].split(":");
              if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
                this.message = getMessage['1'];
                this.openSnackBar(); 
              }
              else {                  
                this.FieldListData = response['Data'][0]['Field_List'].split(";"); 
                console.log(this.FieldListData)
                
                this.templateSingle = response['Data']; 
               
                this.addTemplateForm.patchValue({
                  Template_Name: response['Data'][0]['Template_Name']               
                }); 
                this.viewTemplateDetails();

                setTimeout(() => {
                  $('#customtemplate').removeClass('selected');
                 // $('#templateList'+index).removeClass('selected');
                  $('#templateList'+index).addClass('selected');
                  }
                  , 500);
                  $('#createTemplate').hide();            
              }    
                
            } else {
            console.log("something is wrong with Service Execution"); 
            }
          },
          error => console.log(error)      
        );
  }

  get f() { return this.addTemplateForm.controls; }


  addTemplate(formObj){

      this.submitted = true;
  
      if (this.addTemplateForm.invalid) {
        return;
      }

      var userId = sessionStorage.getItem("uniqueSessionId");    
      var userName = sessionStorage.getItem("userName");

      this.Fieldselect = this.FieldList.filter( (field) => field.checked );

      if(this.Fieldselect != ''){ 
        const FieldId= this.Fieldselect.map(element => element.Field_Id);
        this.FieldselectId = FieldId.join(';'); 
      }
      else{        
        this.message = "Please select atleast one field to create template.";
        this.openSnackBar();
        return;
      }
      
      var confirm = window.confirm('Do you want to create this template?');
      
      if (confirm == true) {         
       
        this.TemplateServices.CreateTemplate(formObj,this.FieldselectId).subscribe(
          response => {  
            if (response != "No data") {
              let getMessage =  response['Message'].split(":");
              if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
                this.message = getMessage['1'];
                this.openSnackBar(); 
              }          
              else{
                this.message = getMessage['1'];
                this.openSnackBar();
                this.viewTemplateDetails();
                //this.routerObj.navigate(["/req-dashboard/DR"], { skipLocationChange: true });
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
  

  validation_messages = {
    'Template_Name': [
      { type: 'required', message: 'Please enter template name' }      
    ]
  }
}
