import { Component, OnInit } from '@angular/core';
import { SongService } from '../services/song.service';
import { IDataSongModule } from 'app/shared/models/idataSong.model';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {
  song: IDataSongModule = null;
  id: number;
  constructor(
    private songService: SongService,
    private rutaActiva: ActivatedRoute // recivir parametro id

  ) { }

  ngOnInit() {
    
    console.log(this.rutaActiva.snapshot.params);
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        console.log('paramtros recibidos' ,params);
        this.id = params.id;
        console.log('parametro recogido ',params.id);
        this.start(this.id);
      }
    );
    
  //  this.start(12);
   

  }
  start(id : number) {
   // this.id = 12;
    this.songService.getFileSongData(id).subscribe(
      (x: any) => {
        console.log('recibo todo ', x);
        if (x['data']) {
          console.log('recibo la parte de data ', x['data']);
          console.log('nº results ', x['data'].length);
          if (x['data'].length > 0) {
            console.log('recibo todo ', x);
            this.song = x['data'];
            console.log('igualo la parte de data a mi variable y la muestro ', this.song);
          } else {
            this.song = null;
          }
        }
      },
      err => console.error(err)

    );
  }
  getSearchSong(){
    return   JSON.parse(localStorage.getItem('Home_searchSong'));
  }
}
