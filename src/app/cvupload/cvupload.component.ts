import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { MatFormFieldControl, MatFormField, MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatChipInputEvent } from '@angular/material';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';  
import { EduGrid,EmpGrid } from '../grid.model';
import { SharedService } from '../shared/shared.service';
import { CvuploadService } from './cvupload.service';

@Component({
  selector: 'app-cvupload',
  templateUrl: './cvupload.component.html',
  styleUrls: ['./cvupload.component.css']
})
export class CvuploadComponent implements OnInit {

  CVUploadForm: FormGroup;
  public EduArray: Array<EduGrid> = [];  
  public EmpArray: Array<EmpGrid> = []; 
  EduValue: any = {};  
  EmpValue: any = {}; 
  passEdu:any; 
  passEmp:any; 
  LkupNationality:[];
  fileList:FileList;
  message:any;
  id:any;
  submitted = false;

  constructor(private CvuploadServices: CvuploadService,private SharedServices: SharedService,private formBuilderObj: FormBuilder,private routerObj: Router,private route: ActivatedRoute,private toastr: ToastrService) {

    this.CVUploadForm = this.formBuilderObj.group({
      CV:['', [Validators.required]], 
      Candidate_FN: ['', [Validators.required]],
      Candidate_LN:['', [Validators.required]],
      EMailId:['', [Validators.required,Validators.pattern("[a-z A-Z,0-9,.,_]+@[a-z A-Z]+[.]+[a-z A-Z,.]+")]],
      MobileNo:['', [Validators.required,Validators.pattern("[0-9]\\d{9}")]],
      DateofBirth:['', [Validators.required]],
      Gender:'',
      MaritalStatus:'',
      WorkAuthorization:'',
      Nationality:'',
      PassportNo:'',
      Pr_AddressL1:'',
      Pr_AddressL2:'',
      Pr_AddressL3:'',
      Pr_AddressL4:'',
      Perm_AddressL1:'',
      Perm_AddressL2:'',
      Perm_AddressL3:'',
      Perm_AddressL4:'',
      Passing_Year: '',
      Marks_Obtained: '',
      Degree_Awarded:'',
      Institution: '',
      From_Date: '',
      Until_Date: '',
      Employer:'',
      Role: ''
    });    

   }
  
  ngOnInit(): void {  
      this.EduValue = {Passing_Year: "", Marks_Obtained: "",Degree_Awarded:"", Institution: ""};  
      this.EduArray.push(this.EduValue);
      
      this.EmpValue = {From_Date: "", Until_Date: "",Employer:"", Role: ""};  
      this.EmpArray.push(this.EmpValue); 
    
      this.getlkupNationality();  
    /*  $(function(){
        $('#filladdress').click(function(){
          if($("#filladdress").is(':checked'))
          {
            $("input:text[id*=Perm_AddressL1]").val($("input:text[id*=Pr_AddressL1]").val());
            $("input:text[id*=Perm_AddressL2]").val($("input:text[id*=Pr_AddressL2]").val());
            $("input:text[id*=Perm_AddressL3]").val($("input:text[id*=Pr_AddressL3]").val());
            $("input:text[id*=Perm_AddressL4]").val($("input:text[id*=Pr_AddressL4]").val());                         
            $("#Perm_AddressL4").val($("#Pr_AddressL4").val());           
          }
         else
          {
            $("input:text[id*=Perm_AddressL1]").val('');
            $("input:text[id*=Perm_AddressL2]").val('');
            $("input:text[id*=Perm_AddressL3]").val('');                         
            $("input:text[id*=Perm_AddressL4]").val(''); 
          }
        
        });
    });*/
  }  

  fillAddress(){
    if($("#filladdress").is(':checked'))
    {
      this.CVUploadForm.patchValue({Perm_AddressL1: $("input:text[id*=Pr_AddressL1]").val()});
      this.CVUploadForm.patchValue({Perm_AddressL2: $("input:text[id*=Pr_AddressL2]").val()});
      this.CVUploadForm.patchValue({Perm_AddressL3: $("input:text[id*=Pr_AddressL3]").val()});
      this.CVUploadForm.patchValue({Perm_AddressL4: $("input:text[id*=Pr_AddressL4]").val()});        
    }
    else
    {
      this.CVUploadForm.patchValue({Perm_AddressL1: ''});
      this.CVUploadForm.patchValue({Perm_AddressL2:''});
      this.CVUploadForm.patchValue({Perm_AddressL3: ''});
      this.CVUploadForm.patchValue({Perm_AddressL4:''});    
    }
        
 /*   if ($(this).attr('checked')) { 


      $("#Perm_AddressL1").val($("#Pr_AddressL1").val());
      $("#Perm_AddressL2").val($("#Pr_AddressL2").val());
      $("#Perm_AddressL3").val($("#Pr_AddressL3").val());                         
      $("#Perm_AddressL4").val($("#Pr_AddressL4").val());  
    }   */
  //  this.screeningForm.patchValue({ExpHike: hike.toFixed(2)});
  }


  addRowEdu() {    
      this.EduValue = {Passing_Year: "", Marks_Obtained: "",Degree_Awarded:"", Institution: ""}  
      this.EduArray.push(this.EduValue);  
   //   this.passEdu = JSON.stringify(this.EduArray);      
      this.toastr.success('New row added successfully', 'New Row');  
      return true;  
  }
    
  deleteRowEdu(index) {  
      if(this.EduArray.length ==1) {  
        this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
          return false;  
      } else {  
          this.EduArray.splice(index, 1);  
          this.toastr.warning('Row deleted successfully', 'Delete row');  
          return true;  
      }  
  }  

  addRowEmp() {    
    this.EmpValue = {From_Date: "", Until_Date: "",Employer:"", Role: ""}  
    this.EmpArray.push(this.EmpValue);  
   // this.passEmp = JSON.stringify(this.EmpArray);
     
    this.toastr.success('New row added successfully', 'New Row');  
    
    return true;  
  }
  
  deleteRowEmp(index) {  
      if(this.EmpArray.length ==1) {  
        this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
          return false;  
      } else {  
          this.EmpArray.splice(index, 1);  
          this.toastr.warning('Row deleted successfully', 'Delete row');  
          return true;  
      }  
  }  


  getlkupNationality() {
    this.SharedServices.getNationality().subscribe(
      response => {
        if (response != '') {         
          this.LkupNationality = response;
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }   

  openSnackBar() { 
    var x = document.getElementById("snackbar")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800);
  }


  fileChange(event) {
    this.fileList  = event.target.files;
  }

  get f() { return this.CVUploadForm.controls; }

  CVUpload(formObj){

    this.submitted = true;

    if (this.CVUploadForm.invalid) {
      return;
    }

    this.passEdu = JSON.stringify(this.EduArray);
    this.passEmp = JSON.stringify(this.EmpArray);
    
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.CvuploadServices.CVUpload(formObj,this.fileList,this.id,this.passEmp,this.passEdu).subscribe(
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
            this.routerObj.navigate(['manage/',this.id,'SO']);
          }            
        }
        else {         
          console.log('something is wrong with Service Execution');
        }        
      },
      error => console.log("Error Occurd!")
    );  
  }

  cv_validation_messages = {
    'CV': [
      { type: 'required', message: 'Please select file' }      
    ],
    'Candidate_FN': [
      { type: 'required', message: 'Please enter first name' }      
    ],
    'Candidate_LN': [
      { type: 'required', message: 'Please enter last name' }
    ],
    'EMailId': [
      { type: 'required', message: 'Please enter valid email id' }
    ],
    'MobileNo': [
      { type: 'pattern', message: 'Please enter valid phone number' }
      
    ],
    'DateofBirth': [
      { type: 'pattern', message: 'Please enter date of birth' }
    ]
  }
}
