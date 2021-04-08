import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgePipe } from './age.pipe';
import { FullnamePipe } from './fullname.pipe';
import { AccessTypesPipe } from './access-types.pipe';

@NgModule({
  declarations: [
    AgePipe,
    FullnamePipe,
    AccessTypesPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AgePipe,
    FullnamePipe,
    AccessTypesPipe
  ]
})
export class PipesModule { }
