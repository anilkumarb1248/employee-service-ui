import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { EmployeeRoutingModule } from './employee-routing.module';

import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { ListComponent } from './list/list.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    AddComponent,
    EditComponent,
    ViewComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeeRoutingModule,
    PipesModule
  ]
})
export class EmployeeModule { }
