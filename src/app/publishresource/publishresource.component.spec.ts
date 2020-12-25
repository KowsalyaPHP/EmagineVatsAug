import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishresourceComponent } from './publishresource.component';

describe('PublishresourceComponent', () => {
  let component: PublishresourceComponent;
  let fixture: ComponentFixture<PublishresourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishresourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishresourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
