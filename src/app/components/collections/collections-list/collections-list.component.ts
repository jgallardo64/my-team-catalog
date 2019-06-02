import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SubcollectionService } from 'src/app/shared/services/subcollection.service';
import { ROUTER_DEFINITIONS } from 'src/app/shared/constants/router-definitions';

@Component({
  selector: 'app-collections-list',
  templateUrl: './collections-list.component.html',
  styleUrls: ['./collections-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CollectionsListComponent implements OnInit {

  routerDefinitions = ROUTER_DEFINITIONS;

  currentEast = [];
  currentWest = [];

  momentsEast = [];
  momentsWest = [];

  throwbackEast = [];
  throwbackWest = [];

  throwbackEliteEast = [];
  throwbackEliteWest = [];

  heatCheckEast = [];
  heatCheckWest = [];

  freeAgentsEast = [];
  freeAgentsWest = [];

  rewards = [];
  premium = [];

  constructor(
    private subcollectionService: SubcollectionService
  ) {
    this.getCollections();
  }

  ngOnInit() {
  }

  getCollections() {
    this.subcollectionService
      .getAll()
      .subscribe((subcollections: any) => {
        subcollections.forEach(collection => {
          switch (collection.collection.name) {
            case 'Current NBA':
              if (collection.conference === 'eastern') {
                this.currentEast.push(collection);
              } else {
                this.currentWest.push(collection);
              }
              break;
            case 'Moments':
              if (collection.conference === 'eastern') {
                this.momentsEast.push(collection);
              } else {
                this.momentsWest.push(collection);
              }
              break;
            case 'Throwback':
              if (collection.conference === 'eastern') {
                this.throwbackEast.push(collection);
              } else {
                this.throwbackWest.push(collection);
              }
              break;
            case 'Throwback Elite':
              if (collection.conference === 'eastern') {
                this.throwbackEliteEast.push(collection);
              } else {
                this.throwbackEliteWest.push(collection);
              }
              break;
            case 'Free Agents':
              if (collection.conference === 'eastern') {
                this.freeAgentsEast.push(collection);
              } else {
                this.freeAgentsWest.push(collection);
              }
              break;
            case 'Heat Check':
              if (collection.conference === 'eastern') {
                this.heatCheckEast.push(collection);
              } else {
                this.heatCheckWest.push(collection);
              }
              break;
            case 'Rewards':
              this.rewards.push(collection);
              break;
            case 'Premium':
              this.premium.push(collection);
              break;
          }
        });
      });
  }

}
