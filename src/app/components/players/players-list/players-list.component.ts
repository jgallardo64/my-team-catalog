import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlayerService } from 'src/app/shared/services/player.service';
import { ROUTER_DEFINITIONS } from 'src/app/shared/constants/router-definitions';
import { STATS } from 'src/app/shared/constants/constants';
import { TeamService } from 'src/app/shared/services/team.service';
import { CollectionService } from 'src/app/shared/services/collection.service';
import { SubcollectionService } from 'src/app/shared/services/subcollection.service';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlayersListComponent implements OnInit {
  collectionList;
  subcollectionList;
  listOfCollections;
  teamsList;
  filter;
  orderColumn;
  orderValue;
  filterForm: FormGroup;
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

  standardColumns: string[] = [
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
  statsDefinitions = STATS;
  statHeader;
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private playerService: PlayerService,
    private teamService: TeamService,
    private collectionService: CollectionService,
    private subcollectionService: SubcollectionService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.getPlayers();
    this.buildForm();
    this.getCollections();
    this.getListOfCollections();
    this.getTeams();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  buildForm() {
    this.filterForm = this.formBuilder.group({
      collection: [{ value: null, disabled: false }],
      subcollection: [{ value: null, disabled: false }],
      position: [{ value: null, disabled: false }],
      tier: [{ value: null, disabled: false }],
      team: [{ value: null, disabled: false }],
      sorting: [{ value: null, disabled: false }]
    });
  }

  createFilter(filterValues) {

    let finishFilter;

    this.orderColumn = this.orderValue;

    if (this.displayedColumns.length !== 11) {
      this.displayedColumns.splice(2, 1);
    }
    this.displayedColumns.splice(2, 0, this.orderValue);
    this.statsDefinitions.forEach(element => {
      if (element.value === this.orderValue) {
        this.statHeader = element.header;
      }
    });

    const startFilter = '{';
    const orderFilter = '"order": "' + filterValues.sorting + ' DESC"';
    const startWhereFilter = ',"where": {"and":[';
    const collectionFilter = '{"subcollectionId":"' + filterValues.collection + '"}';
    const positionFilter = '{"position":{"inq":[' + filterValues.position + ']}}';
    const tierFilter = '{"tier":{"inq":[' + filterValues.tier + ']}}';
    const subcollectionFilter = '{"subcollectionId":{"inq":[' + filterValues.subcollection + ']}}';
    const teamFilter = '{"teamId":{"inq":[' + filterValues.team + ']}}';

    if (filterValues.collection || filterValues.position || filterValues.tier || filterValues.subcollection || filterValues.team) {
      finishFilter = ']}}';
    } else {
      finishFilter = '}';
    }

    this.filter = startFilter
      .concat((filterValues.sorting !== '' && filterValues.sorting !== null) ? orderFilter : '"order": "overall DESC"')
      // tslint:disable-next-line: max-line-length
      .concat(((filterValues.collection || (filterValues.position !== null && filterValues.position.length > 0) || (filterValues.tier !== null && filterValues.tier.length > 0)) || (filterValues.team !== null && filterValues.team.length > 0) || (filterValues.subcollection !== null && filterValues.subcollection.length > 0)) ? startWhereFilter : '')
      .concat((filterValues.collection !== '' && filterValues.collection !== null) ? collectionFilter : '')
      .concat((filterValues.collection && filterValues.position !== null && filterValues.position.length > 0) ? ',' : '')
      .concat((filterValues.position !== '' && filterValues.position !== null && filterValues.position.length > 0) ? positionFilter : '')
      // tslint:disable-next-line: max-line-length
      .concat(((filterValues.collection || (filterValues.position !== null && filterValues.position.length > 0)) && (filterValues.tier !== null && filterValues.tier.length > 0)) ? ',' : '')
      .concat((filterValues.tier && filterValues.tier !== null && filterValues.tier.length > 0) ? tierFilter : '')
      // tslint:disable-next-line: max-line-length
      .concat(((filterValues.collection || (filterValues.position !== null && filterValues.position.length > 0) || (filterValues.tier !== null && filterValues.tier.length > 0)) && (filterValues.team !== null && filterValues.team.length > 0)) ? ',' : '')
      .concat((filterValues.team && filterValues.team !== null && filterValues.team.length > 0) ? teamFilter : '')
      // tslint:disable-next-line: max-line-length
      .concat(((filterValues.collection || (filterValues.position !== null && filterValues.position.length > 0) || (filterValues.tier !== null && filterValues.tier.length > 0) || (filterValues.team !== null && filterValues.team.length > 0)) && (filterValues.subcollection !== null && filterValues.subcollection.length > 0)) ? ',' : '')
      // tslint:disable-next-line: max-line-length
      .concat((filterValues.subcollection && filterValues.subcollection !== null && filterValues.subcollection.length > 0) ? subcollectionFilter : '')
      .concat(finishFilter);

    this.getPlayers();

  }

  resetFilter() {
    this.filterForm.reset();
    this.filter = '';
    this.getPlayers();
    this.displayedColumns = this.standardColumns;
    this.statsDefinitions.forEach(element => {
      element.selected = false;
    });
  }

  getTableValue(element, sorting) {

    return element[sorting];

  }

  checkSelectedOrder(value) {

    this.orderValue = value;

    this.filterForm.get('sorting').setValue(value);

    this.statsDefinitions.forEach(element => {

      if (element.value !== value) {
        element.selected = false;
      }

    });

  }

  getPlayers() {
    this.playerService
      .getAll(this.filter)
      .subscribe(response => {
        this.dataSource.data = response;
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

  selectPlayer(player) {
    this.router.navigate([this.routerDefinitions.players + '/detail/' + player.id]);
  }
}
