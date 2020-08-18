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

interface Applicant {
  code: any;
  checked?: boolean;
}

@Component({
  selector: 'app-prescreeningquestion',
  templateUrl: './prescreeningquestion.component.html',
  styleUrls: ['./prescreeningquestion.component.css']
})

export class PrescreeningquestionComponent implements OnInit {
  
  public competencies: Applicant[];
  public quesArray: Array<PreScreeningQuestionGrid> = [];   
  quesValue: any = {}; 
  QuestionDetails:[];
  prequestionForm: FormGroup;
  OptionCount:any;
  count = false;
  questionsType:any;
  passQuestionData:any;
  id:any;
  rowCount = 0;
  rowNumber : string[] = [];

  constructor(private PrescreeningquestionServices: PrescreeningquestionService,private formBuilderObj: FormBuilder,private routerObj: Router,private route: ActivatedRoute) { 
    
    this.prequestionForm = this.formBuilderObj.group({
      Question: '',
      QnType:'',
      Content:''
    }); 

    this.getQuestionDetails();
  }

  ngOnInit() {    
 
  }

    
  deleteQuestionbyRow(index,rowNum) {      
    this.rowNumber.push(rowNum);   
    this.quesArray.splice(index, 1);  
    return true;    
  }

  moveUp(quesArrays, index) {   
    if (index > 0) {
      const tmp = this.quesArray[index - 1];
      this.quesArray[index - 1] = this.quesArray[index];
      this.quesArray[index] = tmp;
    }
  }

  addQuestion(formValue) {    

    if (this.prequestionForm.invalid) {
      return;
    }
    
    if(this.prequestionForm.get('Question').value == null)
    { 
      const variable = this.prequestionForm.get('Question');    
      this.prequestionForm.get('Question').setValidators([Validators.required]);      
      variable.updateValueAndValidity();
    }    
    if(this.prequestionForm.get('QnType').value == null){
      const variable = this.prequestionForm.get('QnType');    
      this.prequestionForm.get('QnType').setValidators([Validators.required]);      
      variable.updateValueAndValidity();
    }
    if(this.questionsType != "text"){
      if(this.prequestionForm.get('Content').value == null){        
        const variable = this.prequestionForm.get('Content');    
        this.prequestionForm.get('Content').setValidators([Validators.required]);      
        variable.updateValueAndValidity();
      }
    }
    
    if(this.prequestionForm.get('QnType').value != null && (this.prequestionForm.get('Content').value != null || this.prequestionForm.get('Content').value != '') &&  this.prequestionForm.get('Question').value != null)
    {    
      //this.quesArray.length+1      
      this.rowCount = this.rowCount+1;
      this.quesValue = {Question: formValue['Question'],QuesId:this.rowCount,QnOrder:2,QnType: formValue['QnType'],Content:formValue['Content'],Applicant:false,mandatory:false,Interviewer:false}  
      this.quesArray.push(this.quesValue);  
      this.prequestionForm.reset();
      this.prequestionForm.controls.Question.setErrors(null);
      this.prequestionForm.controls.QnType.setErrors(null);
      this.prequestionForm.controls.Content.setErrors(null);
      $("#displayOption").hide();
    }
    
    return true;  
  }


  questionType(type){

    this.questionsType = type;

    if(type == 'radio' || type == 'checkbox')
    {
      if(this.prequestionForm.get('Content').value == '' || this.prequestionForm.get('Content').value == null)
      { 
        const variable = this.prequestionForm.get('Content');
        this.prequestionForm.get('Content').setValidators([Validators.required]);      
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
 
    let count = Number(event.target.value);
    this.OptionCount =  Array(count).fill(0).map((x,i)=>i);
  
  }

  addQuestionDetails() {

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.passQuestionData = JSON.stringify(this.quesArray);
  
    this.PrescreeningquestionServices.addQuestionDetails(this.id,this.passQuestionData,this.rowNumber).subscribe(
      response => {
        if (response != '') {         
          //this.QuestionDetails = response['Data'];
        }
        else {         
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
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
    'Question': [
      { type: 'required', message: 'Please enter question' }      
    ],
    'QnType': [
      { type: 'required', message: 'Please select question type' }
    ],
    'Content': [
      { type: 'required', message: 'Please enter content' }
    ]
  }
}
