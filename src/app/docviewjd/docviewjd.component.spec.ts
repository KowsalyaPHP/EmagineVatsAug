import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocviewjdComponent } from './docviewjd.component';

describe('DocviewjdComponent', () => {
  let component: DocviewjdComponent;
  let fixture: ComponentFixture<DocviewjdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocviewjdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocviewjdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
