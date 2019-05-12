import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MyLineupsComponent } from "./my-lineups/my-lineups.component";
import { CreateLineupComponent } from "./create-lineup/create-lineup.component";

@NgModule({
  declarations: [MyLineupsComponent, CreateLineupComponent],
  imports: [CommonModule]
})
export class LineupsModule {}
