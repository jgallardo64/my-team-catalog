import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersRoutingModule } from './players-routing.module';
import { PlayersListComponent } from './players-list/players-list.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { PlayersCompareComponent } from './players-compare/players-compare.component';
import { MatTableModule } from '@angular/material/table';
import {
  MatPaginatorModule,
  MatSortModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatButtonToggleModule,
  MatButtonModule,
  MatTabsModule,
  MatListModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PlayerService } from 'src/app/shared/services/player.service';
import { BadgeService } from 'src/app/shared/services/badge.service';
import { CollectionService } from 'src/app/shared/services/collection.service';
import { SubcollectionService } from 'src/app/shared/services/subcollection.service';
import { TeamService } from 'src/app/shared/services/team.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

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
    MatSelectModule,
    MatTabsModule,
    MatListModule,
    NgSelectModule,
    MatCheckboxModule,
    NgbModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    FormsModule,
    PlayersRoutingModule
  ],
  providers: [
    PlayerService,
    BadgeService,
    CollectionService,
    SubcollectionService,
    TeamService
  ]
})
export class PlayersModule { }
