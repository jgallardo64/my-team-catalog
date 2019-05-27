import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PlayerService } from 'src/app/shared/services/player.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTER_DEFINITIONS } from 'src/app/shared/constants/router-definitions';
import { BadgeService } from 'src/app/shared/services/badge.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlayerDetailComponent implements OnInit {
  playerId;
  player;
  hofBadges;
  goldBadges;
  silverBadges;
  bronzeBadges;

  routerDefinitions = ROUTER_DEFINITIONS;

  constructor(
    private playerService: PlayerService,
    private badgeService: BadgeService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      // do something with the query params
    });
    this.activatedRoute.params.subscribe(routeParams => {
      this.playerId = routeParams.id;
      this.getPlayer();
    });
  }

  getPlayer() {
    this.playerService
      .getById(this.playerId)
      .subscribe(response => {
        this.player = response;
        if (response.badges) {
          this.getListOfBadges(response.badges);
        }
      });
  }

  getListOfBadges(badges) {
    this.hofBadges = [];
    this.goldBadges = [];
    this.silverBadges = [];
    this.bronzeBadges = [];

    badges.forEach(element => {
      this.badgeService
        .getById(element)
        .subscribe((badge: any) => {
          switch (badge.tier) {
            case 'hof':
              this.hofBadges.push(badge);
              break;

            case 'gold':
              this.goldBadges.push(badge);
              break;

            case 'silver':
              this.silverBadges.push(badge);
              break;

            case 'bronze':
              this.bronzeBadges.push(badge);
              break;
          }
        });
    });
  }

  showBadges(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl', centered: true });
  }

}
