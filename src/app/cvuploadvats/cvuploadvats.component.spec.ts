import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvuploadvatsComponent } from './cvuploadvats.component';

describe('CvuploadvatsComponent', () => {
  let component: CvuploadvatsComponent;
  let fixture: ComponentFixture<CvuploadvatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvuploadvatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvuploadvatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
