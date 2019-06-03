import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PlayerService } from 'src/app/shared/services/player.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  featuredPlayers = [];
  playersList;

  searchForm: FormGroup;

  constructor(
    private playerService: PlayerService,
    private formBuilder: FormBuilder
  ) {
    this.countPlayers();
    this.getPlayers();
  }

  ngOnInit() {
    this.buildSearchForm();
  }

  buildSearchForm() {
    this.searchForm = this.formBuilder.group({
      search: [{ value: null, disabled: false }]
    });
  }

  countPlayers() {
    this.playerService
      .countPlayers()
      .subscribe((response) => {
        for (let index = 0; index < 3; index++) {
          this.getRandomPlayer(response.count);
        }
      });
  }

  getRandomPlayer(count) {
    const random = Math.floor(Math.random() * count);
    this.playerService
      .getOne(random)
      .subscribe((response) => {
        this.featuredPlayers.push(response);
      });
  }

  getPlayers() {
    this.playerService
      .getAll()
      .subscribe((response) => {
        response.map((player: any) => {
          player.bindLabel = player.name + ' ' + player.lastName + ' ' + player.overall;
        });
        this.playersList = response;
      });
  }

  onOpen(elem) {
    if (elem.filterInput.nativeElement.value === '') {
      elem.close();
    }
  }

  selectPlayer(player) {
    // this.router.navigate([this.routerDefinitions.players + '/detail/' + player.search]);
    this.searchForm.reset();
  }

}
