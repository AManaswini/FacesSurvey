import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import {SurveyService} from './survey.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
  providers: [NzNotificationService]
})
export class SurveyComponent implements OnInit {
  minitraining_page: boolean = true;
  images_count: number = null;
  validateForm!: FormGroup;
  comments: string[] = [];
  isVisible = false;
  UserID:string;
  swap_images_flag: boolean = false;
  minitraining(){
    this.minitraining_page = false;
  }
  confirm(){
    this.minitraining_page = false;
    // this.notification.create('success','Survey Started!','',{ nzDuration: 2000 });
  }
  submitForm(): void {
    this.isVisible = false;
    this.comments.push(this.validateForm.value['comment']);
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.validateForm.reset();
  }
  handleCancel(): void {
    this.isVisible = false;
  }
  constructor(private surveyService: SurveyService,
              private notification: NzNotificationService,
              private modalService: NzModalService,
              private sanitizer: DomSanitizer,
              private router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute){ }

  selectedImg: any = null;
  borders: any = {'a':'none','b':'none'};
  answers: any[] = [];
  user_img_pattern: any[] = null;
  img_list: any[] = null;
  img_fetched: boolean = false;
  images_a: any[] = [];
  images_b: any[] = [];
  img_index: number = 0;
  score: number = 0;
  images_set: number = 0;
  img_clicked_flag: boolean = true;
  imgclick(event) {
    if (this.img_clicked_flag){
      this.img_clicked_flag = false;
      this.selectedImg = event.target.id;   
      var ans_json = this.img_list[this.img_index];
      console.log('hi im in 1')
      console.log(ans_json)
      if (this.selectedImg == 'a'){
        ans_json[0]['choosen'] = 'left'
      }
      else if(this.selectedImg == 'b'){
        ans_json[0]['choosen'] = 'right'
      }
      
      this.answers.push(ans_json[0]);
      if (this.images_a[this.img_index] == 'url'){
        if(this.selectedImg == this.img_list[this.img_index][0].res){
          // this.notification.create('success','Correct Choice','',{ nzDuration: 3000 });
          const modal = this.modalService.success({
            nzTitle: 'Correct Choice',
            nzContent: ''
          });
      
          setTimeout(() => modal.destroy(), 2000);
          this.score += 1;
          if(this.selectedImg == 'a'){
            this.borders['a'] = '15px solid green';
            this.borders['b'] = 'none';
          }
          else{
            this.borders['b'] = '15px solid green';
            this.borders['a'] = 'none';
          }
        }
        else{
          // this.notification.create('error','Wrong Choice!','',{ nzDuration: 3000 });
          const modal = this.modalService.error({
            nzTitle: 'Wrong Choice',
            nzContent: ''
          });
      
          setTimeout(() => modal.destroy(), 2000);
          if(this.selectedImg == 'a'){
            this.borders['a'] = '15px solid red';
            this.borders['b'] = '15px solid green';
          }
          else{
            this.borders['b'] = '15px solid red';
            this.borders['a'] = '15px solid green';
          }
        }
      }
      else{
        const modal = this.modalService.info({
          nzTitle: 'No feedback given for this image',
          nzContent: ''
        });
    
        setTimeout(() => modal.destroy(), 2000);
        if(this.selectedImg == 'a'){
          this.borders['a'] = '15px solid blue';
          this.borders['b'] = 'none';
        }
        else{
          this.borders['b'] = '15px solid blue';
          this.borders['a'] = 'none';
        }
        if(this.selectedImg == this.img_list[this.img_index][0].res){
          this.score += 1;
        }
      }
      setTimeout(() => 
      {
        this.borders = {'a':'none','b':'none'};
        //if ((this.img_index+1) %4 == 0){
        //  this.isVisible = true;                        //Uncomment if we need text input from users
        //}
        this.img_index ++;
        this.swap_images_flag = Math.random() >= 0.5;
        if (this.img_index == this.images_count){
          this.submit();
        }
        this.img_clicked_flag = true;
      },
      2400);
    }
  }
  generate_code() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }
  exit() {
    this.notification.create('error','You have exited the survey.','',{ nzDuration: 2000 });
    this.router.navigate(['/home']);
  }
  submit() {
    if (this.answers.length == 0) {
      this.exit();
    }
    else{
      console.log('im in here')
      var code = this.generate_code()
      var final_res = {'prolificID':this.UserID,'release':1,'choices':this.answers};
      console.log('final_res')
      console.log(final_res)
      this.surveyService.postResults(final_res).subscribe({
        next: data =>{}
      }); 
      this.router.navigate(['/survey-evaluation',this.UserID],{queryParams:final_res, skipLocationChange: true });
    }
  }
  fetchImg(data) {
    const mediaType = 'application/image';
    const blob = new Blob([data], { type: mediaType });
    const unsafeImg = URL.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustUrl(unsafeImg)
  }
  async fetchAll(img_list) {
    let response_a = [];
    let response_b = [];
    var i: number = 0;
    for (i=0;i<img_list.length;i++){
      // console.log(typeof (JSON.parse(img_list[i][0].desc_b)))
      //console.log(JSON.parse("prior_recors":"True"))
      if (!Number.isInteger(img_list[i][0].img_a)){
        var data = await this.surveyService.getImg(img_list[i][0].img_a);
        response_a[i] = this.fetchImg(data);
      }
      else{
        response_a[i] = 'url';
      }
    }
    for (i=0;i<img_list.length;i++){
      if (!Number.isInteger(img_list[i][0].img_b)){
        var data = await this.surveyService.getImg(img_list[i][0].img_b);
        response_b[i] = this.fetchImg(data);
      }
      else{
        response_b[i] = 'url';
      }
    }
    this.images_a = response_a;
    this.images_b = response_b;
    this.img_fetched = true;
  // Got all the results!
 }
  loadData() {
    this.fetchAll(this.user_img_pattern);
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.UserID = params['UserID']);
    this.surveyService.getUserPatterns().subscribe({
      next: data => {
        this.user_img_pattern = data['pattern'];
        this.img_list = this.user_img_pattern;
        this.images_count = this.user_img_pattern.length;
        this.loadData();
      }
    })
    this.validateForm = this.fb.group({
      comment: [null, [Validators.required]]
    });
  }
}
