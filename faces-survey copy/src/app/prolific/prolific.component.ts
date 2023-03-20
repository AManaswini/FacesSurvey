import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Component({
  selector: 'app-prolific',
  templateUrl: './prolific.component.html',
  styleUrls: ['./prolific.component.css'],
  providers: [NzNotificationService]
})
export class ProlificComponent implements OnInit {
  isdisabled=true
  UserID:string
  constructor( private router: Router,
    private notification: NzNotificationService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
   
  }
  enable(){
    this.isdisabled=false
  }
  survey(){
    this.router.navigate(['/survey',this.UserID],{ skipLocationChange: true })
    
    //this.router.navigate(['/survey-evaluation',this.UserID],{ skipLocationChange: true })
  }
  exit() {
    this.notification.create('error','You have exited the survey.','',{ nzDuration: 2000 });
    this.router.navigate(['/home']);
  }
}
