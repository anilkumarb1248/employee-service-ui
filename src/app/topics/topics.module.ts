import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicsRoutingModule, topicsComponents } from './topics-routing.module';
import { ParentComponent } from './components-interaction/with-relationship/parent/parent.component';
import { ChildComponent } from './components-interaction/with-relationship/child/child.component';
import { TeacherComponent } from './components-interaction/without-relationship/teacher/teacher.component';
import { StudentComponent } from './components-interaction/without-relationship/student/student.component';
import { FormsModule } from '@angular/forms';
import { ViewchildDemoChildComponent } from './ViewChild/viewchild-demo-child/viewchild-demo-child.component';
import { HostBindingListnerComponent } from './host-binding-listner/host-binding-listner.component';
import { HighlightDirective } from './host-binding-listner/highlight.directive';


@NgModule({
  declarations: [
    topicsComponents,
    ParentComponent, 
    ChildComponent, 
    TeacherComponent, 
    StudentComponent,
    ViewchildDemoChildComponent,
    HostBindingListnerComponent,
    HighlightDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    TopicsRoutingModule
  ]
})
export class TopicsModule { }
