import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescreeningquestionComponent } from './prescreeningquestion.component';

describe('PrescreeningquestionComponent', () => {
  let component: PrescreeningquestionComponent;
  let fixture: ComponentFixture<PrescreeningquestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescreeningquestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescreeningquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
