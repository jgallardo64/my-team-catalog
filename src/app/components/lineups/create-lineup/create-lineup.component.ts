import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PlayerService } from 'src/app/shared/services/player.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ClientService } from 'src/app/shared/services/client.service';
import { LineupService } from 'src/app/shared/services/lineups.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ROUTER_DEFINITIONS } from 'src/app/shared/constants/router-definitions';

@Component({
  selector: 'app-create-lineup',
  templateUrl: './create-lineup.component.html',
  styleUrls: ['./create-lineup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateLineupComponent implements OnInit {
  client;
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
    private playerService: PlayerService,
    private lineupService: LineupService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.client = this.authService.getUser();
   }

  ngOnInit() {
    this.getPlayers();
    this.buildLineupForm();
    this.buildSelectForm();
  }

  buildSelectForm() {
    this.selectForm = this.formBuilder.group({
      playerSelected: [{ value: null, disabled: false }]
    });
  }

  buildLineupForm() {
    this.lineupForm = this.formBuilder.group({
      name: [{ value: null, disabled: false }],
      overall: [{ value: null, disabled: false }],
      inside: [{ value: null, disabled: false }],
      outside: [{ value: null, disabled: false }],
      playmaking: [{ value: null, disabled: false }],
      athleticism: [{ value: null, disabled: false }],
      defending: [{ value: null, disabled: false }],
      rebounding: [{ value: null, disabled: false }],
      player1: [{ value: null, disabled: false }],
      player2: [{ value: null, disabled: false }],
      player3: [{ value: null, disabled: false }],
      player4: [{ value: null, disabled: false }],
      player5: [{ value: null, disabled: false }],
      player6: [{ value: null, disabled: false }],
      player7: [{ value: null, disabled: false }],
      player8: [{ value: null, disabled: false }],
      player9: [{ value: null, disabled: false }],
      player10: [{ value: null, disabled: false }],
      player11: [{ value: null, disabled: false }],
      player12: [{ value: null, disabled: false }],
      player13: [{ value: null, disabled: false }]
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

    this.lineupService
    .create(values)
    .subscribe((response) => {
      this.toastrService.success('Lineup created succesfully', 'Success');
      this.router.navigate([this.routerDefinitions.lineups]);
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
          this.lineupPlayers.splice(0, 1);
          this.removeFromCount(this.player1);
          this.player1 = null;
        } else {
          this.positionSelected = 'player1';
        }
        break;
      case 'player2':
        if (this.player2) {
          this.lineupPlayers.splice(1, 1);
          this.removeFromCount(this.player2);
          this.player2 = null;
        } else {
          this.positionSelected = 'player2';
        }
        break;
      case 'player3':
        if (this.player3) {
          this.lineupPlayers.splice(2, 1);
          this.removeFromCount(this.player3);
          this.player3 = null;
        } else {
          this.positionSelected = 'player3';
        }
        break;
      case 'player4':
        if (this.player4) {
          this.lineupPlayers.splice(3, 1);
          this.removeFromCount(this.player4);
          this.player4 = null;
        } else {
          this.positionSelected = 'player4';
        }
        break;
      case 'player5':
        if (this.player5) {
          this.lineupPlayers.splice(4, 1);
          this.removeFromCount(this.player5);
          this.player5 = null;
        } else {
          this.positionSelected = 'player5';
        }
        break;
      case 'player6':
        if (this.player6) {
          this.lineupPlayers.splice(5, 1);
          this.removeFromCount(this.player6);
          this.player6 = null;
        } else {
          this.positionSelected = 'player6';
        }
        break;
      case 'player7':
        if (this.player7) {
          this.lineupPlayers.splice(6, 1);
          this.removeFromCount(this.player7);
          this.player7 = null;
        } else {
          this.positionSelected = 'player7';
        }
        break;
      case 'player8':
        if (this.player8) {
          this.lineupPlayers.splice(7, 1);
          this.removeFromCount(this.player8);
          this.player8 = null;
        } else {
          this.positionSelected = 'player8';
        }
        break;
      case 'player9':
        if (this.player9) {
          this.lineupPlayers.splice(8, 1);
          this.removeFromCount(this.player9);
          this.player9 = null;
        } else {
          this.positionSelected = 'player9';
        }
        break;
      case 'player10':
        if (this.player10) {
          this.lineupPlayers.splice(9, 1);
          this.removeFromCount(this.player10);
          this.player10 = null;
        } else {
          this.positionSelected = 'player10';
        }
        break;
      case 'player11':
        if (this.player11) {
          this.lineupPlayers.splice(10, 1);
          this.removeFromCount(this.player11);
          this.player11 = null;
        } else {
          this.positionSelected = 'player11';
        }
        break;
      case 'player12':
        if (this.player12) {
          this.lineupPlayers.splice(11, 1);
          this.removeFromCount(this.player12);
          this.player12 = null;
        } else {
          this.positionSelected = 'player12';
        }
        break;
      case 'player13':
        if (this.player13) {
          this.lineupPlayers.splice(12, 1);
          this.removeFromCount(this.player13);
          this.player13 = null;
        } else {
          this.positionSelected = 'player13';
        }
        break;

    }
  }

  selectPlayer(player) {
    if (this.positionSelected) {
      switch (this.positionSelected) {
        case 'player1':
          this.player1 = player.playerSelected;
          this.lineupPlayers.splice(0, 0, this.player1);
          this.lineupForm.get('player1').patchValue(this.player1.id);
          this.positionSelected = null;
          this.selectForm.reset();
          break;

        case 'player2':
          this.player2 = player.playerSelected;
          this.lineupPlayers.splice(1, 0, this.player2);
          this.lineupForm.get('player2').patchValue(this.player2.id);
          this.positionSelected = null;
          this.selectForm.reset();
          break;

        case 'player3':
          this.player3 = player.playerSelected;
          this.lineupPlayers.splice(2, 0, this.player3);
          this.lineupForm.get('player3').patchValue(this.player3.id);
          this.positionSelected = null;
          this.selectForm.reset();
          break;

        case 'player4':
          this.player4 = player.playerSelected;
          this.lineupPlayers.splice(3, 0, this.player4);
          this.lineupForm.get('player4').patchValue(this.player4.id);
          this.positionSelected = null;
          this.selectForm.reset();
          break;

        case 'player5':
          this.player5 = player.playerSelected;
          this.lineupPlayers.splice(4, 0, this.player5);
          this.lineupForm.get('player5').patchValue(this.player5.id);
          this.positionSelected = null;
          this.selectForm.reset();
          break;

        case 'player6':
          this.player6 = player.playerSelected;
          this.lineupPlayers.splice(5, 0, this.player6);
          this.lineupForm.get('player6').patchValue(this.player6.id);
          this.positionSelected = null;
          this.selectForm.reset();
          break;

        case 'player7':
          this.player7 = player.playerSelected;
          this.lineupPlayers.splice(6, 0, this.player7);
          this.lineupForm.get('player7').patchValue(this.player7.id);
          this.positionSelected = null;
          this.selectForm.reset();
          break;

        case 'player8':
          this.player8 = player.playerSelected;
          this.lineupPlayers.splice(7, 0, this.player8);
          this.lineupForm.get('player8').patchValue(this.player8.id);
          this.positionSelected = null;
          this.selectForm.reset();
          break;

        case 'player9':
          this.player9 = player.playerSelected;
          this.lineupPlayers.splice(8, 0, this.player9);
          this.lineupForm.get('player9').patchValue(this.player9.id);
          this.positionSelected = null;
          this.selectForm.reset();
          break;

        case 'player10':
          this.player10 = player.playerSelected;
          this.lineupPlayers.splice(9, 0, this.player10);
          this.lineupForm.get('player10').patchValue(this.player10.id);
          this.positionSelected = null;
          this.selectForm.reset();
          break;

        case 'player11':
          this.player11 = player.playerSelected;
          this.lineupPlayers.splice(10, 0, this.player11);
          this.lineupForm.get('player11').patchValue(this.player11.id);
          this.positionSelected = null;
          this.selectForm.reset();
          break;

        case 'player12':
          this.player12 = player.playerSelected;
          this.lineupPlayers.splice(11, 0, this.player12);
          this.lineupForm.get('player12').patchValue(this.player12.id);
          this.positionSelected = null;
          this.selectForm.reset();
          break;

        case 'player13':
          this.player13 = player.playerSelected;
          this.lineupPlayers.splice(12, 0, this.player13);
          this.lineupForm.get('player13').patchValue(this.player13.id);
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

    this.lineupPlayers.forEach(element => {
      this.lineupOverall += element.overall;
      this.lineupInside += element.inside;
      this.lineupOutside += element.outside;
      this.lineupPlaymaking += element.playmaking;
      this.lineupAthleticism += element.athleticism;
      this.lineupDefending += element.defending;
      this.lineupRebounding += element.rebounding;
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
