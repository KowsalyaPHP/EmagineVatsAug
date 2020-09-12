import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleaddComponent } from './ruleadd.component';

describe('RuleaddComponent', () => {
  let component: RuleaddComponent;
  let fixture: ComponentFixture<RuleaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
