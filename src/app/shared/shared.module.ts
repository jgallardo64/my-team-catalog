import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogConfirmationComponent } from './components/dialog-confirmation/dialog-confirmation.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    DialogConfirmationComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [
    DialogConfirmationComponent,
    MatButtonModule,
    MatDialogModule
  ],
  entryComponents: [
    DialogConfirmationComponent,
  ]
})
export class SharedModule { }
