
import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
    imgselect : string;
  }

@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'mageSelect.dialog.componet.html',
  })
  export class DialogImageSelect {
    ico_png ='./assets/images/ico/avatar/png/';
  public img1 = this.ico_png + '1.png';
  public img2 = this.ico_png + '2.png';
  public img3 = this.ico_png + '3.png';
  public img4 = this.ico_png + '4.png';
  public img5 = this.ico_png + '5.png';
  public img6 = this.ico_png + '6.png';
  public img7 = this.ico_png + '7.png';
  public img8 = this.ico_png + '8.png';
  public img9 = this.ico_png + '9.png';
  public img10 = this.ico_png + '10.png';
  public img11 = this.ico_png + '11.png';
  public img12 = this.ico_png + '12.png';
    constructor(
      public dialogRef: MatDialogRef<DialogImageSelect>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }