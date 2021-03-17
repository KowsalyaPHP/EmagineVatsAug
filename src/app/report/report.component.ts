import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  showreportDashboard:boolean=true;
  showreport1Dashboard:boolean=false;
  showreport2Dashboard:boolean=false;

  /*reportServer: string = 'http://vats/ReportServer';
  reportUrl: string = 'Report Project1/Dashboard';
  showParameters: string = "true"; 
  parameters: any = {
  "SampleStringParameter": null,
  "SampleBooleanParameter" : false,
  "SampleDateTimeParameter" : "11/1/2020",
  "SampleIntParameter" : 1,
  "SampleFloatParameter" : "123.1234",
  "SampleMultipleStringParameter": ["Parameter1", "Parameter2"]
  };
  language: string = "en-us";
  width: number = 100;
  height: number = 100;
  toolbar: string = "true";*/

  constructor() {
   
   }

  ngOnInit() {
  }

  showDashboard(num){
    if(num == 1){
      this.showreportDashboard=true;
      this.showreport1Dashboard=false;
      this.showreport2Dashboard=false;
      $('#showreport1Dashboard').removeClass('selected');
      $('#showreport2Dashboard').removeClass('selected');
      $('#showreportDashboard').addClass('selected');
    }
    if(num == 2){
      this.showreport1Dashboard=true;
      this.showreportDashboard=false;
      this.showreport2Dashboard=false;
      $('#showreportDashboard').removeClass('selected');
      $('#showreport2Dashboard').removeClass('selected');
      $('#showreport1Dashboard').addClass('selected');
    }
    if(num == 3){
      this.showreport2Dashboard=true;
      this.showreport1Dashboard=false;
      this.showreportDashboard=false;
      $('#showreport1Dashboard').removeClass('selected');
      $('#showreportDashboard').removeClass('selected');
      $('#showreport2Dashboard').addClass('selected');
    }
    
  }

}
