import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostBindingListnerComponent } from './host-binding-listner.component';

describe('HostBindingListnerComponent', () => {
  let component: HostBindingListnerComponent;
  let fixture: ComponentFixture<HostBindingListnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostBindingListnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostBindingListnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
