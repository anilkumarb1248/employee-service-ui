import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../common/page-not-found/page-not-found.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: "", redirectTo: "list", pathMatch: "full" },
      { path: "list", component: ListComponent },
      { path: "add", component: AddComponent},
      { path: "view/:id", component: ViewComponent },
      { path: "edit/:id", component: EditComponent },
      { path: '**', component:ListComponent}
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
