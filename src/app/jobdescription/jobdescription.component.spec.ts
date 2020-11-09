import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobdescriptionComponent } from './jobdescription.component';

describe('JobdescriptionComponent', () => {
  let component: JobdescriptionComponent;
  let fixture: ComponentFixture<JobdescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobdescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobdescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
