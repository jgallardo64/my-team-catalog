import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { PlayerService } from "src/app/shared/services/player.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ROUTER_DEFINITIONS } from "src/app/shared/constants/router-definitions";

@Component({
  selector: "app-player-detail",
  templateUrl: "./player-detail.component.html",
  styleUrls: ["./player-detail.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class PlayerDetailComponent implements OnInit {
  playerId;
  player;

  routerDefinitions = ROUTER_DEFINITIONS;

  constructor(
    private playerService: PlayerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.playerId = this.activatedRoute.snapshot.params["id"];
  }

  ngOnInit() {
    this.getPlayer();
  }

  getPlayer() {
    this.playerService.getById(this.playerId).subscribe(response => {
      this.player = response;
    });
  }
}
