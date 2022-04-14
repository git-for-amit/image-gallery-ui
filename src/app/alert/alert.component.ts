import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './dialod-data';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertDialog {
  constructor(
    public dialogRef: MatDialogRef<AlertDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
