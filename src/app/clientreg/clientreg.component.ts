import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { ClientregService } from './clientreg.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-clientreg',
  templateUrl: './clientreg.component.html',
  styleUrls: ['./clientreg.component.css']
})
export class ClientregComponent implements OnInit {

  addClientForm: FormGroup;
  submitted = false;
  message:any;

  constructor(private ClientregServices: ClientregService,private SharedServices: SharedService,private formBuilderObj: FormBuilder,private routerObj: Router,private route: ActivatedRoute) {

    this.addClientForm = this.formBuilderObj.group({
      ClientName: ['', [Validators.required]],
      RegdAddressL1: ['', [Validators.required]],
      Area: ['', [Validators.required]],
      City:['', [Validators.required]],
      PINCODE:['', [Validators.required]],
      ClientPhoneNo:['', [Validators.required]],
      ClientMobileNo: ['', [Validators.required]],
      ClientEMAILID:['', [Validators.required]],
      MainContact:['', [Validators.required]],
      MainContactDesgn: '',
      MainContactNo:'',
      MainContactEmailId: '',
      AltContact: ['', [Validators.required]],
      AltContactDesgn: '',
      AltContactNo: '',
      AltContactEmailId:'',
      ClientCategory:['', [Validators.required]],
      ClientType:['', [Validators.required]] ,
      MasterClientID:'',
      ClientGLCode:'',     
      AccountManager:'',
      Coordinator:'',
    });    

  }
  
  ngOnInit() {
  }

  openSnackBar() { 
    var x = document.getElementById("snackbar")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800);
  }

  get f() { return this.addClientForm.controls; }

  addClient(formObj){

    this.submitted = true;

    if (this.addClientForm.invalid) {
      return;
    }

    this.ClientregServices.addClientDetails(formObj).subscribe(
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
            //this.routerObj.navigate(['manage/',this.id,'SO']);
          }            
        }
        else {         
          console.log('something is wrong with Service Execution');
        }        
      },
      error => console.log("Error Occurd!")
    );  
  }

  validation_messages = {
    'ClientName': [
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
    'ClientPhoneNo': [
      { type: 'pattern', message: 'Please enter phone number' }
    ],
    'ClientMobileNo': [
      { type: 'pattern', message: 'Please enter mobile number' }
    ],
    'ClientEMAILID': [
      { type: 'pattern', message: 'Please enter email id' }
    ],
    'MainContact': [
      { type: 'pattern', message: 'Please enter main contact' }
    ],
    'AltContact': [
      { type: 'pattern', message: 'Please enter alternate contact' }
    ],
    'ClientCategory': [
      { type: 'pattern', message: 'Please enter client category' }
    ],
    'ClientType': [
      { type: 'pattern', message: 'Please enter client type' }
    ]
  }
}
