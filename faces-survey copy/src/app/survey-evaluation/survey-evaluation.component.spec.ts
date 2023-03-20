import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyEvaluationComponent } from './survey-evaluation.component';

describe('SurveyEvaluationComponent', () => {
  let component: SurveyEvaluationComponent;
  let fixture: ComponentFixture<SurveyEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
