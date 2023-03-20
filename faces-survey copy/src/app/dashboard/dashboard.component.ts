import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  validateForm!: FormGroup;
  password: string = 'james@smulla';
  is_valid_login: boolean = false;
  isVisible = true;
  submitForm(): void {
    if (this.validateForm.value['password'] == this.password) {
      this.isVisible = false;
      this.is_valid_login = true;
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
      this.validateForm.reset();
    }
  }
  constructor(private dashboardService: DashboardService, private fb: FormBuilder) { }
  count: any = null;
  count24: any = null;
  count_hits: any = null;
  latest_date: any = null;
  surveyData: any[] = null;
  updateimg_response: any = null;
  updatecsv_response: any = null;
  isLoadingCSV: boolean = false;
  isLoadingImages: boolean = false;
  img_csv_update() {
    this.isLoadingCSV = true;
    this.dashboardService.updateCSV().subscribe({
      next: data =>{
        this.updatecsv_response = data['text'];
        this.isLoadingCSV = false;
      }
    }); 
  }
  img_update() {
    this.isLoadingImages = true;
    this.dashboardService.updateImages().subscribe({
      next: data =>{
        this.updatecsv_response = data['text'];
        this.isLoadingImages = false;
      }
    }); 
  }
  download() {
    this.dashboardService.downloadSurveysRelease1().subscribe({
      next: data =>{
        let filename: string = 'survey_results.txt'
        let binaryData = [];
        binaryData.push(data.body);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: 'blob' }));
        downloadLink.setAttribute('download', filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
    }); 
  }
  download2() {
    this.dashboardService.downloadSurveysRelease('2').subscribe({
      next: data =>{
        let filename: string = 'survey_results.txt'
        let binaryData = [];
        binaryData.push(data.body);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: 'blob' }));
        downloadLink.setAttribute('download', filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
    }); 
  }
  download3() {
    this.dashboardService.downloadSurveysRelease('3').subscribe({
      next: data =>{
        let filename: string = 'survey_results.txt'
        let binaryData = [];
        binaryData.push(data.body);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: 'blob' }));
        downloadLink.setAttribute('download', filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
    }); 
  }
  ngOnInit(): void {
    this.dashboardService.getSurveyCount().subscribe({
      next: data =>{
        this.count = data['count'];
        this.count24 = data['count24'];
        this.latest_date = data['latest_date'];
        this.count_hits = data['hits'];
      }
    }); 
    this.dashboardService.getSurveyJson().subscribe({
      next: data =>{
        this.surveyData = data;
      }
    }); 
    this.validateForm = this.fb.group({
      password: [null, [Validators.required]]
    });
  }

}
