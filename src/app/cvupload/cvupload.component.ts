import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { MatFormFieldControl, MatFormField, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatChipInputEvent } from '@angular/material';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { EduGrid, EmpGrid } from '../grid.model';
import { SharedService } from '../shared/shared.service';
import { CvuploadService } from './cvupload.service';
import { saveAs } from 'file-saver';
import { CVDet } from '../models/cvdet';
import { environment } from 'src/environments/environment';
import {DocviewComponent} from '../docview/docview.component'
import { DataService } from '../services/data.service';
declare var $: any

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
  passEdu: any;
  passEmp: any;
  LkupNationality: [];
  fileList: FileList;
  message: any;
  id: any;
  cid: any;
  submitted = false;
  maxDate: any;
  CvView: [];
  attachment: any;
  cvDet: CVDet;
  callCount: number = 0;
  showCVLoader: boolean = false;
  aid: any;
  CurrentStage:any;

  constructor(private CvuploadServices: CvuploadService, private dataService: DataService, private SharedServices: SharedService, private formBuilderObj: FormBuilder, private routerObj: Router, private route: ActivatedRoute, public dialog: MatDialog,private toastr: ToastrService) {

    this.CVUploadForm = this.formBuilderObj.group({
      CV: '',
      Candidate_FN: ['', [Validators.required]],
      Candidate_LN: ['', [Validators.required]],
      EMailId: ['', [Validators.required, Validators.pattern("[a-z A-Z,0-9,.,_]+@[a-z A-Z]+[.]+[a-z A-Z,.]+")]],
      MobileNo: ['', [Validators.required, Validators.pattern("[0-9]\\d{9}")]],
      DateofBirth: '',
      Gender: '',
      //MaritalStatus:'',
      WorkAuthorization: '',
      Nationality: '',
      PassportNo: '',
      Pr_AddressL1: '',
      Pr_AddressL2: '',
      Pr_AddressL3: '',
      Pr_AddressL4: '',
      Perm_AddressL1: '',
      Perm_AddressL2: '',
      Perm_AddressL3: '',
      Perm_AddressL4: '',
      Passing_Year: '',
      Marks_Obtained: '',
      Degree_Awarded: '',
      Institution: '',
      From_Date: '',
      Until_Date: '',
      Employer: '',
      Role: ''
    });

    this.route.params.subscribe(params => {
      this.id = params['id'],
        this.cid = params['cid'];
    });

    if (this.cid != 0) {
      this.ViewCV(this.id,this.cid);
    }

  }

  

  replaceCV(replaceFile) {

    this.route.params.subscribe(params => {
      this.id = params['id'],
      this.cid = params['cid'],
      this.aid = params['aid'];
    });

    this.CvuploadServices.replaceCVLink(this.id,this.cid,this.aid,replaceFile).subscribe(
      response => {
        if (response != '') {         
          let getMessage =  response['Message'].split(":");
          if (getMessage['0'] == "400" || getMessage['0'] == "500") {  
            this.message = getMessage['1'];
            this.openSnackBar(); 
            $("#loaderwhite").hide(); 
          }
          else{
            this.message = getMessage['1'];
            this.openSnackBar();          
            $("#loaderwhite").hide();   
            $(".dropdown-menu").fadeOut("fast");
            this.dataService.changeReloadCVUpload(true);
            
          }
        }
      },
      error => console.log("Error Occurd!")
    );
    
  }

  FileMethod() { 
    $(".dropdown-menu").fadeOut("fast");
    $("#showmenu").show();
    const component = this;

    $('.form-field-file').each(function(){      
      var label = $('label', this);
      var labelValue = $(label).html();
      var fileInput = $('input[type="file"]', this);

      $(fileInput).on('change', function(e){      
        var fileName = $(this).val().split('\\').pop();
        if (fileName) {      
          
          $("#loaderwhite").show();
          component.replaceCV(this.files[0])
          //$(label).html(fileName);
        } 
        else { 
          $(label).html(labelValue);
        }      
      });

    });

    $(document).on("click", function(event){
      var $trigger = $(".dropdown");
      if($trigger !== event.target && !$trigger.has(event.target).length){
        $(".dropdown-menu").fadeOut("fast");
      }            
   });
  }

  ViewCV(ReqId,cId) {

    this.CvuploadServices.viewCV(ReqId,cId).subscribe(
      response => {
        if (response != "No data") {
          let getMessage = response['Message'].split(":");
          if (getMessage['0'] == "400" || getMessage['0'] == "500") {
            this.message = getMessage['1'];
            this.openSnackBar();
          }
          else {
            this.CvView = response['Data'];

            let getFileName = this.CvView['CVLink'].split("#$#");
            this.attachment = getFileName['1'];

            /*$("#DateofBirth").prop('readonly', true);
            $("#Gender").prop('readonly', true);
            $("#WorkAuthorization").prop('readonly', true);
            $("#Nationality").prop('readonly', true);
            $("#PassportNo").prop('readonly', true);
            $("#Pr_AddressL1").prop('readonly', true);
            $("#Pr_AddressL2").prop('readonly', true);
            $("#Pr_AddressL3").prop('readonly', true);
            $("#Pr_AddressL4").prop('readonly', true);
            $("#Perm_AddressL1").prop('readonly', true);
            $("#Perm_AddressL2").prop('readonly', true);
            $("#Perm_AddressL3").prop('readonly', true);
            $("#Perm_AddressL4").prop('readonly', true);*/

            if(this.CvView['DateofBirth'] != ''){
              var dateofbirth = new Date(this.CvView['DateofBirth']);
            }
            else{
              var dateofbirth = this.CvView['DateofBirth'];
            }

            this.CurrentStage = this.CvView['CurrentStage'];

            this.CVUploadForm.patchValue({
              Candidate_FN: this.CvView['Candidate_FN'],
              Candidate_LN: this.CvView['Candidate_LN'],
              EMailId: this.CvView['EMailId'],
              MobileNo: this.CvView['MobileNo'],
              DateofBirth: dateofbirth,
              Gender: this.CvView['Gender'],
              WorkAuthorization: this.CvView['WorkAuthorization'],
              Nationality: this.CvView['Nationality'],
              PassportNo: this.CvView['PassportNo'],
              Pr_AddressL1: this.CvView['Pr_AddressL1'],
              Pr_AddressL2: this.CvView['Pr_AddressL2'],
              Pr_AddressL3: this.CvView['Pr_AddressL3'],
              Pr_AddressL4: this.CvView['Pr_AddressL4'],
              Perm_AddressL1: this.CvView['Perm_AddressL1'],
              Perm_AddressL2: this.CvView['Perm_AddressL2'],
              Perm_AddressL3: this.CvView['Perm_AddressL3'],
              Perm_AddressL4: this.CvView['Perm_AddressL4']
            });
            this.EduArray = this.CvView['Edulist'];
            this.EmpArray = this.CvView['Emplist'];

          }

        } else {
          console.log("something is wrong with Service Execution");
        }
      },
      error => console.log(error)
    );
  }

  ngOnInit(): void {
    var date = new Date();
    this.maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18));

    this.EduValue = { Passing_Year: "", Marks_Obtained: "", Degree_Awarded: "", Institution: "" };
    this.EduArray.push(this.EduValue);

    this.EmpValue = { From_Date: "", Until_Date: "", Employer: "", Role: "" };
    this.EmpArray.push(this.EmpValue);

    this.getlkupNationality();

    $(function () {
      $('input[type="file"]').change(function () {
        if ($(this).val() != "") {
          $(this).css('color', '#333');
        } else {
          $(this).css('color', 'transparent');
        }
      });
    });

    this.dataService.getReloadCVUploadFlag.subscribe(flag=>{
      if(flag == true){
        this.ViewCV(this.id,this.cid);
      }
    });

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
  downLoadFile(data: any) {
    console.log(data.headers);
    let contenType = data.headers.get("content-type");
    let contdisp = data.headers.get("content-disposition").split("=");
    let fileName = contdisp[1].trim();
    let blob = new Blob([data._body], { type: contenType });
    let file = new File([blob], fileName, { type: contenType });
    saveAs(file);
  }

  downloadCV(reqId, CandId, AppId) {

    this.CvuploadServices.downloadCVLink(reqId, CandId, AppId).subscribe(
      response => {
        if (response != '') {
          this.downLoadFile(response);
        }
        else {
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );

  }

  fillAddress() {
    if ($("#filladdress").is(':checked')) {
      this.CVUploadForm.patchValue({ Perm_AddressL1: $("input:text[id*=Pr_AddressL1]").val() });
      this.CVUploadForm.patchValue({ Perm_AddressL2: $("input:text[id*=Pr_AddressL2]").val() });
      this.CVUploadForm.patchValue({ Perm_AddressL3: $("input:text[id*=Pr_AddressL3]").val() });
      this.CVUploadForm.patchValue({ Perm_AddressL4: $("input:text[id*=Pr_AddressL4]").val() });
    }
    else {
      this.CVUploadForm.patchValue({ Perm_AddressL1: '' });
      this.CVUploadForm.patchValue({ Perm_AddressL2: '' });
      this.CVUploadForm.patchValue({ Perm_AddressL3: '' });
      this.CVUploadForm.patchValue({ Perm_AddressL4: '' });
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
    this.EduValue = { Passing_Year: "", Marks_Obtained: "", Degree_Awarded: "", Institution: "" }
    this.EduArray.push(this.EduValue);
    //   this.passEdu = JSON.stringify(this.EduArray);      
    this.toastr.success('New row added successfully', 'New Row');
    return true;
  }

  deleteRowEdu(index) {
    if (this.EduArray.length == 1) {
      this.toastr.error("Can't delete the row when there is only one row", 'Warning');
      return false;
    } else {
      this.EduArray.splice(index, 1);
      this.toastr.warning('Row deleted successfully', 'Delete row');
      return true;
    }
  }

  addRowEmp() {
    this.EmpValue = { From_Date: "", Until_Date: "", Employer: "", Role: "" }
    this.EmpArray.push(this.EmpValue);
    // this.passEmp = JSON.stringify(this.EmpArray);

    this.toastr.success('New row added successfully', 'New Row');

    return true;
  }

  deleteRowEmp(index) {
    if (this.EmpArray.length == 1) {
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
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3800);
  }


  fileChange(event) {
    this.fileList = event.target.files;
    if (environment.isAffindaEnable == true) {
      this.showCVLoader = true;
      this.CvuploadServices.CVParser(this.fileList).subscribe(res => {
        if (res && res["identifier"]) {
          if (res["ready"] == false) {
            setTimeout(() => {
              this.callCount = 0;
              this.getCVDetails(res["identifier"]);
            }, 3000);
          }
          else {
            this.cvDet = res;
            this.setCVDet();
          }
        }
      },
        error => {
          console.log(error);
          this.showCVLoader = false;
        });
    }
  }

  viewCVedit() {
    let RefId = sessionStorage.getItem("RefId");
    this.route.params.subscribe(params => {
      this.id = params['id'],
      this.cid = params['cid'],
      this.aid = params['aid'];
    });
    sessionStorage.setItem('Entityid', RefId);
    sessionStorage.setItem('RequisitionId', this.id);
    sessionStorage.setItem('CandidateId', this.cid);
    sessionStorage.setItem('ApplicationId', this.aid);
    this.openDialogCV();
  }
  
  openDialogCV(): void {

    const dialogRef = this.dialog.open(DocviewComponent, {
      width: '900px',
      // data: {fileName: fileName}      
    });

    
  }

  getCVDetails(identifier) {
    this.callCount++;
    this.CvuploadServices.getCVDetail(identifier).subscribe(res => {
      if (res["ready"] == false) {
        if (this.callCount <= 5) {
          setTimeout(() => {
            this.getCVDetails(identifier);
          }, 5000);
        }
        else {
          this.showCVLoader = false;
          this.callCount = 0;
        }
      }
      else {
        this.cvDet = res;
        this.setCVDet();
      }
    },
      error => {
        console.log(error);
        this.showCVLoader = false;
      });
  }

  setCVDet() {
    this.showCVLoader = false;
    if (this.cvDet) {
      this.CVUploadForm.reset();
      this.EmpArray = [];
      let empVal = { From_Date: "", Until_Date: "", Employer: "", Role: "" };
      this.EmpArray.push(empVal);
      this.EduArray = [];
      let eduVal = { Passing_Year: "", Marks_Obtained: "", Degree_Awarded: "", Institution: "" }
      this.EduArray.push(eduVal);
      if (this.cvDet.name) {
        if (this.cvDet.name.first) {
          this.CVUploadForm.patchValue({
            Candidate_FN: this.cvDet.name.first
          });
        }

        if (this.cvDet.name.last) {
          this.CVUploadForm.patchValue({
            Candidate_LN: this.cvDet.name.last
          });
        }
      }

      if (this.cvDet.emails && this.cvDet.emails.length > 0) {
        this.CVUploadForm.patchValue({
          EMailId: this.cvDet.emails[0]
        });
      }
      if (this.cvDet.phone_numbers && this.cvDet.phone_numbers.length > 0) {
        this.CVUploadForm.patchValue({
          MobileNo: this.cvDet.phone_numbers[0]
        });
      }
      if (this.cvDet.date_of_birth) {
        this.CVUploadForm.patchValue({
          DateofBirth: this.cvDet.date_of_birth
        });
      }

      if (this.cvDet.location) {
        if (this.cvDet.location.state) {
          this.CVUploadForm.patchValue({
            Pr_AddressL4: this.cvDet.location.state,
            Perm_AddressL4: this.cvDet.location.state
          });
        }
        // if (this.cvDet.location.raw_input) {
        //   this.CVUploadForm.patchValue({
        //     Pr_AddressL3: this.cvDet.location.raw_input,
        //     Perm_AddressL3: this.cvDet.location.raw_input
        //   });
        // }
      }

      if (this.cvDet.education && this.cvDet.education.length > 0) {
        while (this.EduArray.length < this.cvDet.education.length) {
          let eduVal = { Passing_Year: "", Marks_Obtained: "", Degree_Awarded: "", Institution: "" };
          this.EduArray.push(eduVal);
        }
        for (let i = this.cvDet.education.length - 1, j = 0; i >= 0 && j < this.cvDet.education.length; i--, j++) {
          if (this.cvDet.education[j].organization) {
            this.EduArray[i].Institution = this.cvDet.education[j].organization;
            if (this.cvDet.education[j].grade && this.cvDet.education[j].grade.value) {
              this.EduArray[i].Marks_Obtained = this.cvDet.education[j].grade.value;
            }
            if (this.cvDet.education[j].dates && this.cvDet.education[j].dates.completionDate) {
              this.EduArray[i].Passing_Year = this.cvDet.education[j].dates.completionDate.substring(0, 4);
            }
            if (this.cvDet.education[j].accreditation && this.cvDet.education[j].accreditation.education) {
              this.EduArray[i].Degree_Awarded = this.cvDet.education[j].accreditation.education;
            }
          }
        }
      }

      if (this.cvDet.work_experience && this.cvDet.work_experience.length > 0) {
        while (this.EmpArray.length < this.cvDet.work_experience.length) {
          let empVal = { From_Date: "", Until_Date: "", Employer: "", Role: "" };
          this.EmpArray.push(empVal);
        }
        for (let i = this.cvDet.work_experience.length - 1, j = 0; i >= 0 && j < this.cvDet.work_experience.length; i--, j++) {
          if (this.cvDet.work_experience[j].organization) {
            this.EmpArray[i].Employer = this.cvDet.work_experience[j].organization;
            if (this.cvDet.work_experience[j].job_title) {
              this.EmpArray[i].Role = this.cvDet.work_experience[j].job_title;
            }
            if (this.cvDet.work_experience[j].dates) {
              if (this.cvDet.work_experience[j].dates.start_date) {
                this.EmpArray[i].From_Date = this.cvDet.work_experience[j].dates.start_date;
              }
              if (this.cvDet.work_experience[j].dates.end_date) {
                this.EmpArray[i].Until_Date = this.cvDet.work_experience[j].dates.end_date;
              }
            }
          }
        }
      }
    }
  }

  get f() { return this.CVUploadForm.controls; }

  CVUpload(formObj) {

    this.submitted = true;

    if (this.CVUploadForm.invalid) {
      return;
    }

    this.passEdu = JSON.stringify(this.EduArray);
    this.passEmp = JSON.stringify(this.EmpArray);

    this.route.params.subscribe(params => {
      this.id = params['id'],
      this.cid = params['cid'],
      this.aid = params['aid'];
    });

    var userName = sessionStorage.getItem("userName");
    var userId = sessionStorage.getItem("uniqueSessionId");


    if (userId && this.cid != 0) {

      var confirm = window.confirm('Do you want to update the cv details?');
      if (confirm == true) {

        this.CvuploadServices.UpdateCV(this.id,this.cid, formObj,this.fileList,this.passEdu,this.passEmp).subscribe(
          response => {
            if (response != "No data") {
              let getMessage = response['Message'].split(":");
              if (getMessage['0'] == "400" || getMessage['0'] == "500") {
                this.message = getMessage['1'];
                this.openSnackBar();
              }
              else {
                this.message = getMessage['1'];
                this.openSnackBar();
                setTimeout(() => {
                  this.routerObj.navigate(['manage/', this.id, this.CurrentStage]);
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
    else {
      var confirm = window.confirm('Do you want to add this cv details?');

      if (confirm == true) {
        this.CvuploadServices.CVUpload(formObj, this.fileList, this.id, this.passEmp, this.passEdu).subscribe(
          response => {
            if (response != "No data") {
              let getMessage = response['Message'].split(":");
              if (getMessage['0'] == "400" || getMessage['0'] == "500") {
                this.message = getMessage['1'];
                this.openSnackBar();
              }
              else {
                this.message = getMessage['1'];
                this.openSnackBar();
                setTimeout(() => {
                  this.routerObj.navigate(['manage/', this.id, 'SO']);
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

  }

  cv_validation_messages = {
    'CV': [
      { type: 'required', message: 'Please select file' }
    ],
    'Candidate_LN': [
      { type: 'required', message: 'Please enter last name' }
    ],
    /* 'DateofBirth': [
       { type: 'pattern', message: 'Please enter date of birth' }
     ]*/

    'Candidate_FN': [
      { type: 'required', message: 'Please enter first name' }
    ],
    'EMailId': [
      { type: 'required', message: 'Please enter valid email id' }
    ],
    'MobileNo': [
      { type: 'pattern', message: 'Please enter valid phone number' }

    ]
  }
}
