import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutreleaseComponent } from './aboutrelease.component';

describe('AboutreleaseComponent', () => {
  let component: AboutreleaseComponent;
  let fixture: ComponentFixture<AboutreleaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutreleaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutreleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
