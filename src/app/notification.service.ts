import { Component, Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { AlertDialog } from './alert/alert.component';




@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private readonly snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  alert(message: string, title = 'Sign Up Confirmation', okCallback: () => void = () => { }) {
    const dialogRef = this.dialog.open(AlertDialog, {
      width: '250px',
      data: { message: message, title: title },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && okCallback) {
        okCallback();
      }
    });
  }
}

