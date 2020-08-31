import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientchildComponent } from './clientchild.component';

describe('ClientchildComponent', () => {
  let component: ClientchildComponent;
  let fixture: ComponentFixture<ClientchildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientchildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientchildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
