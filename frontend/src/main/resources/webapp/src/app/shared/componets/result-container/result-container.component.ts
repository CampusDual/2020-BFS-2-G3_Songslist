import { Component, OnInit, ViewChild, Input, Inject, OnChanges } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { ISongModel } from 'app/shared/models/isong.model';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService, DialogService, SnackBarService } from 'ontimize-web-ngx';
import { IAlbumModel } from 'app/shared/models/ialbum.model';
import { ListService } from 'app/main/services/listService';
import { ISongListModel } from 'app/shared/models/isongList.model';


@Component({
  selector: 'app-result-container',
  templateUrl: './result-container.component.html',
  styleUrls: ['./result-container.component.scss']
})
export class ResultContainerComponent implements  OnChanges{
  selection = new SelectionModel<ISongModel>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input("data") data: ISongModel[];
  @Input("dataAlbums") dataAlbums: IAlbumModel[];
  @Input("songlistData") songlistData: ISongListModel;
  dataSource;
  newSongs;
  loggedIn: boolean;
  songsColums: Array<string>;
  constructor(
    private snackBarService : SnackBarService,
    private dialogService: DialogService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private _route: ActivatedRoute, // recivir parametro id
    @Inject(LoginService) private loginService: LoginService,
    private listService : ListService
  ) { }

  ngOnChanges() {

    this.loggedIn = this.loginService.isLoggedIn();
    if (this.data) {
      this.songsColums = this.loggedIn ? [/*'select',*/'Img', 'Song', 'Album', 'Artist', 'Genre', 'Action'] : [/*'select',*/'Img', 'Song', 'Album', 'Artist', 'Genre'];
      this.dataSource = new MatTableDataSource<ISongModel>(this.data);
      this.dataSource.paginator = this.paginator;
      console.log("INIT DATA", this.data);
      console.log("INIT DATASOURCE", this.dataSource);

    }
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  navigate() {
    this.router.navigate(['../', 'login'], { relativeTo: this.actRoute });
  }
  getNewSongs() {
    console.log('return this.dataSongs ==> ', this.newSongs);
    return this.newSongs;
  }
  openDeleteSong(delData: ISongModel){
    if (this.dialogService) {
      const dialogRef  = this.dialogService.confirm('Confirm dialog title', 'Do you really want to accept?');
      // dialogRef.afterClosed().subscribe(result => {
      //   console.log(`Dialog result: ${result}`);
      // });
     console.log('dialogo', this.dialogService);
     this.deleteSongInList(delData );
      this.sendRefreshSong();
      this.sendRefreshList();
    }
  }
  deleteSongInList(delData : ISongModel){
    this.listService.deleteSong(delData.id_song, this.songlistData.name_songlist )
    .subscribe(
      (userData: any) => {
        if (userData['data']) {
          if (userData['code'] == 0) {
            this.sendRefreshList();
            this.sendRefreshSong();
            this.snackBarService.open('se ha eliminado la cancion a ' + delData.name_song, {
              action: 'Done',
              milliseconds: 5000,
              icon: 'check_circle',
              iconPosition: 'left'
            });
          } else if (userData['code'] == 1) {
            this.snackBarService.open('warning  no se ha eliminado la cancion a ' + delData.name_song, {
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
        this.snackBarService.open('error  no se ha eliminiado la cancion a ' + delData.name_song, {
          action: 'Error',
          milliseconds: 5000,
          icon: 'check_circle',
          iconPosition: 'left'
        });
      }
    );
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
}
