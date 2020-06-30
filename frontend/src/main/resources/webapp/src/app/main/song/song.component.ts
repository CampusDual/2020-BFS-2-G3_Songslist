import { Component, OnInit } from '@angular/core';
import { ISongModel } from 'app/shared/models/isong.model';
import { ActivatedRoute, Params } from '@angular/router';
import { SongService } from '../services/song.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {

  public parametro: any;
  public songResult: ISongModel;

  constructor(

    private _route: ActivatedRoute,
    //private _router: Route,
    private songService: SongService
  ) { }

  ngOnInit() {
    this._route.params.forEach((params: Params) => {
      this.parametro = params['id'];

    });
    this.ngOnStartSong(this.parametro);
  }

  ngOnStartSong(id: number) {

    this.songService.getSongData(id).subscribe(

      (songData: any) => {

        if (songData['data']) {

          if (songData['data'].length > 0) {

            this.songResult = songData['data'][0];
            console.log('DATA', songData['data'])
            console.log('SONGRESULT  ', this.songResult.name_song);

          } else {
            this.songResult = null;
          }
        }
      },
      err => console.error(err)
    );
    console.log('fuera del subscribe', this.songResult);
  }

}
