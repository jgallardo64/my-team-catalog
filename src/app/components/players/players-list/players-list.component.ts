import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlayerService } from 'src/app/shared/services/player.service';
import { ToastrService } from 'ngx-toastr';
import { ROUTER_DEFINITIONS } from 'src/app/shared/constants/router-definitions';
import { BadgeService } from 'src/app/shared/services/badge.service';
import { CollectionService } from 'src/app/shared/services/collection.service';
import { TeamService } from 'src/app/shared/services/team.service';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlayersListComponent implements OnInit {
  players;
  badgeList;
  collectionList;
  subcollectionList;
  teamsList;
  playersForm: FormGroup;
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

  routerDefinitions = ROUTER_DEFINITIONS;
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private playerService: PlayerService,
    private router: Router,
    private formBuilder: FormBuilder,
    private badgeService: BadgeService,
    private collectionService: CollectionService,
    private teamService: TeamService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getPlayers();
    this.buildForm();
    this.getBadges();
    this.getCollections();
    this.getTeams();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  buildForm() {
    this.playersForm = this.formBuilder.group({
      name: [{ value: null, disabled: false }],
      lastName: [{ value: null, disabled: false }],
      collection: [{ value: null, disabled: false }],
      subcollection: [{ value: null, disabled: false }],
      team: [{ value: null, disabled: false }],
      overall: [{ value: null, disabled: false }],
      position: [{ value: null, disabled: false }],
      inside: [{ value: null, disabled: false }],
      outside: [{ value: null, disabled: false }],
      playmaking: [{ value: null, disabled: false }],
      defending: [{ value: null, disabled: false }],
      athleticism: [{ value: null, disabled: false }],
      rebounding: [{ value: null, disabled: false }],
      totalAttributes: [{ value: null, disabled: false }],
      height: [{ value: null, disabled: false }],
      badges: [{ value: null, disabled: false }],
      image: [{ value: [], disabled: false }]
    });
  }

  sendForm(values) {
    this.playerService
      .createPlayer(values)
      .subscribe(response => {
        console.log(response);
        this.toastr.success('Jugador creado correctamente', 'Listo');
        this.getPlayers();
        this.playersForm.reset();
      });
  }

  getPlayers() {
    this.playerService
      .getAll()
      .subscribe(response => {
        this.dataSource.data = response;
      });
  }

  getBadges() {
    this.badgeService
      .getAll()
      .subscribe(response => {
        this.badgeList = response;
      });
  }

  getCollections() {
    this.collectionService.getAll().subscribe(response => {
      this.collectionList = response;
    });
  }

  getSubCollections(event) {
    this.collectionService
      .getSubCollectionsFromCollection(event.value)
      .subscribe(response => {
        this.subcollectionList = response;
      });
  }

  getTeams() {
    this.teamService
      .getAll()
      .subscribe(response => {
        this.teamsList = response;
      });
  }

  getPlayerById(id) {
    this.playerService
      .getById(id)
      .subscribe(response => {
        console.log(response);
      });
  }

  filterPlayers(value) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  selectPlayer(player) {
    this.router.navigate([
      this.routerDefinitions.players + '/detail/' + player.id
    ]);
  }
}
