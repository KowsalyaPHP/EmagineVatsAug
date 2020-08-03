import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvuploadComponent } from './cvupload.component';

describe('CvuploadComponent', () => {
  let component: CvuploadComponent;
  let fixture: ComponentFixture<CvuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
