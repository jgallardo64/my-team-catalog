import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubcollectionService } from 'src/app/shared/services/subcollection.service';
import { ROUTER_DEFINITIONS } from 'src/app/shared/constants/router-definitions';
import { PlayerService } from 'src/app/shared/services/player.service';

@Component({
  selector: 'app-collection-detail',
  templateUrl: './collection-detail.component.html',
  styleUrls: ['./collection-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CollectionDetailComponent implements OnInit {
  collectionId;
  collection;
  reward;
  collectionPlayers = [];
  routerDefinitions = ROUTER_DEFINITIONS;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private subcollectionService: SubcollectionService,
    private playerService: PlayerService
  ) {
    this.collectionId = this.activatedRoute.snapshot.params['id'];
   }

  ngOnInit() {
    this.getCollection();
    this.getPlayersFromCollection();
  }


  getCollection() {
    this.subcollectionService
    .getById(this.collectionId)
    .subscribe((response) => {
      this.collection = response;
      if (response.reward) {
        this.getRewardFromCollection();
      }
    });
  }

  getPlayersFromCollection() {
    this.subcollectionService
    .getPlayersFromCollection(this.collectionId)
    .subscribe((response) => {
      this.collectionPlayers = response;
    });
  }

  getRewardFromCollection() {
    this.playerService
    .getById(this.collection.reward)
    .subscribe((response) => {
      console.log(response);
      this.reward = response;
    });
  }

  playerDetails(player) {
    this.router.navigate([this.routerDefinitions.players + '/detail/' + player]);
  }

}
