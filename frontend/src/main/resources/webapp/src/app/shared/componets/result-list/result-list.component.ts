import { Component, OnInit, Input, Inject } from '@angular/core';
import { ISongListModel } from '../../models/isongList.model';
import { LoginService, SnackBarService, DialogService } from 'ontimize-web-ngx';
import { ListService } from 'app/main/services/listService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnInit {
  loggedIn: boolean;

  @Input("dataMyList") dataMyList: ISongListModel[];
  @Input("dataRestList") dataRestList: ISongListModel[];

  homeLinkEnabled: boolean = true;
  constructor(
    @Inject(LoginService) private loginService: LoginService,
    public listService: ListService,
    protected snackBarService: SnackBarService,
    public router: Router,
    protected dialogService: DialogService
  ) {
    this.loggedIn = loginService.isLoggedIn();
  }
  ngOnInit() {
    console.log('app-result-list', this.dataMyList);
    console.log('app-result-list', this.dataRestList);
  }

  onClickOK($event) {
    $event.stopPropagation();
    this.homeLinkEnabled = false;
    console.log('click on ok button');
    this.homeLinkEnabled = true;
  }
  async onClickCloused($event, list: ISongListModel) {
    $event.stopPropagation();
    this.homeLinkEnabled = false;
    console.log('click on cloused button');
    if (this.dialogService) {
      const dialogRef = await this.dialogService.confirm('Confirm dialog title', 'Do you really want to accept?');
      console.log(dialogRef);
      if (dialogRef) {
        console.log('dialogo', this.dialogService);
        this.deleteList(list);
        this.sendRefreshSong();
        this.sendRefreshList();
      } else {
        console.log(dialogRef);
      }
    }
    this.homeLinkEnabled = true;
  }




  deleteList(list: ISongListModel) {
    this.listService.deleteList(list.id_songlist)
      .subscribe(
        (userData: any) => {
          if (userData['data']) {
            if (userData['code'] == 0) {
              this.sendRefreshList();
              this.sendRefreshSong();
              this.snackBarService.open( list.name_songlist + ' has been removed', {
                action: 'Done',
                milliseconds: 5000,
                icon: 'check_circle',
                iconPosition: 'left'
              });
            } else if (userData['code'] == 1) {
              this.snackBarService.open('Warning! ' + list.name_songlist + 'hasn´t been removed' , {
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
          this.snackBarService.open('Warning! ' + list.name_songlist + 'hasn´t been removed', {
            action: 'Error',
            milliseconds: 5000,
            icon: 'check_circle',
            iconPosition: 'left'
          });
        }
      );
  }
  onClickGrid($event, list: ISongListModel) {
    $event.stopPropagation();
    if (this.homeLinkEnabled) {
      console.log('link a --> /main/songlistdetail');
      this.router.navigate(['/main/songlistdetail', list.id_songlist]);
      // [routerLink]=['/main/songlistdetail', list.id_songlist] ;
      // [queryParams]="{id: list.id_songlist}";
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

}
