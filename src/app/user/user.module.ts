import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule, userRoutingComponents } from './user-routing.module';
// import { AddComponent } from './add/add.component';
// import { ViewComponent } from './view/view.component';
// import { EditComponent } from './edit/edit.component';
// import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    userRoutingComponents
    // AddComponent,
    // ViewComponent,
    // EditComponent,
    // ListComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class UserModule { }
