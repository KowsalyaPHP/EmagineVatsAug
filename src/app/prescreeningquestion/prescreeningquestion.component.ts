import { Component, OnInit } from '@angular/core';
import { PrescreeningquestionService } from './prescreeningquestion.service';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { PreScreeningQuestionGrid } from '../grid.model';
declare var $: any

@Component({
  selector: 'app-prescreeningquestion',
  templateUrl: './prescreeningquestion.component.html',
  styleUrls: ['./prescreeningquestion.component.css']
})
export class PrescreeningquestionComponent implements OnInit {
  
  
  public quesArray: Array<PreScreeningQuestionGrid> = [];   
  quesValue: any = {}; 
  QuestionDetails:[];
  prequestionForm: FormGroup;
  OptionCount:any;
  
  constructor(private PrescreeningquestionServices: PrescreeningquestionService,private formBuilderObj: FormBuilder) { 
    
    this.prequestionForm = this.formBuilderObj.group({
      Questions: '',
      QuestionType:'',
      Options:''
    }); 

    this.getQuestionDetails();
  }

  ngOnInit() {    
    $(document).ready(function(){
     $( "table" ).delegate( ".up", "click", function() {       
       var row = $(this).parents("tr:first");
          if ($(this).is(".up")) {
              row.insertBefore(row.prev());
          } 
      })
    });
  }

  addQuestion(formValue) {    

    if (this.prequestionForm.invalid) {
      return;
    }

    this.quesValue = {question_type: formValue['QuestionType'], question: formValue['Questions'],answer_option:formValue['Options']}  
    this.quesArray.push(this.quesValue);  
   // this.passEmp = JSON.stringify(this.quesArray);
     
    //this.toastr.success('New row added successfully', 'New Row');  
    
    return true;  
  }
  
  deleteQuestionbyRow(index) {    
    this.QuestionDetails.splice(index, 1);  
    //this.toastr.warning('Row deleted successfully', 'Delete row');  
    return true;    
  }

  questionType(type){
    
    if(type == 'radio' || type == 'checkbox')
    {
      if(this.prequestionForm.get('Options').value == '')
      { 
        const variable = this.prequestionForm.get('Options');
        this.prequestionForm.get('Options').setValidators([Validators.required]);      
        variable.updateValueAndValidity();
      }

      $("#displayOption").show();      
     // $("#displayOption").prop('readonly', false);
         
    }
    else{
      $("#displayOption").hide();
      //$("#displayOption").prop('readonly', true);
    }    
  }

  onOptionCount(event: any){

    this.OptionCount = event.target.value;

    /*var billctc = $("#BillableCTC").val();

    if(billctc == ''){
      this.notEmpty = true;
    }    

    let percentage = 0;
    if( event.target.value != '' ){
      percentage += ((Number($("#BillableCTC").val())*Number($("#variable").val()))/100);          
    }
    this.offerForm.patchValue({AgencyFees: percentage});*/

  }
  
  getQuestionDetails() {
    this.PrescreeningquestionServices.getQuestionDetails(1).subscribe(
      response => {
        if (response != '') {         
          this.QuestionDetails = response['Data'];
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }   
  validation_messages = {
    'Questions': [
      { type: 'required', message: 'Please enter question' }      
    ],
    'QuestionType': [
      { type: 'required', message: 'Please select question type' }
    ],
    'Options': [
      { type: 'required', message: 'Please enter options' }
    ]
  }
}
