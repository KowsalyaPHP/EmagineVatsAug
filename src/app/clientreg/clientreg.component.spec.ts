import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientregComponent } from './clientreg.component';

describe('ClientregComponent', () => {
  let component: ClientregComponent;
  let fixture: ComponentFixture<ClientregComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientregComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
