import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import {Router} from "@angular/router"
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NzNotificationService]
})
export class HomeComponent implements OnInit {

  consent_page: boolean = true;
  checkbox_checked: boolean = false;
  button1:boolean =false;
  button2:boolean =false;
  constructor(private notification: NzNotificationService,
              private router: Router) { }

  instructions(){
    this.consent_page = false;
  }

  button11(){
    console.log("in 1")
    this.button1=true
    this.button2=false

  }

  button12(){
    console.log("in 2")
    this.button2=true
    this.button1=false

  }
  confirm() {
    // this.router.navigateByUrl('/survey',{ skipLocationChange: true })
    this.router.navigateByUrl('/prolific',{ skipLocationChange: true })
    
  }
  ngOnInit(){
    this.router.navigateByUrl('', { skipLocationChange: true });
  }
}
