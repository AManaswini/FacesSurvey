import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProlificComponent } from './prolific.component';

describe('ProlificComponent', () => {
  let component: ProlificComponent;
  let fixture: ComponentFixture<ProlificComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProlificComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProlificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
