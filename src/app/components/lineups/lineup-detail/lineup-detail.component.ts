import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PlayerService } from 'src/app/shared/services/player.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LineupService } from 'src/app/shared/services/lineups.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ROUTER_DEFINITIONS } from 'src/app/shared/constants/router-definitions';
import * as _ from 'lodash';

@Component({
  selector: 'app-lineup-detail',
  templateUrl: './lineup-detail.component.html',
  styleUrls: ['./lineup-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LineupDetailComponent implements OnInit {
  client;
  action;
  lineup;
  lineupId;
  players;
  positionSelected = null;
  selectForm: FormGroup;
  lineupForm: FormGroup;

  routerDefinitions = ROUTER_DEFINITIONS;

  player1;
  player2;
  player3;
  player4;
  player5;
  player6;
  player7;
  player8;
  player9;
  player10;
  player11;
  player12;
  player13;

  lineupPlayers = [];
  lineupOverall = 0;
  lineupInside = 0;
  lineupOutside = 0;
  lineupPlaymaking = 0;
  lineupAthleticism = 0;
  lineupDefending = 0;
  lineupRebounding = 0;

  totalPlayers = 0;
  bronzePlayers = 0;
  silverPlayers = 0;
  goldPlayers = 0;
  emeraldPlayers = 0;
  sapphirePlayers = 0;
  rubyPlayers = 0;
  heatcheckPlayers = 0;
  amethystPlayers = 0;
  onyxPlayers = 0;
  diamondPlayers = 0;
  pinkDiamondPlayers = 0;
  galaxyOpalPlayers = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private playerService: PlayerService,
    private lineupService: LineupService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.client = this.authService.getUser();
    this.action = this.activatedRoute.snapshot.url[0].path;
    this.lineupId = this.activatedRoute.snapshot.params.id;

    if (this.client) {
      switch (this.action) {
        case 'create':
          this.buildLineupForm(false);
          break;

        case 'edit':
          this.getLineupById();
          this.buildLineupForm(false);
          break;

        case 'view':
          this.getLineupById();
          this.buildLineupForm(true);
          break;
      }
      this.getPlayers();
      this.buildSelectForm();
    }
  }

  ngOnInit() {
  }

  buildSelectForm() {
    this.selectForm = this.formBuilder.group({
      playerSelected: [{ value: null, disabled: false }]
    });
  }

  buildLineupForm(disabled) {
    this.lineupForm = this.formBuilder.group({
      name: [{ value: null, disabled }],
      overall: [{ value: null, disabled }],
      inside: [{ value: null, disabled }],
      outside: [{ value: null, disabled }],
      playmaking: [{ value: null, disabled }],
      athleticism: [{ value: null, disabled }],
      defending: [{ value: null, disabled }],
      rebounding: [{ value: null, disabled }],
      player1: [{ value: null, disabled }],
      player2: [{ value: null, disabled }],
      player3: [{ value: null, disabled }],
      player4: [{ value: null, disabled }],
      player5: [{ value: null, disabled }],
      player6: [{ value: null, disabled }],
      player7: [{ value: null, disabled }],
      player8: [{ value: null, disabled }],
      player9: [{ value: null, disabled }],
      player10: [{ value: null, disabled }],
      player11: [{ value: null, disabled }],
      player12: [{ value: null, disabled }],
      player13: [{ value: null, disabled }]
    });
  }

  getLineupById() {
    this.lineupService
      .getById(this.lineupId)
      .subscribe((response) => {
        this.lineup = response;
        this.player1 = response.player1;
        if (response.player1 !== null) {
          this.lineupPlayers.push(this.player1);
        }
        this.player2 = response.player2;
        if (response.player2 !== null) {
          this.lineupPlayers.push(this.player2);
        }

        this.player3 = response.player3;
        if (response.player3 !== null) {
          this.lineupPlayers.push(this.player3);
        }

        this.player4 = response.player4;
        if (response.player4 !== null) {
          this.lineupPlayers.push(this.player4);
        }

        this.player5 = response.player5;
        if (response.player5 !== null) {
          this.lineupPlayers.push(this.player5);
        }

        this.player6 = response.player6;
        if (response.player6 !== null) {
          this.lineupPlayers.push(this.player6);
        }

        this.player7 = response.player7;
        if (response.player7 !== null) {
          this.lineupPlayers.push(this.player7);
        }

        this.player8 = response.player8;
        if (response.player8 !== null) {
          this.lineupPlayers.push(this.player8);
        }

        this.player9 = response.player9;
        if (response.player9 !== null) {
          this.lineupPlayers.push(this.player9);
        }

        this.player10 = response.player10;
        if (response.player10 !== null) {
          this.lineupPlayers.push(this.player10);
        }

        this.player11 = response.player11;
        if (response.player11 !== null) {
          this.lineupPlayers.push(this.player11);
        }

        this.player12 = response.player12;
        if (response.player12 !== null) {
          this.lineupPlayers.push(this.player12);
        }

        this.player13 = response.player13;
        if (response.player13 !== null) {
          this.lineupPlayers.push(this.player13);
        }

        this.bronzePlayers = response.bronzePlayers;
        this.silverPlayers = response.silverPlayers;
        this.goldPlayers = response.goldPlayers;
        this.emeraldPlayers = response.emeraldPlayers;
        this.sapphirePlayers = response.sapphirePlayers;
        this.rubyPlayers = response.rubyPlayers;
        this.heatcheckPlayers = response.heatcheckPlayers;
        this.amethystPlayers = response.amethystPlayers;
        this.onyxPlayers = response.onyxPlayers;
        this.diamondPlayers = response.diamondPlayers;
        this.pinkDiamondPlayers = response.pinkDiamondPlayers;
        this.galaxyOpalPlayers = response.galaxyOpalPlayers;
        this.lineupForm.patchValue(response);
        this.calculateOveralls();
      });
  }

  sendLineup(values) {
    values.clientId = this.client.userId;
    values.overall = this.lineupOverall;
    values.inside = this.lineupInside;
    values.outside = this.lineupOutside;
    values.playmaking = this.lineupPlaymaking;
    values.athleticism = this.lineupAthleticism;
    values.defending = this.lineupDefending;
    values.rebounding = this.lineupRebounding;
    values.bronzePlayers = this.bronzePlayers;
    values.silverPlayers = this.silverPlayers;
    values.goldPlayers = this.goldPlayers;
    values.emeraldPlayers = this.emeraldPlayers;
    values.sapphirePlayers = this.sapphirePlayers;
    values.rubyPlayers = this.rubyPlayers;
    values.heatcheckPlayers = this.heatcheckPlayers;
    values.amethystPlayers = this.amethystPlayers;
    values.onyxPlayers = this.onyxPlayers;
    values.diamondPlayers = this.diamondPlayers;
    values.pinkDiamondPlayers = this.pinkDiamondPlayers;
    values.galaxyOpalPlayers = this.galaxyOpalPlayers;

    this.lineupService
      .create(values)
      .subscribe((response) => {
        this.toastrService.success('Lineup created succesfully', 'Success');
        this.router.navigate([this.routerDefinitions.lineups]);
      });
  }

  editLineup(values) {
    if (this.player1) {
      values.player1 = this.player1;
    } else {
      delete values.player1;
    }
    values.player1 = this.player1;
    values.player2 = this.player2;
    values.player3 = this.player3;
    values.player4 = this.player4;
    values.player5 = this.player5;
    values.player6 = this.player6;
    values.player7 = this.player7;
    values.player8 = this.player8;
    values.player9 = this.player9;
    values.player10 = this.player10;
    values.player11 = this.player11;
    values.player12 = this.player12;
    values.player13 = this.player13;
    values.clientId = this.client.userId;
    values.overall = this.lineupOverall;
    values.inside = this.lineupInside;
    values.outside = this.lineupOutside;
    values.playmaking = this.lineupPlaymaking;
    values.athleticism = this.lineupAthleticism;
    values.defending = this.lineupDefending;
    values.rebounding = this.lineupRebounding;
    values.bronzePlayers = this.bronzePlayers;
    values.silverPlayers = this.silverPlayers;
    values.goldPlayers = this.goldPlayers;
    values.emeraldPlayers = this.emeraldPlayers;
    values.sapphirePlayers = this.sapphirePlayers;
    values.rubyPlayers = this.rubyPlayers;
    values.heatcheckPlayers = this.heatcheckPlayers;
    values.amethystPlayers = this.amethystPlayers;
    values.onyxPlayers = this.onyxPlayers;
    values.diamondPlayers = this.diamondPlayers;
    values.pinkDiamondPlayers = this.pinkDiamondPlayers;
    values.galaxyOpalPlayers = this.galaxyOpalPlayers;

    this.lineupService
      .edit(this.lineupId, values)
      .subscribe((response) => {
        this.toastrService.success('Lineup edited succesfully', 'Success');
        this.router.navigate([this.routerDefinitions.lineups + '/view/' + this.lineupId]);
      });
  }

  getPlayers() {
    this.playerService
      .getAll()
      .subscribe((response) => {
        response.map((player: any) => {
          player.bindLabel = player.name + ' ' + player.lastName + ' ' + player.overall;
        });
        this.players = response;
      });
  }

  onOpen(elem) {
    if (elem.filterInput.nativeElement.value === '') {
      elem.close();
    }
  }

  selectPosition(event) {
    const id = event.target.id;

    switch (id) {
      case 'player1':
        if (this.player1) {
          this.lineupPlayers.splice(this.findElement(this.player1), 1);
          this.removeFromCount(this.player1);
          this.player1 = null;
        } else {
          this.positionSelected = 'player1';
        }
        break;
      case 'player2':
        if (this.player2) {
          this.lineupPlayers.splice(this.findElement(this.player2), 1);
          this.removeFromCount(this.player2);
          this.player2 = null;
        } else {
          this.positionSelected = 'player2';
        }
        break;
      case 'player3':
        if (this.player3) {
          this.lineupPlayers.splice(this.findElement(this.player3), 1);
          this.removeFromCount(this.player3);
          this.player3 = null;
        } else {
          this.positionSelected = 'player3';
        }
        break;
      case 'player4':
        if (this.player4) {
          this.lineupPlayers.splice(this.findElement(this.player4), 1);
          this.removeFromCount(this.player4);
          this.player4 = null;
        } else {
          this.positionSelected = 'player4';
        }
        break;
      case 'player5':
        if (this.player5) {
          this.lineupPlayers.splice(this.findElement(this.player5), 1);
          this.removeFromCount(this.player5);
          this.player5 = null;
        } else {
          this.positionSelected = 'player5';
        }
        break;
      case 'player6':
        if (this.player6) {
          this.lineupPlayers.splice(this.findElement(this.player6), 1);
          this.removeFromCount(this.player6);
          this.player6 = null;
        } else {
          this.positionSelected = 'player6';
        }
        break;
      case 'player7':
        if (this.player7) {
          this.lineupPlayers.splice(this.findElement(this.player7), 1);
          this.removeFromCount(this.player7);
          this.player7 = null;
        } else {
          this.positionSelected = 'player7';
        }
        break;
      case 'player8':
        if (this.player8) {
          this.lineupPlayers.splice(this.findElement(this.player8), 1);
          this.removeFromCount(this.player8);
          this.player8 = null;
        } else {
          this.positionSelected = 'player8';
        }
        break;
      case 'player9':
        if (this.player9) {
          this.lineupPlayers.splice(this.findElement(this.player9), 1);
          this.removeFromCount(this.player9);
          this.player9 = null;
        } else {
          this.positionSelected = 'player9';
        }
        break;
      case 'player10':
        if (this.player10) {
          this.lineupPlayers.splice(this.findElement(this.player10), 1);
          this.removeFromCount(this.player10);
          this.player10 = null;
        } else {
          this.positionSelected = 'player10';
        }
        break;
      case 'player11':
        if (this.player11) {
          this.lineupPlayers.splice(this.findElement(this.player11), 1);
          this.removeFromCount(this.player11);
          this.player11 = null;
        } else {
          this.positionSelected = 'player11';
        }
        break;
      case 'player12':
        if (this.player12) {
          this.lineupPlayers.splice(this.findElement(this.player12), 1);
          this.removeFromCount(this.player12);
          this.player12 = null;
        } else {
          this.positionSelected = 'player12';
        }
        break;
      case 'player13':
        if (this.player13) {
          this.lineupPlayers.splice(this.findElement(this.player13), 1);
          this.removeFromCount(this.player13);
          this.player13 = null;
        } else {
          this.positionSelected = 'player13';
        }
        break;
    }
    this.calculateOveralls();
  }

  selectPlayer(player) {
    if (this.positionSelected) {
      switch (this.positionSelected) {
        case 'player1':
          this.player1 = player.playerSelected;
          this.lineupPlayers.splice(0, 0, this.player1);
          this.lineupForm.get('player1').patchValue(this.player1);
          this.positionSelected = null;
          this.selectForm.reset();
          break;

        case 'player2':
          this.player2 = player.playerSelected;
          this.lineupPlayers.splice(1, 0, this.player2);
          this.lineupForm.get('player2').patchValue(this.player2);
          this.positionSelected = null;
          this.selectForm.reset();
          break;

        case 'player3':
          this.player3 = player.playerSelected;
          this.lineupPlayers.splice(2, 0, this.player3);
          this.lineupForm.get('player3').patchValue(this.player3);
          this.positionSelected = null;
          this.selectForm.reset();
          break;

        case 'player4':
          this.player4 = player.playerSelected;
          this.lineupPlayers.splice(3, 0, this.player4);
          this.lineupForm.get('player4').patchValue(this.player4);
          this.positionSelected = null;
          this.selectForm.reset();
          break;

        case 'player5':
          this.player5 = player.playerSelected;
          this.lineupPlayers.splice(4, 0, this.player5);
          this.lineupForm.get('player5').patchValue(this.player5);
          this.positionSelected = null;
          this.selectForm.reset();
          break;

        case 'player6':
          this.player6 = player.playerSelected;
          this.lineupPlayers.splice(5, 0, this.player6);
          this.lineupForm.get('player6').patchValue(this.player6);
          this.positionSelected = null;
          this.selectForm.reset();
          break;

        case 'player7':
          this.player7 = player.playerSelected;
          this.lineupPlayers.splice(6, 0, this.player7);
          this.lineupForm.get('player7').patchValue(this.player7);
          this.positionSelected = null;
          this.selectForm.reset();
          break;

        case 'player8':
          this.player8 = player.playerSelected;
          this.lineupPlayers.splice(7, 0, this.player8);
          this.lineupForm.get('player8').patchValue(this.player8);
          this.positionSelected = null;
          this.selectForm.reset();
          break;

        case 'player9':
          this.player9 = player.playerSelected;
          this.lineupPlayers.splice(8, 0, this.player9);
          this.lineupForm.get('player9').patchValue(this.player9);
          this.positionSelected = null;
          this.selectForm.reset();
          break;

        case 'player10':
          this.player10 = player.playerSelected;
          this.lineupPlayers.splice(9, 0, this.player10);
          this.lineupForm.get('player10').patchValue(this.player10);
          this.positionSelected = null;
          this.selectForm.reset();
          break;

        case 'player11':
          this.player11 = player.playerSelected;
          this.lineupPlayers.splice(10, 0, this.player11);
          this.lineupForm.get('player11').patchValue(this.player11);
          this.positionSelected = null;
          this.selectForm.reset();
          break;

        case 'player12':
          this.player12 = player.playerSelected;
          this.lineupPlayers.splice(11, 0, this.player12);
          this.lineupForm.get('player12').patchValue(this.player12);
          this.positionSelected = null;
          this.selectForm.reset();
          break;

        case 'player13':
          this.player13 = player.playerSelected;
          this.lineupPlayers.splice(12, 0, this.player13);
          this.lineupForm.get('player13').patchValue(this.player13);
          this.positionSelected = null;
          this.selectForm.reset();
          break;
      }
      this.addToCount(player.playerSelected);
      this.calculateOveralls();
    }
  }

  addToCount(player) {
    const tier = player.tier;

    switch (tier) {
      case 'bronze':
        this.bronzePlayers++;
        break;

      case 'silver':
        this.silverPlayers++;
        break;

      case 'gold':
        this.goldPlayers++;
        break;

      case 'emerald':
        this.emeraldPlayers++;
        break;

      case 'sapphire':
        this.sapphirePlayers++;
        break;

      case 'ruby':
        this.rubyPlayers++;
        break;

      case 'heatcheck':
        this.heatcheckPlayers++;
        break;

      case 'amethyst':
        this.amethystPlayers++;
        break;

      case 'onyx':
        this.onyxPlayers++;
        break;

      case 'diamond':
        this.diamondPlayers++;
        break;

      case 'pinkdiamond':
        this.pinkDiamondPlayers++;
        break;

      case 'galaxyopal':
        this.galaxyOpalPlayers++;
        break;
    }
  }

  removeFromCount(player) {
    const tier = player.tier;

    switch (tier) {
      case 'bronze':
        this.bronzePlayers--;
        break;

      case 'silver':
        this.silverPlayers--;
        break;

      case 'gold':
        this.goldPlayers--;
        break;

      case 'emerald':
        this.emeraldPlayers--;
        break;

      case 'sapphire':
        this.sapphirePlayers--;
        break;

      case 'ruby':
        this.rubyPlayers--;
        break;

      case 'heatcheck':
        this.heatcheckPlayers--;
        break;

      case 'amethyst':
        this.amethystPlayers--;
        break;

      case 'onyx':
        this.onyxPlayers--;
        break;

      case 'diamond':
        this.diamondPlayers--;
        break;

      case 'pinkdiamond':
        this.pinkDiamondPlayers--;
        break;

      case 'galaxyopal':
        this.galaxyOpalPlayers--;
        break;
    }
  }

  calculateOveralls() {
    this.lineupOverall = 0;
    this.lineupInside = 0;
    this.lineupOutside = 0;
    this.lineupPlaymaking = 0;
    this.lineupAthleticism = 0;
    this.lineupDefending = 0;
    this.lineupRebounding = 0;

    if (this.lineupPlayers.length > 0) {
      this.lineupPlayers.forEach(element => {
        if (element !== null) {
          this.lineupOverall += element.overall;
          this.lineupInside += element.inside;
          this.lineupOutside += element.outside;
          this.lineupPlaymaking += element.playmaking;
          this.lineupAthleticism += element.athleticism;
          this.lineupDefending += element.defending;
          this.lineupRebounding += element.rebounding;
        }
      });

      this.lineupOverall = Math.round(this.lineupOverall / this.lineupPlayers.length);
      this.lineupInside = Math.round(this.lineupInside / this.lineupPlayers.length);
      this.lineupOutside = Math.round(this.lineupOutside / this.lineupPlayers.length);
      this.lineupPlaymaking = Math.round(this.lineupPlaymaking / this.lineupPlayers.length);
      this.lineupAthleticism = Math.round(this.lineupAthleticism / this.lineupPlayers.length);
      this.lineupDefending = Math.round(this.lineupDefending / this.lineupPlayers.length);
      this.lineupRebounding = Math.round(this.lineupRebounding / this.lineupPlayers.length);
    }
  }

  findElement(player) {
    const found = _.findIndex(this.lineupPlayers, player);

    return found;
  }
}
