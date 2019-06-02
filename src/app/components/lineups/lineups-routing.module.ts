import { Routes, RouterModule } from '@angular/router';
import { MyLineupsComponent } from './my-lineups/my-lineups.component';
import { CreateLineupComponent } from './create-lineup/create-lineup.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'my-lineups',
    component: MyLineupsComponent
  },
  {
    path: 'my-lineups',
    component: MyLineupsComponent
  },
  {
    path: 'create-lineup',
    component: CreateLineupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LineupsRoutingModule { }
