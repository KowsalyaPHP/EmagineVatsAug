import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { MatFormFieldControl, MatFormField, MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatChipInputEvent } from '@angular/material';
import { RoleaddComponent } from '../roleadd/roleadd.component';
import { RoleService } from './role.service';
import { AnimationStyleMetadata } from '@angular/animations';
declare var $: any

interface ModuleList {
  ModuleId: any;
  ModuleName: string;
  ModuleSelected?: boolean;
}
interface FunctionList {
  moduleName:{
    ModuleName: string;
  }
  functionGroupList:{
    ModuleName: string;
    FunctionId: any;
    FunctionSelected?: boolean;
  } 
}

interface SubFunctionList {
  SubFunctionName:{
    FunctionName: string;
  }
  subfunctionGroupList:{
    FunctionId: any;
    SubFunctionId: any;
    SubFunctionName: string;
    SubFunctionSelected?: boolean;
  } 
}


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  public ModuleList: ModuleList[];
  //public FunctionList: FunctionList;
 // public SubfunctionList: SubFunctionList;
  message:any; 
  RoleList=[];
  SubfunctionList:any;
  FunctionList:any;
  ModuleselectFilter:any;
  selectedModule:any;
  FunctionselectFilter:any;
  FunctionMergeList:any;
  selectedFunction:any;
  SubFunctionselectFilter:any;
  SubFunctionMergeList:any;
  selectedSubFunction:any;
  RoleId:any;
  array:[];
  radioSelected?:boolean;
  userCategory:any;
  
  constructor(private routerObj: Router,private RoleServices: RoleService,private route: ActivatedRoute,public dialog: MatDialog) { 

    this.viewRoleList();  
    this.viewList(1);
    this.userCategory = sessionStorage.getItem("USERCATEGORY");
  }

  ngOnInit() {
  }

  opendialogaddrole(type,id,name) {
  
    const dialogRef = this.dialog.open(RoleaddComponent, {
      width: '400px',
      data: {addType: type,Id:id,Name:name}      
    });
    
    dialogRef.afterClosed().subscribe(result => {
      
      if(result && result.action === 1) {
        if(type == 'Role'){
          this.RoleList = result['data'];
        }
        else if(type == 'Module'){
          this.ModuleList = result['data']; 
        }
        else if(type == 'Function'){
          var Functiongroups = result['data'].reduce(function(obj,item){
            obj[item.ModuleName] = obj[item.ModuleName] || [];
            obj[item.ModuleName].push({ ModuleId: item.ModuleId, FunctionId: item.FunctionId ,FunctionName: item.FunctionName, FunctionSelected:item.FunctionSelected});
            return obj;
          }, {});
        
         this.FunctionList = Object.keys(Functiongroups).map(function(key){
              return {moduleName: key, functionGroupList: Functiongroups[key]};
          });

         // this.FunctionList = result['data']; 
        }
        else if(type == 'Subfunction'){
          var SubFunctiongroups = result['data'].reduce(function(obj,item){
            obj[item.FunctionName] = obj[item.FunctionName] || [];
            obj[item.FunctionName].push({ FunctionId: item.FunctionId, SubFunctionId: item.SubFunctionId ,SubFunctionName: item.SubFunctionName, SubFunctionSelected:item.SubFunctionSelected});
            return obj;
          }, {});
        
         this.SubfunctionList = Object.keys(SubFunctiongroups).map(function(key){
              return {SubFunctionName: key, subfunctionGroupList: SubFunctiongroups[key]};
          });
        //  this.SubfunctionList = result['data']; 
        }
      }
    }); 
   
  }

  viewRoleList(){
    this.RoleServices.getRoleList().subscribe(
      response => {
        if (response != "No data") {
          if (response == "Login Failed") {           
            alert ("Your given details are not existed.");
            this.routerObj.navigate(["/login"]);           
          }
          else {                     
            this.RoleList = response['Data']; 
          }
        } else {
            console.log("something is wrong with Service Execution");
        }
      });
    }

    getRoleId(roleId){
      this.RoleId = roleId;
      this.viewList(roleId);
    }

    viewList(roleId){
      this.RoleServices.RoleModuleFunctionMappingList(roleId).subscribe(
        response => {
          if (response != "No data") {
                               
              //this.FunctionList = response['Data']['FunctionList']; 
            
              this.ModuleList = response['Data']['ModuleList'];
             // this.SubfunctionList = response['Data']['SubFunctionList']; 
              
           /*  var FunctionGroupList = [];
           
             response['Data']['FunctionList'].forEach(function (a) {
              FunctionGroupList [a.ModuleName] = FunctionGroupList [a.ModuleName] || [];
              FunctionGroupList [a.ModuleName].push({ ModuleId: a.ModuleId, FunctionId: a.FunctionId ,FunctionName: a.FunctionName, FunctionSelected:a.FunctionSelected});
             });
            // this.FunctionList = FunctionGroupList; 
             console.log(FunctionGroupList);*/

            var Functiongroups = response['Data']['FunctionList'].reduce(function(obj,item){
              obj[item.ModuleName] = obj[item.ModuleName] || [];
              obj[item.ModuleName].push({ ModuleId: item.ModuleId, FunctionId: item.FunctionId ,FunctionName: item.FunctionName, FunctionSelected:item.FunctionSelected});
              return obj;
            }, {});
          
           this.FunctionList = Object.keys(Functiongroups).map(function(key){
                return {moduleName: key, functionGroupList: Functiongroups[key]};
            });
          
           
            var SubFunctiongroups = response['Data']['SubFunctionList'].reduce(function(obj,item){
              obj[item.FunctionName] = obj[item.FunctionName] || [];
              obj[item.FunctionName].push({ FunctionId: item.FunctionId, SubFunctionId: item.SubFunctionId ,SubFunctionName: item.SubFunctionName, SubFunctionSelected:item.SubFunctionSelected});
              return obj;
            }, {});
          
           this.SubfunctionList = Object.keys(SubFunctiongroups).map(function(key){
                return {SubFunctionName: key, subfunctionGroupList: SubFunctiongroups[key]};
            });
           
          } else {
              console.log("something is wrong with Service Execution");
          }
        });
      }

      addRoleMapping(){

        var confirm = window.confirm('Do you want to add the role details?');
        if (confirm == true) {    

            this.ModuleselectFilter = this.ModuleList.filter( (module) => module.ModuleSelected );
            const ModuleId= this.ModuleselectFilter.map(element => element.ModuleId);
            this.selectedModule = ModuleId.join(',');
          
         
            this.FunctionList.forEach((item,i) => {            
              this.FunctionList[i]['functionGroupList'].forEach((list,j) => {
                this.FunctionMergeList = this.FunctionMergeList || [];
                this.FunctionMergeList.push(list);    
              });         
            });

            this.FunctionselectFilter = this.FunctionMergeList.filter( (func) => func.FunctionSelected )
            const FunctionId= this.FunctionselectFilter.map(element => element.FunctionId);
            this.selectedFunction = FunctionId.join(',');
            
            this.SubfunctionList.forEach((item,i) => {            
              this.SubfunctionList[i]['subfunctionGroupList'].forEach((list,j) => {
                this.SubFunctionMergeList = this.SubFunctionMergeList || [];
                this.SubFunctionMergeList.push(list);    
              });         
            });

            this.SubFunctionselectFilter = this.SubFunctionMergeList.filter( (subfunc) => subfunc.SubFunctionSelected )
            const SubfunctionId= this.SubFunctionselectFilter.map(element => element.SubFunctionId);
            this.selectedSubFunction = SubfunctionId.join(',');

            console.log(this.selectedSubFunction)

         
        this.RoleServices.RoleModuleFunctionMapping(this.RoleId,this.selectedModule,this.selectedFunction,this.selectedSubFunction).subscribe(
          response => {
            if (response != "No data") {
            
              this.ModuleList = response['Data']['ModuleList'];
              this.SubfunctionList = response['Data']['SubFunctionList']; 
              var Functiongroups = response['Data']['FunctionList'].reduce(function(obj,item){
                obj[item.ModuleName] = obj[item.ModuleName] || [];
                obj[item.ModuleName].push({ ModuleId: item.ModuleId, FunctionId: item.FunctionId ,FunctionName: item.FunctionName, FunctionSelected:item.FunctionSelected});
                return obj;
              }, {});
            
             this.FunctionList = Object.keys(Functiongroups).map(function(key){
                  return {moduleName: key, functionGroupList: Functiongroups[key]};
              });
  
             
              var SubFunctiongroups = response['Data']['SubFunctionList'].reduce(function(obj,item){
                obj[item.FunctionName] = obj[item.FunctionName] || [];
                obj[item.FunctionName].push({ FunctionId: item.FunctionId, SubFunctionId: item.SubFunctionId ,SubFunctionName: item.SubFunctionName, SubFunctionSelected:item.SubFunctionSelected});
                return obj;
              }, {});
            
             this.SubfunctionList = Object.keys(SubFunctiongroups).map(function(key){
                  return {SubFunctionName: key, subfunctionGroupList: SubFunctiongroups[key]};
              });
             
            } else {
                console.log("something is wrong with Service Execution");
            }
          });
        }
      }

    
}
