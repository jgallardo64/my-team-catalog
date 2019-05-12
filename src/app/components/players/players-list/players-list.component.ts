import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { PlayerService } from "src/app/shared/services/player.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-players-list",
  templateUrl: "./players-list.component.html",
  styleUrls: ["./players-list.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class PlayersListComponent implements OnInit {
  players;
  playersForm: FormGroup;
  displayedColumns: string[] = [
    "name",
    "overall",
    "position",
    "inside",
    "outside",
    "playmaking",
    "athletism",
    "defending",
    "rebounding",
    "height",
    "totalAttributes"
  ];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private playerService: PlayerService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getPlayers();
    this.buildForm();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  buildForm() {
    this.playersForm = this.formBuilder.group({
      name: [{ value: null, disabled: false }],
      lastName: [{ value: null, disabled: false }],
      collection: [{ value: null, disabled: false }],
      subcollection: [{ value: null, disabled: false }],
      overall: [{ value: null, disabled: false }],
      position: [{ value: null, disabled: false }],
      inside: [{ value: null, disabled: false }],
      outside: [{ value: null, disabled: false }],
      playmaking: [{ value: null, disabled: false }],
      defending: [{ value: null, disabled: false }],
      athletism: [{ value: null, disabled: false }],
      rebounding: [{ value: null, disabled: false }],
      totalAttributes: [{ value: null, disabled: false }],
      height: [{ value: null, disabled: false }],
      image: [{ value: null, disabled: false }]
    });
  }

  sendForm(values) {
    this.playerService.createPlayer(values).subscribe(response => {
      console.log(response);
      this.toastr.success("Jugador creado correctamente", "Listo");
      this.getPlayers();
      this.playersForm.reset();
    });
  }

  getPlayers() {
    // const filter = `{"where":{"name":"Giannis"}}`;

    this.playerService.getAll().subscribe(response => {
      this.dataSource.data = response;
    });
  }

  getPlayerById(id) {
    this.playerService.getById(id).subscribe(response => {
      console.log(response);
    });
  }

  filterPlayers(value) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  selectPlayer(player) {
    // this.playersForm.patchValue(player);
    this.router.navigate(["players/detail/" + player.id]);
  }
}
