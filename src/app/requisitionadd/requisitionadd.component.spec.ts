import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionaddComponent } from './requisitionadd.component';

describe('RequisitionaddComponent', () => {
  let component: RequisitionaddComponent;
  let fixture: ComponentFixture<RequisitionaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitionaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
