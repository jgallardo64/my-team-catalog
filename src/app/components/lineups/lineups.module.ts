import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyLineupsComponent } from './my-lineups/my-lineups.component';
import { CreateLineupComponent } from './create-lineup/create-lineup.component';
import { PlayerService } from 'src/app/shared/services/player.service';
import { LineupsRoutingModule } from './lineups-routing.module';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ClientService } from 'src/app/shared/services/client.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatButtonModule, MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';
import { LineupService } from 'src/app/shared/services/lineups.service';

@NgModule({
  declarations: [MyLineupsComponent, CreateLineupComponent],
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
