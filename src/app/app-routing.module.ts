import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    pathMatch: "full"
  },
  {
    path: "players",
    loadChildren: "./components/players/players.module#PlayersModule"
  },
  {
    path: "collections",
    loadChildren:
      "./components/collections/collections.module#CollectionsModule"
  },
  {
    path: "lineups",
    loadChildren: "./components/lineups/lineups.module#LineupsModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
