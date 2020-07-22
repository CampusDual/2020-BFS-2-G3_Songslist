import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../create-list.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackBarService } from 'ontimize-web-ngx';
import { ListService } from 'app/main/services/listService';
import { SonglistService } from 'app/main/services/songlist.service';
import { ISongListModel } from 'app/shared/models/isongList.model';
import { getMaxListeners } from 'process';
import { stringify } from 'querystring';


@Component({
  selector: 'app-create-list-dialog',
  templateUrl: './create-list-dialog.component.html',
  styleUrls: ['./create-list-dialog.component.scss']
})
export class CreateListDialogComponent implements OnInit {
  form: FormGroup;
  name: string;
  songid: number;
  subtasks: ISongListModel[];
  action: boolean;
  panelOpenState = false;
  step: number;
  list:  Array<ISongListModel>;
  private textPattern: any = /^[a-zA-Z0-9]+(?:[_ -]?[a-zA-Z0-9])*$/;
  constructor(
    public songlistService: SonglistService,
    public listService: ListService,
    protected snackBarService: SnackBarService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.songid = data.id;
    this.action = data.action;
    if (data.action = false) {
      this.step = 1;
    } else {
      this.step = 0;
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      lstName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(25), Validators.pattern(this.textPattern)]],
      lstDescription: ['', [Validators.minLength(0), Validators.maxLength(200)]]
    });
    this.songlistService.getAllSonglist('').subscribe(
      (userData: any) => {
        if (userData['data']) {
          if (userData['code'] == 0) {
            this.subtasks = userData['data'];
            this.list= this.getList( );
            console.log('list[]', this.list);
          } else if (userData['code'] == 1) {

          }
        }
      },
      err => {
        console.error(err)
        this.snackBarService.open('error', {
          action: 'Error',
          milliseconds: 5000,
          icon: 'check_circle',
          iconPosition: 'left'
        }
        );

      }
    );
  }

  setStep(index: number) {
    this.step = index;
  }

  get lstName() { return this.form.get('lstName'); }
  get lstDescription() { return this.form.get('lstDescription'); }

  onSaveForm() {
    if (this.form.valid) {
      const newList: ISongListModel = <ISongListModel>{
      }
      if (this.form.get('lstName').status == 'VALID') {
        newList['name_songlist'] = this.form.value.lstName;
      }
      if (this.form.get('lstDescription').status == 'VALID') {
        newList['description_songlist'] = this.form.value.lstDescription;
      }
      (this.songid)? this.insertSongToACreateList(newList) : this.createLIst(newList);
    }
  }

  close() {
    this.dialogRef.close();
  }

  inputChange(): boolean {
    return (this.form.get('lstName').status == 'VALID' && this.form.get('lstDescription').status == 'VALID');
  }
  setcheked(isCheck: boolean, subtask: ISongListModel) {
    if (isCheck) {
      subtask.checked = !subtask.checked;
    } else {
      subtask.checked = !subtask.checked;
    }
    if (isCheck && subtask.checked) {
      this.insertSongToALIst(subtask);
      this.sendRefreshList();
      this.sendRefreshSong();
    }

    else if (!isCheck && !subtask.checked) {
     this.deleteSongToALIst(subtask);
      this.sendRefreshList();
      this.sendRefreshSong();
    }
    if (!isCheck && subtask.checked){
      console.log('!isCheck && subtask.checked --> ', !isCheck && subtask.checked);
      console.log('subtask.checked --> ', subtask.checked);
      console.log('!isCheck  --> ', isCheck )
      
    }
    if (isCheck && !subtask.checked){
      console.log('isCheck && !subtask.checked --> ', isCheck && !subtask.checked);
      console.log('!subtask.checked --> ', subtask.checked);
      console.log('isCheck  --> ', isCheck )
    }

  }
  sendRefreshSong(): void {
    // send message to subscribers via observable subject
    console.log('sendRefresh => song');
    this.listService.sendRefresh('song');
  }
  sendRefreshList(): void {
    // send message to subscribers via observable subject
    console.log('sendRefresh => list');
    this.listService.sendRefresh('list');
  }
  sendRefreshAlbum(): void {
    // send message to subscribers via observable subject
    console.log('sendRefresh => album');
    this.listService.sendRefresh('album');
  }
  sendRefreshAll(): void {
    // send message to subscribers via observable subject
    console.log('sendRefresh => all');
    this.listService.sendRefresh('all');
  }

  clearMessages(): void {
    // clear messages
    this.listService.clearMessages();
  }


  insertSongToALIst(subtask: ISongListModel) {
    this.listService.addSong(this.songid, subtask.name_songlist)
      .subscribe(
        (userData: any) => {
          if (userData['data']) {
            if (userData['code'] == 0) {
              this.sendRefreshList();
              this.sendRefreshSong();
              this.snackBarService.open('se ha añadido la cancion a ' + subtask.name_songlist, {
                action: 'Done',
                milliseconds: 5000,
                icon: 'check_circle',
                iconPosition: 'left'
              });
            } else if (userData['code'] == 1) {
              this.snackBarService.open('warning  no se ha añadido la cancion a ' + subtask.name_songlist, {
                action: 'Warning',
                milliseconds: 5000,
                icon: 'check_circle',
                iconPosition: 'left'
              });
            }
          }
        },
        err => {
          console.error(err)
          this.snackBarService.open('error  no se ha añadido la cancion a ' + subtask.name_songlist, {
            action: 'Error',
            milliseconds: 5000,
            icon: 'check_circle',
            iconPosition: 'left'
          });
        }
      );
  }
  deleteSongToALIst(subtask: ISongListModel) {
    this.listService.deleteSong(this.songid, subtask.name_songlist )
      .subscribe(
        (userData: any) => {
          if (userData['data']) {
            if (userData['code'] == 0) {
              this.sendRefreshList();
              this.sendRefreshSong();
              this.snackBarService.open('se ha eliminado la cancion a ' + subtask.name_songlist, {
                action: 'Done',
                milliseconds: 5000,
                icon: 'check_circle',
                iconPosition: 'left'
              });
            } else if (userData['code'] == 1) {
              this.snackBarService.open('warning  no se ha añadido la cancion a ' + subtask.name_songlist, {
                action: 'Warning',
                milliseconds: 5000,
                icon: 'check_circle',
                iconPosition: 'left'
              });
            }
          }
        },
        err => {
          console.error(err)
          this.snackBarService.open('error  no se ha añadido la cancion a ' + subtask.name_songlist, {
            action: 'Error',
            milliseconds: 5000,
            icon: 'check_circle',
            iconPosition: 'left'
          });
        }
      );
  }

  insertSongToACreateList(newList) {
    this.listService.insertList(newList.name_songlist, newList.description_songlist)
      .subscribe(
        (userData: any) => {
          if (userData['data']) {
            if (userData['code'] == 0) {
              this.snackBarService.open('se ha creado la lista ' + newList.name_songlist, {
                action: 'Done',
                milliseconds: 5000,
                icon: 'check_circle',
                iconPosition: 'left'
              });
              this.listService.addSong(this.songid, newList.name_songlist)
                .subscribe(
                  (userData: any) => {
                    if (userData['data']) {
                      if (userData['code'] == 0) {
                        this.sendRefreshList();
                        this.sendRefreshSong();
                        this.snackBarService.open('se ha añadido la cancion a ' + newList.name_songlist, {
                          action: 'Done',
                          milliseconds: 5000,
                          icon: 'check_circle',
                          iconPosition: 'left'
                        });
                        this.dialogRef.close(this.form.value);
                      } else if (userData['code'] == 1) {
                        this.snackBarService.open('warning  no se ha añadido la cancion a ' + newList.name_songlist, {
                          action: 'Warning',
                          milliseconds: 5000,
                          icon: 'check_circle',
                          iconPosition: 'left'
                        });
                      }
                    }
                  },
                  err => {
                    console.error(err)
                    this.snackBarService.open('error  no se ha añadido la cancion a ' + newList.name_songlist, {
                      action: 'Error',
                      milliseconds: 5000,
                      icon: 'check_circle',
                      iconPosition: 'left'
                    });
                  }
                );
              this.dialogRef.close(this.form.value);
            } else if (userData['code'] == 1) {
              this.snackBarService.open('warning no se ha creado la lista ' + newList.name_songlist,, {
                action: 'Warning',
                milliseconds: 5000,
                icon: 'check_circle',
                iconPosition: 'left'
              });
            }
          }
        },
        err => {
          console.error(err)
          this.snackBarService.open('error  no se ha creado la lista ' + newList.name_songlist, {
            action: 'Error',
            milliseconds: 5000,
            icon: 'check_circle',
            iconPosition: 'left'
          });
        }
      );
  }
  createLIst(newList){
    this.listService.insertList(newList.name_songlist, newList.description_songlist)
    .subscribe(
      (userData: any) => {
        if (userData['data']) {
          if (userData['code'] == 0) {
            this.sendRefreshList();
            this.sendRefreshSong();
            this.snackBarService.open('se ha creado la lista ' + newList.name_songlist, {
              action: 'Done',
              milliseconds: 5000,
              icon: 'check_circle',
              iconPosition: 'left'
            });
            this.dialogRef.close(this.form.value);
          } else if (userData['code'] == 1) {
            this.snackBarService.open('warning no se ha creado la lista ' + newList.name_songlist, {
              action: 'Warning',
              milliseconds: 5000,
              icon: 'check_circle',
              iconPosition: 'left'
            });
          }
        }
      },
      err => {
        console.error(err)
        this.snackBarService.open('error  no se ha creado la lista ' + newList.name_songlist, {
          action: 'Error',
          milliseconds: 5000,
          icon: 'check_circle',
          iconPosition: 'left'
        });
      }
    );
}


  getList(): ISongListModel[] {
    console.log('songid =>', this.songid)
    this.listService.getListIncludingSong(this.songid)
      .subscribe(
        (songListData: any) => {
          console.log('{ getList()}___songListData[\'data\']', songListData['data']);
          if (songListData['data']) {
            console.log('getList()}___songListData[\'code\']', songListData['code']);

            if (songListData['code'] == 0) {
              console.log('getList()}___songListData[\'data\'].length', songListData['data'].length);
              if (songListData['data'].length) {
                if (songListData['data'].length > 0) {
                  this.list = songListData['data'];
                  console.log('start list == >', this.list);
                  this.subtasks.forEach(t => {
                    let songInList: boolean = false;
                    this.list.forEach(c =>{
                      if (c.name_songlist == t.name_songlist){
                        songInList = true;
                      }
                      });
                    t.checked = songInList ? true : false;
                    console.log('t.name_songlist',t.name_songlist);
                    console.log('this.list',this.list);
                    console.log('this.list',this.list);
                    console.log('this.list.includes(t.name_songlist)',this.list.forEach(c =>{c.name_songlist == t.name_songlist}));
                  });
                  console.log('resultados mis listas ', this.subtasks);
                  return this.list;
                }
              }
            } else if (songListData['code'] == 1) {
              this.subtasks.forEach(t => t.checked =  false);
              return null;
            }
          }
          return null;

        },
        err => {
          console.error(err)
          this.subtasks.forEach(t => t.checked =  false);
          return null;
        }
      );
      return null;
  }
}
