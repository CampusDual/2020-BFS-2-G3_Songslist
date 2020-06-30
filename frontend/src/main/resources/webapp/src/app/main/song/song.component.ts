import { Component, OnInit } from '@angular/core';
import { SongService } from '../services/song.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ISongModule } from 'app/shared/models/isong.model';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {

  constructor(
    private songService: SongService,
    private _route: ActivatedRoute,
    private songResult: ISongModule
  ) { }
  ngOnInit() {
    console.log(this._route.snapshot.params);
    this._route.params.subscribe(
      (params: Params) => {
        console.log('paramtros recibidos', params);
        let id = params.id;
        console.log('parametro recogido ', params.id);
        this.ngOnStartSong(id);
      }
    );
    //  this.start(12);
  }
  ngOnStartSong(id: number) {
    // this.id = 12;
    this.songService.getFileSongData(id).subscribe(
      (songData: any) => {
        console.log('recibo todo ', songData);
        if (songData['data']) {
          console.log('recibo la parte de data ', songData['data'][0]);
          console.log('nº results ', songData['data'].length);
          if (songData['data'].length > 0) {
            console.log('recibo todo ', songData);
            this.songResult = songData['data'][0];
            console.log('igualo la parte de data a mi variable y la muestro ', this.songResult);
          } else {
            this.songResult = null;
          }
        }
      },
      err => console.error(err)
    );
  }
  getSearchSong() {
    return JSON.parse(localStorage.getItem('Home_searchSong'));
  }
}
