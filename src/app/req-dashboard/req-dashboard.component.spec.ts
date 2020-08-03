import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqDashboardComponent } from './req-dashboard.component';

describe('ReqDashboardComponent', () => {
  let component: ReqDashboardComponent;
  let fixture: ComponentFixture<ReqDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReqDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
