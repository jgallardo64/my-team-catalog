import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LineupsListComponent } from './lineups-list/lineups-list.component';
import { LineupDetailComponent } from './lineup-detail/lineup-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    component: LineupsListComponent
  },
  {
    path: 'list',
    component: LineupsListComponent
  },
  {
    path: 'create',
    component: LineupDetailComponent
},
{
    path: 'view/:id',
    component: LineupDetailComponent
},
{
    path: 'edit/:id',
    component: LineupDetailComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LineupsRoutingModule { }
