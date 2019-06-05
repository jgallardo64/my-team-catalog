import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayersComponent } from './components/players/players.component';
import { CollectionsComponent } from './components/collections/collections.component';
import { LineupsComponent } from './components/lineups/lineups.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import {
  MatToolbarModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatInputModule,
  MatButtonModule,
  MatExpansionModule,
  MatTableModule,
  MatIconModule,
  MatDialogModule,
  MatListModule,
  MatPaginatorModule
} from '@angular/material';
import { AdminComponent } from './components/admin/admin.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PlayerService } from './shared/services/player.service';
import { BadgeService } from './shared/services/badge.service';
import { TeamService } from './shared/services/team.service';
import { CollectionService } from './shared/services/collection.service';
import { SubcollectionService } from './shared/services/subcollection.service';
import { SharedModule } from './shared/shared.module';
import { ClientService } from './shared/services/client.service';
import { AuthService } from './shared/services/auth.service';
import { AuthGuard } from './shared/guards/auth.guard';
import { LineupService } from './shared/services/lineups.service';

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    CollectionsComponent,
    LineupsComponent,
    HomeComponent,
    HeaderComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    NgSelectModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatPaginatorModule,
    NgSelectModule,
    MatCheckboxModule,
    MatListModule,
    NgbModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    FormsModule,
    MatToolbarModule,
    HttpClientModule,
    SharedModule,
    ToastrModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    PlayerService,
    LineupService,
    BadgeService,
    TeamService,
    CollectionService,
    ClientService,
    AuthService,
    SubcollectionService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
