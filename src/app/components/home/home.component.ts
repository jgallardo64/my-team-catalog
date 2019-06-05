import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { PlayerService } from 'src/app/shared/services/player.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ROUTER_DEFINITIONS } from 'src/app/shared/constants/router-definitions';
import { Router } from '@angular/router';
import { LineupService } from 'src/app/shared/services/lineups.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  featuredPlayers = [];
  playersList;

  lineupId;
  lineupPlayer1;
  lineupPlayer2;
  lineupPlayer3;
  lineupPlayer4;
  lineupPlayer5;

  routerDefinitions = ROUTER_DEFINITIONS;

  displayedColumns: string[] = [
    'name',
    'overall',
    'position',
    'inside',
    'outside',
    'playmaking',
    'athleticism',
    'defending',
    'rebounding',
    'height',
    'totalAttributes'
  ];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  searchForm: FormGroup;

  constructor(
    private router: Router,
    private playerService: PlayerService,
    private lineupService: LineupService,
    private formBuilder: FormBuilder
  ) {
    this.countPlayers();
    this.countLineups();
    this.getPlayers();
  }

  ngOnInit() {
    this.buildSearchForm();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  buildSearchForm() {
    this.searchForm = this.formBuilder.group({
      search: [{ value: null, disabled: false }]
    });
  }

  countPlayers() {
    this.playerService
      .countPlayers()
      .subscribe((response) => {
        for (let index = 0; index < 3; index++) {
          this.getRandomPlayer(response.count);
        }
      });
  }

  getRandomPlayer(count) {
    const random = Math.floor(Math.random() * count);
    this.playerService
      .getOne(random)
      .subscribe((response: any) => {
        this.featuredPlayers.push(response[0]);
      });
  }

  countLineups() {
    this.lineupService
      .countLineups()
      .subscribe((response) => {
        this.getRandomLineup(response.count);
        console.log(response.count);
      });
  }

  getRandomLineup(count) {
    const random = Math.floor(Math.random() * count);
    this.lineupService
      .getOne(random)
      .subscribe((response: any) => {
        this.lineupId = response[0].id;
        this.lineupPlayer1 = response[0].player1;
        this.lineupPlayer2 = response[0].player2;
        this.lineupPlayer3 = response[0].player3;
        this.lineupPlayer4 = response[0].player4;
        this.lineupPlayer5 = response[0].player5;
      });
  }

  test() {
    console.log('test');
  }

  getPlayers() {
    this.playerService
      .getAll()
      .subscribe((response) => {
        response.map((player: any) => {
          player.bindLabel = player.name + ' ' + player.lastName + ' ' + player.overall;
        });
        this.playersList = response;
        this.dataSource.data = response;
      });
  }

  onOpen(elem) {
    if (elem.filterInput.nativeElement.value === '') {
      elem.close();
    }
  }

  filterPlayers(value) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  selectPlayer(player) {
    this.router.navigate([this.routerDefinitions.players + '/detail/' + player.id]);
  }

  selectLineup() {
    this.router.navigate([this.routerDefinitions.lineups + '/view/' + this.lineupId]);
  }

}
