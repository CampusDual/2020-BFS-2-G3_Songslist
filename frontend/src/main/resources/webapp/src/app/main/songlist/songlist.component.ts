import { Component, OnInit } from '@angular/core';
import { ISonglistModel} from 'app/shared/models/isonglistmodel';
import { SonglistService } from '../services/songlist.service';
import { ISongModel } from 'app/shared/models/isong.model';

@Component({
  selector: 'app-songlist',
  templateUrl: './songlist.component.html',
  styleUrls: ['./songlist.component.scss']
})
export class SonglistComponent implements OnInit {

  public songlistResult: ISonglistModel;
  public songResult: ISongModel;

  constructor(
    private songlistService: SonglistService
  ) { }

  ngOnInit(  
  ) {
    this.loadMySonglists();
  }

  loadMySonglists(){

    this.songlistService.getAllSonglist().subscribe(

      (songlist: any) => {

          if (songlist['data']) {

              if (songlist['data'].length > 0) {

                  this.songlistResult = songlist['data'];
                  console.log('DATA SONGLIST ', songlist['data']);
                  console.log('SONGLIST ', this.songlistResult);

              } else {
                  this.songlistResult = null;
              }
          }
      },
      err => console.error(err)

  );
  console.log('fuera del subscribe', this.songlistResult);

  }

  loadSongs(id: number){
    this.songlistService.getSongs(id).subscribe(
      (songs: any) => {
          if (songs['data']) {
              if (songs['data'].length > 0) {
                  this.songResult = songs['data'];
                  console.log('DATA SONGLIST ', songs['data']);
                  console.log('SONGLIST ', this.songResult);
              } else {
                  this.songResult = null;              }
          }
      },
      err => console.error(err)
  );
  console.log('fuera del subscribe', this.songResult);
  }
  getResult(){
    return this.songlistResult;
  }
  getSongs(){
    return this.songResult;
  }


}
