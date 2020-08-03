import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqcvlogsComponent } from './reqcvlogs.component';

describe('ReqcvlogsComponent', () => {
  let component: ReqcvlogsComponent;
  let fixture: ComponentFixture<ReqcvlogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReqcvlogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqcvlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
