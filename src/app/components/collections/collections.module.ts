import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionsListComponent } from './collections-list/collections-list.component';
import { CollectionDetailComponent } from './collection-detail/collection-detail.component';
import { CollectionsRoutingModule } from './collections-routing.module';
import { SubcollectionService } from 'src/app/shared/services/subcollection.service';
import { PlayerService } from 'src/app/shared/services/player.service';

@NgModule({
  declarations: [
    CollectionsListComponent,
    CollectionDetailComponent
  ],
  imports: [
    CommonModule,
    CollectionsRoutingModule
  ],
  providers: [SubcollectionService, PlayerService]
})
export class CollectionsModule { }
