import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService } from 'src/app/shared/services/player.service';
import { LineupsRoutingModule } from './lineups-routing.module';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ClientService } from 'src/app/shared/services/client.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatButtonModule, MatPaginatorModule, MatSortModule, MatTableModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { LineupService } from 'src/app/shared/services/lineups.service';
import { LineupsListComponent } from './lineups-list/lineups-list.component';
import { LineupDetailComponent } from './lineup-detail/lineup-detail.component';
import { MyLineupsComponent } from './my-lineups/my-lineups.component';

@NgModule({
  declarations: [
    LineupsListComponent,
    LineupDetailComponent,
    MyLineupsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatFormFieldModule,
    MatInputModule,
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
