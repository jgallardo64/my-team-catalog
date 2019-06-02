import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService } from 'src/app/shared/services/player.service';
import { LineupsRoutingModule } from './lineups-routing.module';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ClientService } from 'src/app/shared/services/client.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatButtonModule, MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';
import { LineupService } from 'src/app/shared/services/lineups.service';
import { LineupsListComponent } from './lineups-list/lineups-list.component';
import { LineupDetailComponent } from './lineup-detail/lineup-detail.component';

@NgModule({
  declarations: [
    LineupsListComponent,
    LineupDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    LineupsRoutingModule
  ],
  providers: [
    PlayerService,
    AuthService,
    ClientService,
    LineupService
  ]
})
export class LineupsModule {}
