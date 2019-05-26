import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-confirmation',
  styleUrls: ['./dialog-confirmation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <mat-dialog-content>
    <div class="content">
    <h5>{{data.title}}</h5>
    <p class="message">{{data.message}}</p>
    </div>
    </mat-dialog-content>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close (click)="onCloseReject()">No</button>
      <button mat-button (click)="onCloseAccept()">Yes</button>
    </div>
    `
})

export class DialogConfirmationComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DialogConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onCloseAccept() {
    this.dialogRef.close(true);
  }

  onCloseReject() {
    this.dialogRef.close(false);
  }
}
