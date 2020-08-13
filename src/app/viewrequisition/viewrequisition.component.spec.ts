import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewrequisitionComponent } from './viewrequisition.component';

describe('ViewrequisitionComponent', () => {
  let component: ViewrequisitionComponent;
  let fixture: ComponentFixture<ViewrequisitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewrequisitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewrequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
