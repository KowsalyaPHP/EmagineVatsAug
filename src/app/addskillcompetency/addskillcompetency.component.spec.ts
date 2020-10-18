import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddskillcompetencyComponent } from './addskillcompetency.component';

describe('AddskillcompetencyComponent', () => {
  let component: AddskillcompetencyComponent;
  let fixture: ComponentFixture<AddskillcompetencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddskillcompetencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddskillcompetencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
