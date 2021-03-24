import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostComponent } from './host/host.component';
import { ParentComponent } from './with-relationship/parent/parent.component';
import { ChildComponent } from './with-relationship/child/child.component';
import { FormsModule } from '@angular/forms';
import { TeacherComponent } from './without-relationship/teacher/teacher.component';
import { StudentComponent } from './without-relationship/student/student.component';



@NgModule({
  declarations: [HostComponent, ParentComponent, ChildComponent, TeacherComponent, StudentComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class InteractionModule { }
