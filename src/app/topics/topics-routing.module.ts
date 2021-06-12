import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HostComponent } from './components-interaction/host/host.component';
import { HostBindingListnerComponent } from './host-binding-listner/host-binding-listner.component';
import { TopicsComponent } from './topics.component';
import { ViewchildDemoParentComponent } from './ViewChild/viewchild-demo-parent/viewchild-demo-parent.component';

const routes: Routes = [
  { path: '', redirectTo: 'topicsHome', pathMatch: 'full' },
  { path: 'topicsHome', component: TopicsComponent, children:[
    { path: 'interaction', component:HostComponent, outlet: 'topicsOutlet'},
    { path: 'viewchild-demo', component:ViewchildDemoParentComponent, outlet: 'topicsOutlet'},
    { path: 'host-binding-listner', component:HostBindingListnerComponent, outlet: 'topicsOutlet'}
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicsRoutingModule { }

export const topicsComponents =[
  TopicsComponent,
  HostComponent,
  ViewchildDemoParentComponent,
  HostBindingListnerComponent
];
