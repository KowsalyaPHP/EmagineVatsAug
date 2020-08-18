import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorregComponent } from './vendorreg.component';

describe('VendorregComponent', () => {
  let component: VendorregComponent;
  let fixture: ComponentFixture<VendorregComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorregComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
