import { Component, inject, Inject, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import {SurveyEvaluationService} from './survey-evaluation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { NzCountdownComponent } from 'ng-zorro-antd/statistic';
import { interval } from 'rxjs';

@Component({
  selector: 'app-survey-evaluation',
  templateUrl: './survey-evaluation.component.html',
  styleUrls: ['./survey-evaluation.component.css'],
  providers: [NzNotificationService]
})

export class SurveyEvaluationComponent  implements OnInit {
  isdisabled=true
    minitraining_page: boolean = true;
    images_count: number = null;
    validateForm!: FormGroup;
    comments: string[] = [];
    isVisible = false;
    UserID:string;
    training:any;
    totalmin:number = 5
    totaltime = this.totalmin * 60 
   @ViewChild('timer') timer;
    swap_images_flag: boolean = false;
    minitraining(){
      this.minitraining_page = false;
    }
    confirm(){
      this.minitraining_page = false;
      this.notification.create('success','Survey Started!','',{ nzDuration: 2000 });
      const obs = interval(1000).subscribe((d) =>{
        console.log(d)
        console.log('hi')
        if (this.totaltime >= 0){
          this.countdown()
        }
        else if (this.totaltime < 0){
          obs.unsubscribe()
          this.submit()
        }
      })
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
    constructor(private surveyService: SurveyEvaluationService,
                private notification: NzNotificationService,
                private modalService: NzModalService,
                private sanitizer: DomSanitizer,
                private router: Router,
                private fb: FormBuilder,
                private route: ActivatedRoute) { 
                  console.log('in constructor')
                }
  
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
        //ans_json['choosen'] = this.selectedImg;
        if (this.selectedImg == 'a'){
          ans_json[0]['choosen'] = 'left'
        }
        else if(this.selectedImg == 'b'){
          ans_json[0]['choosen'] = 'right'
        }
        this.answers.push(ans_json[0]);
        if(this.selectedImg == 'a'){
            this.borders['a'] = '15px solid black';
            this.borders['b'] = 'none';
          }
          else{
            this.borders['b'] = '15px solid black';
            this.borders['a'] = 'none';
          }
        if (this.images_a[this.img_index] == 'url'){
          if(this.selectedImg == this.img_list[this.img_index][0].res){
            // this.notification.create('success','Correct Choice','',{ nzDuration: 3000 });
            // const modal = this.modalService.success({
            //   nzTitle: 'Correct Choice',
            //   nzContent: ''
            // });
        
            // setTimeout(() => modal.destroy(), 2000);
            this.score += 1;
            // if(this.selectedImg == 'a'){
            //   this.borders['a'] = '15px solid green';
            //   this.borders['b'] = 'none';
            // }
            // else{
            //   this.borders['b'] = '15px solid green';
            //   this.borders['a'] = 'none';
            // }
          }
          else{
            // this.notification.create('error','Wrong Choice!','',{ nzDuration: 3000 });
            // const modal = this.modalService.error({
            //   nzTitle: 'Wrong Choice',
            //   nzContent: ''
            // });
        
            // setTimeout(() => modal.destroy(), 2000);
            // if(this.selectedImg == 'a'){
            //   this.borders['a'] = '15px solid red';
            //   this.borders['b'] = '15px solid green';
            // }
            // else{
            //   this.borders['b'] = '15px solid red';
            //   this.borders['a'] = '15px solid green';
            // }
          }
        }
        else{
          const modal = this.modalService.info({
            nzTitle: 'No feedback given for this image',
            nzContent: ''
          });
      
          setTimeout(() => modal.destroy(), 1000);
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
        1000);
      }
    }
    countdown(){
      const elem = document.getElementById('timer') 
      const minutes = Math.floor(this.totaltime / 60) ;
      let seconds = (this.totaltime % 60).toString();
      seconds = Number(seconds) < 10 ? '0'+ seconds.toString() : seconds;
      if (elem != null){
      elem.innerHTML = `${minutes}:${seconds}`;
      this.totaltime -- ;
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
      console.log('in submit')
      if (this.answers.length == 0) {
        this.exit();
      }
      else{
        var code = this.generate_code()
        var final_res = {'prolificID':this.UserID,'release':1,'choices':this.answers,'code':code};
        console.log(final_res)
        this.surveyService.postResults(final_res).subscribe({
          next: data =>{}
        });  
        // this.isdisabled=false
        // this.download(code)
        this.router.navigate(['/thanks',code],{ skipLocationChange: true });
        // this.router.navigate(['/survey-evaluation',code],{ skipLocationChange: true });
        
      }
    }

    // download(code){
    //   this.router.navigate(['/thanks',code],{ skipLocationChange: true });
    // }
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
     console.log('image listt is')
     console.log(img_list)
      for (i=0;i<img_list.length;i++){
        if (Number.isInteger(img_list[i][0].img_a)){
          var data = await this.surveyService.getImgeval(img_list[i][0].img_a);
          response_a[i] = this.fetchImg(data);
        }
        else{
          response_a[i] = 'url';
        }
      }
      for (i=0;i<img_list.length;i++){
        if (Number.isInteger(img_list[i][0].img_b)){
          var data = await this.surveyService.getImgeval(img_list[i][0].img_b);
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
      // this.route.queryParams.subscribe((params: any) =>{
      //   console.log('params')
      //   console.log(params[0])
      //   this.answers.push( params[0]);
      // })
      console.log(this.timer)
      console.log("in beginning")
      console.log(this.totaltime)
      // const obs = interval(1000).subscribe((d) =>{
      //   console.log(d)
      //   console.log('hi')
      //   if (this.totaltime >= 0){
      //     this.countdown()
      //   }
      //   else if (this.totaltime < 0){
      //     obs.unsubscribe()
      //     this.submit()
      //   }
       
      // })
      //setTimeout(() => obs.unsubscribe(), this.totaltimeime)
      this.route.params.subscribe(
        params =>{
          console.log('params')
          console.log(params)
          let training=params
        }
      )
      console.log('training data')
      console.log(this.training)
      this.route.params.subscribe((params: Params) => this.UserID = params['UserID']);
      this.surveyService.getUserPatternseval().subscribe({
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
  