import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ClientService } from 'src/app/shared/services/client.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTER_DEFINITIONS } from 'src/app/shared/constants/router-definitions';

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
    private clientService: ClientService,
    private authService: AuthService
  ) {
    if (this.authService.isAuthenticated()) {
      this.clientId = this.authService.getUser().userId;
      this.getMyLineups();
    }
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getMyLineups() {
    this.clientService
      .getMyLineups(this.clientId)
      .subscribe((response) => {
        this.dataSource.data = response;
      });
  }

  filterLineups(value) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  selectLineup(lineup) {
    this.router.navigate([this.routerDefinitions.lineups + '/view/' + lineup.id]);
  }

}
