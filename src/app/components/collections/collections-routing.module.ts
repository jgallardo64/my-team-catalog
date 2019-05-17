import { Routes, RouterModule } from '@angular/router';
import { CollectionDetailComponent } from './collection-detail/collection-detail.component';
import { NgModule } from '@angular/core';
import { CollectionsListComponent } from './collections-list/collections-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    component: CollectionsListComponent
  },
  {
    path: 'list',
    component: CollectionsListComponent
  },
  {
    path: 'detail/:id',
    component: CollectionDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionsRoutingModule { }
