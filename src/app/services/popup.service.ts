import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private isDialogOpen: boolean = false;
  private dialogRef: MatDialogRef<any> | undefined;

  constructor(private dialog: MatDialog) { }

  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    if (!this.isDialogOpen) {
      this.dialogRef = this.dialog.open(templateRef, {
        disableClose: true // This prevents closing the dialog when clicking outside
      });
      this.isDialogOpen = true;

      this.dialogRef.afterClosed().subscribe(() => {
        this.isDialogOpen = false;
      });
    }
  }

  closeDialog() {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.isDialogOpen = false;
    }
  }
}