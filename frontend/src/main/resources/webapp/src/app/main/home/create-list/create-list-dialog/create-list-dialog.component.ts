import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../create-list.component';
import { FormBuilder, FormGroup } from '@angular/forms';


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
  panelOpenState = false;
  constructor(
     private fb: FormBuilder,
     private dialogRef: MatDialogRef<CreateListDialogComponent> ,
     @Inject(MAT_DIALOG_DATA) data) {
     this.name = data.name;
     this.songid = data.id;
     this.subtasks = [
      {name: 'list1', completed: false, color: 'accent'},
      {name: 'list2', completed: false, color: 'accent'},
      {name: 'lis3', completed: false, color: 'accent'}
    ];
     }

  ngOnInit() {
    this.form = this.fb.group({
      lstname: [this.name, []],
  });
  }

save() {
    this.dialogRef.close(this.form.value);
    console.log('subtasks', this.subtasks)
    console.log('lstname', this.form.value)
}

close() {
    this.dialogRef.close();
}

}
