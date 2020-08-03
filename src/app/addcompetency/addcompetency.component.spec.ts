import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcompetencyComponent } from './addcompetency.component';

describe('AddcompetencyComponent', () => {
  let component: AddcompetencyComponent;
  let fixture: ComponentFixture<AddcompetencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcompetencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcompetencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
