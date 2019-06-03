import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'players',
    loadChildren: './components/players/players.module#PlayersModule'
  },
  {
    path: 'collections',
    loadChildren:
      './components/collections/collections.module#CollectionsModule'
  },
  {
    path: 'lineups',
    loadChildren: './components/lineups/lineups.module#LineupsModule'
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
