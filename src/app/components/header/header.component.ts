import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ROUTER_DEFINITIONS } from 'src/app/shared/constants/router-definitions';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, tap } from 'rxjs/operators';
import { PlayerService } from 'src/app/shared/services/player.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  routerDefinitions = ROUTER_DEFINITIONS;

  searchForm: FormGroup;
  filter;
  results = [];
  selectedPlayer;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private playerService: PlayerService
  ) {
  }

  ngOnInit() {
    this.buildForm();
    this.getPlayers();
    // this.searchForm.get('search').valueChanges.pipe(debounceTime(500)).subscribe(val => {
    // tslint:disable-next-line: max-line-length
    //   this.filter = '{"where":{"or":[{"name":{"like":"' + val + '.*","options":"i"}},{"lastName":{"like":"' + val + '.*","options":"i"}}]}}';
    // });
  }

  // {"where":{"or":[{"name":{"like":"pau.*","options":"i"}},{"lastName":{"like":"pau.*","options":"i"}}]}}

  buildForm() {
    this.searchForm = this.formBuilder.group({
      search: [{ value: null, disabled: false }]
    });
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
