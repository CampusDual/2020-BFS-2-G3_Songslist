import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../create-list.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISongListModel } from 'app/shared/models/isongList.model';
import { SnackBarService } from 'ontimize-web-ngx';
import { ListService } from 'app/main/services/listService';


@Component({
  selector: 'app-create-list-dialog',
  templateUrl: './create-list-dialog.component.html',
  styleUrls: ['./create-list-dialog.component.scss']
})
export class CreateListDialogComponent implements OnInit {
  form: FormGroup;
  name: string;
  songid: number;
  subtasks ;
  action : boolean ;
  panelOpenState = false;
  step : number ;
  private textPattern: any = /^[a-zA-Z0-9]+(?:[_ -]?[a-zA-Z0-9])*$/;
  constructor(
    public  listService: ListService ,
    protected snackBarService: SnackBarService,
     private fb: FormBuilder,
     private dialogRef: MatDialogRef<CreateListDialogComponent> ,
     @Inject(MAT_DIALOG_DATA) data) {
     this.songid = data.id;
     this.action = data.action;
     this.subtasks = [
      {name: 'list1', completed: false, color: 'accent'},
      {name: 'list2', completed: false, color: 'accent'},
      {name: 'lis3', completed: false, color: 'accent'}
    ];
    if ( data.action = false){
      this.step = 1;
    }else{
      this.step = 0;
    }
     }

  ngOnInit() {
    this.form = this.fb.group({
      lstName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(25), Validators.pattern(this.textPattern)]],
      lstDescription: ['',[ Validators.minLength(0), Validators.maxLength(200), Validators.pattern(this.textPattern)]]
  });
  }
  setStep(index: number) {
    this.step = index;
  }

  get lstName() { return this.form.get('lstName'); }
  get lstDescription() { return this.form.get('lstDescription'); }

  onSaveForm() {
  if (this.form.valid ) {
    const newList: ISongListModel = <ISongListModel>{
    }
    if (this.form.get('lstName').status == 'VALID') {
      newList['name_songlist'] = this.form.value.lstName;
    }
    if (this.form.get('lstDescription').status == 'VALID') {
      newList['description_songlist'] = this.form.value.lstDescription;
    }
  this.listService.insertList(newList.name_songlist, newList.description_songlist) 
   .subscribe(
    (userData: any) => {
      console.log('recibo todo ', userData);
      if (userData['data']) {
        console.log('recibo la parte de data ', userData['data']);
        console.log('nº results ', userData['data'].length);
        if (userData['code'] == 0) {
          this.snackBarService.open('Snackbar text', {
            action: 'Done',
            milliseconds: 5000,
            icon: 'check_circle',
            iconPosition: 'left'
          });
          this.dialogRef.close(this.form.value);
        } else if (userData['code'] == 1) {
          this.snackBarService.open('Snackbar text', {
            action: 'Done',
            milliseconds: 5000,
            icon: 'check_circle',
            iconPosition: 'left'
          });
        }
      }
    },
    err => {
      console.error(err)
      this.snackBarService.open('Snackbar text', {
        action: 'Done',
        milliseconds: 5000,
        icon: 'check_circle',
        iconPosition: 'left'
      });
    }
  );
}
    this.dialogRef.close(this.form.value);
    console.log('subtasks', this.subtasks)
    console.log('lstname', this.form.value)
}

close() {
    this.dialogRef.close();
}

inputChange() : boolean{
 return ( this.form.get('lstName').status == 'VALID' && this.form.get('lstDescription').status == 'VALID' ); 
}

}
