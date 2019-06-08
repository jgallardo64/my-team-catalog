import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/shared/services/client.service';
import { ROUTER_DEFINITIONS } from 'src/app/shared/constants/router-definitions';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-my-lineups',
  templateUrl: './my-lineups.component.html',
  styleUrls: ['./my-lineups.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyLineupsComponent implements OnInit {
  clientId;
  client;

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
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService
  ) {
    this.clientId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.getMyLineups();
    this.getClient();
  }

  getMyLineups() {
    this.clientService
      .getMyLineups(this.clientId)
      .subscribe((response) => {
        this.dataSource.data = response;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  getClient() {
    this.clientService
    .getById(this.clientId)
    .subscribe((response) => {
      this.client = response;
    });
  }

  filterLineups(value) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  selectLineup(lineup) {
    this.router.navigate([this.routerDefinitions.lineups + '/view/' + lineup.id]);
  }

}
