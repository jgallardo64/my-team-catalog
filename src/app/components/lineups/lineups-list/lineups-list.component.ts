import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { ROUTER_DEFINITIONS } from 'src/app/shared/constants/router-definitions';
import { LineupService } from 'src/app/shared/services/lineups.service';

@Component({
  selector: 'app-lineups-list',
  templateUrl: './lineups-list.component.html',
  styleUrls: ['./lineups-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LineupsListComponent implements OnInit {
  clientId;

  routerDefinitions = ROUTER_DEFINITIONS;

  displayedColumns: string[] = [
    'name',
    'overall',
    'inside',
    'outside',
    'playmaking',
    'athleticism',
    'defending',
    'rebounding'
  ];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private lineupService: LineupService
  ) {
  }

  ngOnInit() {
    this.getLineups();
  }

  getLineups() {
    this.lineupService
      .getAll()
      .subscribe((response) => {
        this.dataSource.data = response;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  filterLineups(value) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  selectLineup(lineup) {
    this.router.navigate([this.routerDefinitions.lineups + '/view/' + lineup.id]);
  }

}
