import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ClientService } from 'src/app/shared/services/client.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-my-lineups',
  templateUrl: './my-lineups.component.html',
  styleUrls: ['./my-lineups.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyLineupsComponent implements OnInit {
  clientId;
  myLineups;

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
    private clientService: ClientService,
    private authService: AuthService
  ) {
    this.clientId = this.authService.getUser().userId;
  }

  ngOnInit() {
    this.getMyLineups();
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

}
