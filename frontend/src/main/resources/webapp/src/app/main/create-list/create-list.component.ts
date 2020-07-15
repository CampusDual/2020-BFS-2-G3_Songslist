import { Component, OnInit, Input, Inject } from '@angular/core';
import { SnackBarService, OSnackBarConfig } from 'ontimize-web-ngx';
import { ListService } from 'app/main/services/listService';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { CreateListDialogComponent } from './create-list-dialog/create-list-dialog.component';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss']
})
export class CreateListComponent implements OnInit {
  panelOpenState = false;
  step = 0;
  configuration: OSnackBarConfig;
  value = 'Clear me';
  name: string;
  @Input('id') id: string;
  @Input('action') action: boolean;
  constructor(
    protected snackBarService: SnackBarService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  console.log('createList add id ',this.id);
  }
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  showSimple() {
    // Simple message
    this.snackBarService.open('Snackbar message');
}

showConfigured() {
    // SnackBar configuration
    this.configuration = {
        action: 'Done',
        milliseconds: 5000,
        icon: 'check_circle',
        iconPosition: 'left'
    };
  }
    openDialog(): void {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      //dialogConfig.width = '250px';
      dialogConfig.data = {
         id: this.id,
         action: this.action,
      };
      const dialogRef = this.dialog.open(CreateListDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
        this.name = result;
        // add service -- add list
       //this.snackBarService.open('añadida cancion a nueva lista', this.configuration);
      });
    }

}

