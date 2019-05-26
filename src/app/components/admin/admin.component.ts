import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PlayerService } from 'src/app/shared/services/player.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BadgeService } from 'src/app/shared/services/badge.service';
import { CollectionService } from 'src/app/shared/services/collection.service';
import { SubcollectionService } from 'src/app/shared/services/subcollection.service';
import { TeamService } from 'src/app/shared/services/team.service';
import { ToastrService } from 'ngx-toastr';
import { ROUTER_DEFINITIONS } from 'src/app/shared/constants/router-definitions';
import { TIERS } from 'src/app/shared/constants/constants';
import { MatTableDataSource, MatDialog } from '@angular/material';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {

  routerDefinitions = ROUTER_DEFINITIONS;
  tiers = TIERS;

  badgeList;
  collectionList;
  subcollectionList;
  listOfCollections;
  teamsList;

  playersForm: FormGroup;

  displayedColumns: string[] = [
    'name',
    'overall',
    'position',
    'collection',
    'actions'
  ];

  dataSource = new MatTableDataSource<any>();

  constructor(
    private dialog: MatDialog,
    private playerService: PlayerService,
    private formBuilder: FormBuilder,
    private badgeService: BadgeService,
    private collectionService: CollectionService,
    private subcollectionService: SubcollectionService,
    private teamService: TeamService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getPlayers();
    this.buildForm();
    this.getCollections();
    this.getListOfCollections();
    this.getBadges();
    this.getTeams();
  }

  buildForm() {
    this.playersForm = this.formBuilder.group({
      name: [{ value: null, disabled: false }],
      lastName: [{ value: null, disabled: false }],
      collectionId: [{ value: null, disabled: false }],
      subcollectionId: [{ value: null, disabled: false }],
      teamId: [{ value: null, disabled: false }],
      overall: [{ value: null, disabled: false }],
      tier: [{ value: null, disabled: false }],
      position: [{ value: null, disabled: false }],
      outside: [{ value: null, disabled: false }],
      openMid: [{ value: null, disabled: false }],
      contestedMid: [{ value: null, disabled: false }],
      movingMid: [{ value: null, disabled: false }],
      open3PT: [{ value: null, disabled: false }],
      contested3PT: [{ value: null, disabled: false }],
      moving3PT: [{ value: null, disabled: false }],
      shotIQ: [{ value: null, disabled: false }],
      freeThrow: [{ value: null, disabled: false }],
      offConsistency: [{ value: null, disabled: false }],
      athleticism: [{ value: null, disabled: false }],
      speed: [{ value: null, disabled: false }],
      acceleration: [{ value: null, disabled: false }],
      vertical: [{ value: null, disabled: false }],
      strength: [{ value: null, disabled: false }],
      stamina: [{ value: null, disabled: false }],
      hustle: [{ value: null, disabled: false }],
      durability: [{ value: null, disabled: false }],
      inside: [{ value: null, disabled: false }],
      shotClose: [{ value: null, disabled: false }],
      standingLayup: [{ value: null, disabled: false }],
      drivingLayup: [{ value: null, disabled: false }],
      standingDunk: [{ value: null, disabled: false }],
      drivingDunk: [{ value: null, disabled: false }],
      contactDunk: [{ value: null, disabled: false }],
      drawFoul: [{ value: null, disabled: false }],
      postControl: [{ value: null, disabled: false }],
      postHook: [{ value: null, disabled: false }],
      postFade: [{ value: null, disabled: false }],
      hands: [{ value: null, disabled: false }],
      playmaking: [{ value: null, disabled: false }],
      ballControl: [{ value: null, disabled: false }],
      passAccuracy: [{ value: null, disabled: false }],
      passVision: [{ value: null, disabled: false }],
      passIQ: [{ value: null, disabled: false }],
      speedBall: [{ value: null, disabled: false }],
      defending: [{ value: null, disabled: false }],
      onBallDefIQ: [{ value: null, disabled: false }],
      lowPostDefIQ: [{ value: null, disabled: false }],
      pickNRollDefIQ: [{ value: null, disabled: false }],
      helpDefIQ: [{ value: null, disabled: false }],
      lateralQuickness: [{ value: null, disabled: false }],
      passPerception: [{ value: null, disabled: false }],
      reactionTime: [{ value: null, disabled: false }],
      steal: [{ value: null, disabled: false }],
      block: [{ value: null, disabled: false }],
      shotContest: [{ value: null, disabled: false }],
      defConsistency: [{ value: null, disabled: false }],
      rebounding: [{ value: null, disabled: false }],
      offRebound: [{ value: null, disabled: false }],
      defRebound: [{ value: null, disabled: false }],
      boxout: [{ value: null, disabled: false }],
      totalAttributes: [{ value: null, disabled: false }],
      height: [{ value: null, disabled: false }],
      weight: [{ value: null, disabled: false }],
      age: [{ value: null, disabled: false }],
      badges: [{ value: null, disabled: false }],
      image: [{ value: [], disabled: false }]
    });
  }

  sendForm(values) {
    this.playerService
      .createPlayer(values)
      .subscribe(response => {
        this.toastr.success('Jugador creado correctamente', 'Listo');
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

  getListOfCollections() {
    this.subcollectionService
      .getAll()
      .subscribe((response) => {
        this.listOfCollections = response;
      });
  }

  getSubCollections(event) {
    if (event.id) {
      this.collectionService
        .getSubCollectionsFromCollection(event.id)
        .subscribe(response => {
          this.subcollectionList = response;
        });
    } else {
      this.subcollectionList = [];
    }
  }

  getTeams() {
    this.teamService
      .getAll()
      .subscribe(response => {
        this.teamsList = response;
      });
  }

  filterPlayers(value) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
