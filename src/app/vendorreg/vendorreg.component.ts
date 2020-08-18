import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { VendorregService } from './vendorreg.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-vendorreg',
  templateUrl: './vendorreg.component.html',
  styleUrls: ['./vendorreg.component.css']
})
export class VendorregComponent implements OnInit {

  addVendorForm: FormGroup;
  cityLookups:[];
  LookupCategory:[];
  LookupType:[];
  LookupExpertise:[];
  VLookupStatus:[];

  constructor(private formBuilderObj: FormBuilder,private routerObj: Router,private VendorregServices: VendorregService,private SharedServices: SharedService) { 

    this.addVendorForm = this.formBuilderObj.group({     
      VendorName: ['', [Validators.required]],      
      RegdAddressL1: ['', [Validators.required]],
      Area: ['', [Validators.required]],
      City:['', [Validators.required]],
      PINCODE: ['', [Validators.required]],
      VendorPhoneNo: ['', [Validators.required]],
      VendorFaxNo:'',
      VendorMobileNo:['', [Validators.required]],
      VendorEMAILID: ['', [Validators.required]],
      MainContact:['', [Validators.required]],
      MainContactDesgn:'',
      MainContactNo:'',
      MainContactEmailId:'',
      AltContact:['', [Validators.required]],
      AltContactDesgn:'',
      AltContactNo:'',
      AltContactEmailId:'',                  
      VendorGSTNo:'' ,
      VendorLandMark:'',    
      VendorTier: '',
      VendorExpertise:'' ,
      VendorType:'' ,
      TeamSize:'' ,
      AllowedUserCt:'',
      ConcurrentUserCt:'',
      CommonPoolYorN:'' ,
      OwnPoolPermitYorN:'' ,
      AdminRightsYorN:'',            
      VendorGLCode:'',
      VendorStatus:''
    });  

    this.cityLookup();
    this.getVLookupCategories();
    this.getVLookupTypes();
    this.getVLookupExpertises();
    this.getStatusLookup();

  }

  ngOnInit() {
  }

  cityLookup() {
    this.SharedServices.getLkupCity().subscribe(
      response => {
        if (response != '') {         
          this.cityLookups = response;
          console.log(this.cityLookups)
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }
  getVLookupCategories() {
    this.SharedServices.getVLookupCategory().subscribe(
      response => {
        if (response != '') {         
          this.LookupCategory = response;
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }

  getVLookupTypes() {
    this.SharedServices.getVLookupType().subscribe(
      response => {
        if (response != '') {         
          this.LookupType = response;
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }
  getVLookupExpertises() {
    this.SharedServices.getVLookupExpertise().subscribe(
      response => {
        if (response != '') {         
          this.LookupExpertise = response;
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }
  getStatusLookup() {
    this.SharedServices.getVLookupStatus().subscribe(
      response => {
        if (response != '') {         
          this.VLookupStatus = response;
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }

  validation_messages = {
    'VendorName': [
      { type: 'required', message: 'Please enter client name' }      
    ],
    'RegdAddressL1': [
      { type: 'required', message: 'Please enter door no,address' }      
    ],
    'Area': [
      { type: 'required', message: 'Please enter area' }
    ],
    'City': [
      { type: 'required', message: 'Please select city' }
    ],
    'PINCODE': [
      { type: 'pattern', message: 'Please enter pincode' }      
    ],
    'VendorPhoneNo': [
      { type: 'pattern', message: 'Please enter phone number' }
    ],
    'VendorMobileNo': [
      { type: 'pattern', message: 'Please enter mobile number' }
    ],
    'VendorEMAILID': [
      { type: 'pattern', message: 'Please enter email id' }
    ],
    'MainContact': [
      { type: 'pattern', message: 'Please enter main contact' }
    ],
    'AltContact': [
      { type: 'pattern', message: 'Please enter alternate contact' }
    ],
    'VendorCategory': [
      { type: 'pattern', message: 'Please enter client category' }
    ],
    'VendorType': [
      { type: 'pattern', message: 'Please enter client type' }
    ]
  }

}
