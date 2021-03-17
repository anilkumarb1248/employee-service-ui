import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgePipe } from './age.pipe';
import { FullnamePipe } from './fullname.pipe';



@NgModule({
  declarations: [
    AgePipe,
    FullnamePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AgePipe,
    FullnamePipe
  ]
})
export class PipesModule { }
