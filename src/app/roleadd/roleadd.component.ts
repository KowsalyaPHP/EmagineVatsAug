import { Component, OnInit,Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { RoleaddService } from './roleadd.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-roleadd',
  templateUrl: './roleadd.component.html',
  styleUrls: ['./roleadd.component.css']
})
export class RoleaddComponent implements OnInit {

  addRoleForm: FormGroup;
  addModuleForm: FormGroup;
  addFunctionForm: FormGroup;
  addSubFunctionForm: FormGroup;
  submitted = false;
  messages:any;
  showRoleForm = false;
  showModuleForm = false;
  showFunctionForm = false;
  showSubfunctionForm = false;
  ModuleList=[];
  FunctionList=[];

  constructor(private routerObj: Router,private RoleaddServices: RoleaddService,private formBuilderObj: FormBuilder,private route: ActivatedRoute,public dialogRef: MatDialogRef<RoleaddComponent>,@Inject(MAT_DIALOG_DATA) public data:any) {

    this.addRoleForm = this.formBuilderObj.group({
      RoleName: ['', [Validators.required]]
    }); 
    
    this.addModuleForm = this.formBuilderObj.group({
      ModuleName: ['', [Validators.required]]
    });

    this.addFunctionForm = this.formBuilderObj.group({
      ModuleId: ['', [Validators.required]],
      FunctionName: ['', [Validators.required]]
    });

    this.addSubFunctionForm = this.formBuilderObj.group({
      FunctionId: ['', [Validators.required]],
      SubFunctionName: ['', [Validators.required]]
    });

    this.viewModuleList();
    this.viewFunctionList();

    if(this.data['addType'] == 'Role'){
      this.showRoleForm = true;
      if(this.data['Name'] != 'add'){
        this.addRoleForm.patchValue({
          RoleName: this.data['Name']        
        });
      }      
    }   
    else if(this.data['addType'] == 'Module'){
      this.showModuleForm = true;
       if(this.data['Name'] != 'add'){
        this.addModuleForm.patchValue({
          ModuleName: this.data['Name']        
        });
      }   
    }   
    else if(this.data['addType'] == 'Function'){
      this.showFunctionForm = true;
    }   
    else if(this.data['addType'] == 'Subfunction'){
      this.showSubfunctionForm = true;
    }
  }

  ngOnInit() {
  }

  openSnackBar() { 
    var x = document.getElementById("Rolesnackbar")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800);
  }

  addRole(formObj) {

    this.submitted = true;
 
    if (this.addRoleForm.invalid) {
      return;
    }
    if(this.data['Name'] != 'add'){
      this.RoleaddServices.EditRole(formObj,this.data['Id']).subscribe(
        response => {  
          if (response != "No data") {
            let getMessage =  response['Message'].split(":");
            if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
              this.messages = getMessage['1'];
              this.openSnackBar(); 
            }          
            else{
              this.messages = getMessage['1'];
              this.openSnackBar();
              setTimeout(() => {
                this.dialogRef.close({action: 1, data: response['Data']});
              }
              , 3000);              
            }            
          }
          else {         
            console.log('something is wrong with Service Execution');
          }        
        },
        error => console.log("Error Occurd!")
      );
    }
    else{
      this.RoleaddServices.addRoles(formObj).subscribe(
        response => {  
          if (response != "No data") {
            let getMessage =  response['Message'].split(":");
            if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
              this.messages = getMessage['1'];
              this.openSnackBar(); 
            }          
            else{
              this.messages = getMessage['1'];
              this.openSnackBar();
              setTimeout(() => {
                this.dialogRef.close({action: 1, data: response['Data']});
              }
              , 3000);                
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

  addModule(formObj) {

    this.submitted = true;
 
    if (this.addModuleForm.invalid) {
      return;
    }
    if(this.data['Name'] != 'add'){
      this.RoleaddServices.EditModule(formObj,this.data['Id']).subscribe(
        response => {  
          if (response != "No data") {
            let getMessage =  response['Message'].split(":");
            if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
              this.messages = getMessage['1'];
              this.openSnackBar(); 
            }          
            else{
              this.messages = getMessage['1'];
              this.openSnackBar();
              setTimeout(() => {
                this.dialogRef.close({action: 1, data: response['Data']});
              }
              , 3000); 
            }            
          }
          else {         
            console.log('something is wrong with Service Execution');
          }        
        },
        error => console.log("Error Occurd!")
      );  
    }
    else{
      this.RoleaddServices.addModules(formObj).subscribe(
        response => {  
          if (response != "No data") {
            let getMessage =  response['Message'].split(":");
            if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
              this.messages = getMessage['1'];
              this.openSnackBar(); 
            }          
            else{
              this.messages = getMessage['1'];
              this.openSnackBar();
              setTimeout(() => {
                this.dialogRef.close({action: 1, data: response['Data']});
              }
              , 3000);               
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

  
  viewModuleList(){
    this.RoleaddServices.getModuleList().subscribe(
      response => {
        if (response != "No data") {                             
            this.ModuleList = response['Data'];
        } else {
            console.log("something is wrong with Service Execution");
        }
      });
  }

  addFunction(formObj) {

    this.submitted = true;
 
    if (this.addFunctionForm.invalid) {
      return;
    }

    this.RoleaddServices.addFunctions(formObj).subscribe(
      response => {  
        if (response != "No data") {
          let getMessage =  response['Message'].split(":");
          if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
            this.messages = getMessage['1'];
            this.openSnackBar(); 
          }          
          else{
            this.messages = getMessage['1'];
            this.openSnackBar();
            setTimeout(() => {
              this.dialogRef.close({action: 1, data: response['Data']});
            }
            , 3000); 
          }            
        }
        else {         
          console.log('something is wrong with Service Execution');
        }        
      },
      error => console.log("Error Occurd!")
    );  
  }

  viewFunctionList(){
    this.RoleaddServices.getFunctionList().subscribe(
      response => {
        if (response != "No data") {
          if (response == "Login Failed") {           
            alert ("Your given details are not existed.");
            this.routerObj.navigate(["/login"]);           
          }
          else {                     
            this.FunctionList = response['Data']; 
          }
        } else {
            console.log("something is wrong with Service Execution");
        }
      });
    }

  addSubFunction(formObj) {

    this.submitted = true;
 
    if (this.addSubFunctionForm.invalid) {
      return;
    }

    this.RoleaddServices.addSubFunctions(formObj).subscribe(
      response => {  
        if (response != "No data") {
          let getMessage =  response['Message'].split(":");
          if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
            this.messages = getMessage['1'];
            this.openSnackBar(); 
          }          
          else{
            this.messages = getMessage['1'];
            this.openSnackBar();
            setTimeout(() => {
              this.dialogRef.close({action: 1, data: response['Data']});
            }
            , 3000); 
          }            
        }
        else {         
          console.log('something is wrong with Service Execution');
        }        
      },
      error => console.log("Error Occurd!")
    );  
  }

 
  onNoClick(): void {
    this.dialogRef.close();
  }


  validation_messages = {
    'RoleName': [
      { type: 'required', message: 'Please enter role name' }      
    ],
    'ModuleName': [
      { type: 'required', message: 'Please enter module name' }      
    ],
    'ModuleId': [
      { type: 'required', message: 'Please select module name' }      
    ],
    'FunctionName': [
      { type: 'required', message: 'Please enter function name' }      
    ],
    'FunctionId': [
      { type: 'required', message: 'Please enter function name' }      
    ],
    'SubFunctionName': [
      { type: 'required', message: 'Please enter sub function name' }      
    ]

  }
}
