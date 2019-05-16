import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CollectionsListComponent } from "./collections-list/collections-list.component";
import { CollectionDetailComponent } from "./collection-detail/collection-detail.component";
import { CollectionsRoutingModule } from "./collections-routing.module";

@NgModule({
  declarations: [CollectionsListComponent, CollectionDetailComponent],
  imports: [CommonModule, CollectionsRoutingModule]
})
export class CollectionsModule {}
