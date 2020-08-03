import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnpublishComponent } from './unpublish.component';

describe('UnpublishComponent', () => {
  let component: UnpublishComponent;
  let fixture: ComponentFixture<UnpublishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnpublishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnpublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
