import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewchildDemoParentComponent } from './viewchild-demo-parent.component';

describe('ViewchildDemoParentComponent', () => {
  let component: ViewchildDemoParentComponent;
  let fixture: ComponentFixture<ViewchildDemoParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewchildDemoParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewchildDemoParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
