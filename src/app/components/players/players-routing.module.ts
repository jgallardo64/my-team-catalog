import { Routes, RouterModule } from '@angular/router';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { PlayersCompareComponent } from './players-compare/players-compare.component';
import { NgModule } from '@angular/core';
import { PlayersListComponent } from './players-list/players-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    component: PlayersListComponent
  },
  {
    path: 'list',
    component: PlayersListComponent
  },
  {
    path: 'detail/:id',
    component: PlayerDetailComponent
  },
  {
    path: 'compare',
    component: PlayersCompareComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersRoutingModule { }
