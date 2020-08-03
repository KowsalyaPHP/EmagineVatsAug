import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NothiredComponent } from './nothired.component';

describe('NothiredComponent', () => {
  let component: NothiredComponent;
  let fixture: ComponentFixture<NothiredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NothiredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NothiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
