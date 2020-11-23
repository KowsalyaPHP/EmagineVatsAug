import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvtransferComponent } from './cvtransfer.component';

describe('CvtransferComponent', () => {
  let component: CvtransferComponent;
  let fixture: ComponentFixture<CvtransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvtransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvtransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
