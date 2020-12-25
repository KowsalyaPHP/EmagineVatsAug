import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { MatFormFieldControl, MatFormField, MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatChipInputEvent } from '@angular/material';
import { RoleaddComponent } from '../roleadd/roleadd.component';
import { RoleService } from './role.service';
import { AnimationStyleMetadata } from '@angular/animations';
import { AddcityComponent } from '../addcity/addcity.component';
declare var $: any

interface RoleList {
  RoleId: any;
  RoleName: string;
  roleSelected:any;
}

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
  public RoleList: RoleList[];
  //public FunctionList: FunctionList;
 // public SubfunctionList: SubFunctionList;
  message:any; 
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
 // roleSelected?:boolean;
  userCategory:any;
  functionList:any;
  funclist:any;
  
  constructor(private routerObj: Router,private RoleServices: RoleService,private route: ActivatedRoute,public dialog: MatDialog) { 

    this.viewRoleList();  
    this.viewList(1);
    this.userCategory = sessionStorage.getItem("USERCATEGORY");
  }

  ngOnInit() {
    this.funclist = sessionStorage.getItem("FunctionList");      
    if(typeof(this.funclist) != 'object')
    this.functionList = this.funclist.split(','); 
  }

  cancelCall(){
    this.viewRoleList();  
    this.viewList(1);
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

  viewRoleList(){
    this.RoleServices.getRoleList().subscribe(
      response => {
        if (response != "No data") {
          if (response == "Login Failed") {           
            alert ("Your given details are not existed.");
            this.routerObj.navigate(["/login"]);           
          }
          else {                     
          
            response['Data'].forEach(item => {
                        
                if(item['RoleId'] == 1)
                {
                  item.roleSelected = "1";
                }
                            
            });          
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

    selectAll(moduleId,SelectedorNot){
      console.log(SelectedorNot)
      console.log(moduleId);
      if(SelectedorNot == true){
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
      }
    }

    viewList(roleId){
    
      this.RoleServices.RoleModuleFunctionMappingList(roleId).subscribe(
        response => {
          if (response != "No data") {
         
              this.ModuleList = response['Data']['ModuleList'];
             // this.SubfunctionList = response['Data']['SubFunctionList']; 
          
            var Functiongroups = response['Data']['FunctionList'].reduce(function(obj,item){
              obj[item.ModuleName] = obj[item.ModuleName] || [];
              obj[item.ModuleName].push({ ModuleId: item.ModuleId, FunctionId: item.FunctionId ,FunctionName: item.FunctionName, FunctionSelected:item.FunctionSelected});
              return obj;
            }, {});
          
           this.FunctionList = Object.keys(Functiongroups).map(function(key){
                return {moduleName: key, moduleid:Functiongroups[key][0]['ModuleId'], functionGroupList: Functiongroups[key]};
            });
         
            var SubFunctiongroups = response['Data']['SubFunctionList'].reduce(function(obj,item){
              obj[item.FunctionName] = obj[item.FunctionName] || [];
              obj[item.FunctionName].push({ ModuleId: item.ModuleId,FunctionId: item.FunctionId, SubFunctionId: item.SubFunctionId ,SubFunctionName: item.SubFunctionName, SubFunctionSelected:item.SubFunctionSelected});
              return obj;
            }, {});
          
           this.SubfunctionList = Object.keys(SubFunctiongroups).map(function(key){
                return {SubFunctionName: key, functionid:SubFunctiongroups[key][0]['FunctionId'], subfunctionGroupList: SubFunctiongroups[key]};
            });
            
          } else {
              console.log("something is wrong with Service Execution");
          }
        });
      }

      openSnackBar() { 
        var x = document.getElementById("snackbar")
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800);
      }

      addRoleMapping(){

        var confirm = window.confirm('Do you want to add the role details?');
        if (confirm == true) {    

            this.ModuleselectFilter = this.ModuleList.filter( (module) => module.ModuleSelected );
            const ModuleId= this.ModuleselectFilter.map(element => element.ModuleId);
            this.selectedModule = ModuleId.join(',');
          
            this.FunctionMergeList = '';

            this.FunctionList.forEach((item,i) => {            
              this.FunctionList[i]['functionGroupList'].forEach((list,j) => {
                this.FunctionMergeList = this.FunctionMergeList || [];
                this.FunctionMergeList.push(list);    
              });         
            });

            this.FunctionselectFilter = this.FunctionMergeList.filter( (func) => func.FunctionSelected )
            const FunctionId= this.FunctionselectFilter.map(element => element.FunctionId);
            this.selectedFunction = FunctionId.join(',');
            
            this.SubFunctionMergeList = '';

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
              let getMessage =  response['Message'].split(":");
              if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
                this.message = getMessage['1'];
                this.openSnackBar(); 
              }
              else {  
                this.message = getMessage['1'];
                this.openSnackBar(); 
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
             
            }
          } else {
                console.log("something is wrong with Service Execution");
            }
          });
        }
      }

    
}
