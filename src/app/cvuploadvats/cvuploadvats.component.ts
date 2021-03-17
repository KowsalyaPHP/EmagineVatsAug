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
import { CvuploadvatsService } from './cvuploadvats.service';
import { CVDet } from '../models/cvdet';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cvuploadvats',
  templateUrl: './cvuploadvats.component.html',
  styleUrls: ['./cvuploadvats.component.css']
})

export class CvuploadvatsComponent implements OnInit {

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
  submitted = false;
  maxDate: any;
  vendorId: any;
  cvDet: CVDet;
  callCount: number = 0;
  showCVLoader: boolean = false;

  constructor(private CvuploadvatsServices: CvuploadvatsService, private SharedServices: SharedService, private formBuilderObj: FormBuilder, private routerObj: Router, private route: ActivatedRoute, private toastr: ToastrService) {

    this.CVUploadForm = this.formBuilderObj.group({
      CV: ['', [Validators.required]],
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
        this.vendorId = params['uid'];
    });

  }
  close() {
    window.close();
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
      this.CvuploadvatsServices.CVParser(this.fileList).subscribe(res => {
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

  getCVDetails(identifier) {
    this.callCount++;
    this.CvuploadvatsServices.getCVDetail(identifier).subscribe(res => {
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
        this.vendorId = params['uid'];
    });

    this.CvuploadvatsServices.CVUpload(formObj, this.fileList, this.id, this.passEmp, this.passEdu, this.vendorId).subscribe(
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
              this.routerObj.navigate(['jobdescription/', this.id, this.vendorId], { skipLocationChange: true });
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

    ]/*,
    'DateofBirth': [
      { type: 'pattern', message: 'Please enter date of birth' }
    ]*/
  }
}
