import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewchildDemoChildComponent } from './viewchild-demo-child.component';

describe('ViewchildDemoChildComponent', () => {
  let component: ViewchildDemoChildComponent;
  let fixture: ComponentFixture<ViewchildDemoChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewchildDemoChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewchildDemoChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
