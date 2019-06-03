import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ROUTER_DEFINITIONS } from 'src/app/shared/constants/router-definitions';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, tap } from 'rxjs/operators';
import { PlayerService } from 'src/app/shared/services/player.service';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/shared/services/client.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  routerDefinitions = ROUTER_DEFINITIONS;
  role;

  searchForm: FormGroup;
  loginForm: FormGroup;
  filter;
  results = [];
  selectedPlayer;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private authService: AuthService,
    private playerService: PlayerService
  ) {
    this.role = this.authService.getUserRole();
  }

  ngOnInit() {
    this.buildSearchForm();
    this.buildLoginForm();
    this.getPlayers();
  }

  buildSearchForm() {
    this.searchForm = this.formBuilder.group({
      search: [{ value: null, disabled: false }]
    });
  }

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: [{ value: null, disabled: false }],
      password: [{ value: null, disabled: false }]
    });
  }

  sendLoginForm(values) {
    this.authService
      .login(values)
      .subscribe((response) => {
        window.location.reload();
      });
  }

  logout() {
    this.authService
    .logout();
    window.location.reload();
  }

  getPlayers() {
    this.playerService
      .getAll()
      .subscribe((response) => {
        response.map((player: any) => {
          player.bindLabel = player.name + ' ' + player.lastName + ' ' + player.overall;
        });
        this.results = response;
      });
  }

  onOpen(elem) {
    if (elem.filterInput.nativeElement.value === '') {
      elem.close();
    }
  }

  selectPlayer(player) {
    this.router.navigate([this.routerDefinitions.players + '/detail/' + player.search]);
    this.searchForm.reset();
  }

}
