import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ProlificComponent } from './prolific/prolific.component';
import { SurveyEvaluationComponent } from './survey-evaluation/survey-evaluation.component';
import { SurveyComponent} from './survey/survey.component';
import { ThanksComponent } from './thanks/thanks.component';

const routes: Routes = [
  { path: 'home', redirectTo: '', pathMatch: 'full'},
  { path: '', component: HomeComponent },
  {path:'prolific',component:ProlificComponent},
  { path: 'survey/:UserID', component: SurveyComponent },
  { path: 'thanks/:code', component: ThanksComponent },
  { path: 'dashboard', component: DashboardComponent},
  {path:'survey-evaluation/:UserID',component:SurveyEvaluationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
