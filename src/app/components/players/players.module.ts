import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PlayersRoutingModule } from "./players-routing.module";
import { PlayersListComponent } from "./players-list/players-list.component";
import { PlayerDetailComponent } from "./player-detail/player-detail.component";
import { PlayersCompareComponent } from "./players-compare/players-compare.component";
import { MatTableModule } from "@angular/material/table";
import {
  MatPaginatorModule,
  MatSortModule,
  MatInputModule
} from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { PlayerService } from "src/app/shared/services/player.service";

@NgModule({
  declarations: [
    PlayersListComponent,
    PlayerDetailComponent,
    PlayersCompareComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    ReactiveFormsModule,
    PlayersRoutingModule
  ],
  providers: [PlayerService]
})
export class PlayersModule {}
