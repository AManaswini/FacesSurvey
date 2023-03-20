import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.css'],
  providers: [NzNotificationService]
})
export class ThanksComponent implements OnInit {

  code: string;
  l:any
  constructor(private route: ActivatedRoute,
    private notification: NzNotificationService) {}

  ngOnInit(): void {
    // this.route.params.subscribe((params: Params) => this.code = params['code']);
    this.route.params.subscribe((params: Params) => this.code = params['code']);
    console.log(this.code)
  }
  copyText(){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.code;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.notification.create('success','Code Copied!','',{ nzDuration: 2000 });
  }
}
