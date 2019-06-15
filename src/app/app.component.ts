import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ROUTER_DEFINITIONS } from './shared/constants/router-definitions';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from './shared/services/client.service';
import { AuthService } from './shared/services/auth.service';
import { PlayerService } from './shared/services/player.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'my-team-catalog';

  routerDefinitions = ROUTER_DEFINITIONS;
  role;
  user;

  loginForm: FormGroup;
  registerForm: FormGroup;
  filter;
  results = [];
  selectedPlayer;

  @ViewChild('drawer') private drawer: any;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private authService: AuthService,
    private playerService: PlayerService,
    private toastr: ToastrService
  ) {
    this.role = this.authService.getUserRole();
    this.user = this.authService.getUser();
    this.buildLoginForm();
    this.buildRegisterForm();
  }

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: [{ value: null, disabled: false }],
      password: [{ value: null, disabled: false }]
    });
  }

  buildRegisterForm() {
    this.registerForm = this.formBuilder.group({
      username: [{ value: null, disabled: false }],
      email: [{ value: null, disabled: false }],
      password: [{ value: null, disabled: false }]
    });
  }

  sendLoginForm(values) {
    this.authService
      .login(values)
      .subscribe((response) => {
        window.location.reload();
      }, error => {
        this.toastr.error('Login attempt failed', 'Error');
      });
  }

  sendRegisterForm(values) {
    this.clientService
      .register(values)
      .subscribe((response) => {
        window.location.reload();
      });
  }

  logout() {
    this.authService
    .logout();
    window.location.reload();
  }

  drawerToggle() {
    this.drawer.toggle();
  }

}
