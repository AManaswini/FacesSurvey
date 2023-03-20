import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HomeComponent } from './home/home.component';
import { SurveyComponent } from './survey/survey.component';
import { ThanksComponent } from './thanks/thanks.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { ProlificComponent } from './prolific/prolific.component';
import { SurveyEvaluationComponent } from './survey-evaluation/survey-evaluation.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SurveyComponent,
    ThanksComponent,
    DashboardComponent,
    ProlificComponent,
    SurveyEvaluationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzMenuModule,
    NzPageHeaderModule,
    NzCardModule,
    NzGridModule,
    NzButtonModule,
    NzIconModule,
    NzSpinModule,
    NzResultModule,
    NzFormModule,
    NzModalModule,
    NzStatisticModule,
    NzTableModule,
    NzCheckboxModule,
    NzPopconfirmModule,
    NzRadioModule,
    BackButtonDisableModule.forRoot({
      preserveScrollPosition: true
    })
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US },NzMessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
