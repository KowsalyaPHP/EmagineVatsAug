import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubstageComponent } from './substage.component';

describe('SubstageComponent', () => {
  let component: SubstageComponent;
  let fixture: ComponentFixture<SubstageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubstageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubstageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
