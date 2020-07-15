import { Component, OnInit } from '@angular/core';

import { SonglistService } from '../services/songlist.service';
import { ListService } from '../services/listService';
import { ISongModel } from 'app/shared/models/isong.model';
import { DialogService } from 'ontimize-web-ngx';
import { ISongListModel } from 'app/shared/models/isongList.model';
import { load } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-songlist',
  templateUrl: './songlist.component.html',
  styleUrls: ['./songlist.component.scss']
})
export class SonglistComponent implements OnInit {

  private resultados: ISongListModel;
  private img: number = 0;
  private numSongs : number = 0;

  constructor(
    private songlistService: SonglistService,
    private listService: ListService,
    private dialogService: DialogService
  ) { }

  ngOnInit(
  ) {
    this.loadMySonglists();
  }

  /*
  Método que llama a un servicio para consultar las listas de canciones del usuario logueado.
  */
  loadMySonglists() {
    this.songlistService.getAllSonglist().subscribe(
      (sl: any) => {
        if (sl['data']) {
          if (sl['data'].length > 0) { 
            this.resultados = sl['data'];
            console.log("RESULTADOS DENTRO DEL IF = ", this.resultados);
            console.log("IDs= ", this.resultados.id_songlist);

          } else { // si la búsqueda no devuelve resultados.
            this.resultados = null;
          }
        }
      },
      err => console.error(err) // en caso de error.
    );
 
  }
  getAnotherData(id:number){
    this.songlistService.getSongs(id).subscribe(
      (sl: any) => {
        if (sl['data']) {
          if (sl['data'].length > 0) { 
            this.img = sl['data'][0].img_album;
            this.numSongs = sl['data'].length;
            console.log("RESULTADOS DENTRO DEL 2ªIF = ", this.resultados);
          } else { // si la búsqueda no devuelve resultados.
            this.resultados = null;
          }
        }
      },
      err => console.error(err) // en caso de error.
    );

  }

  getImage(id: number){
    console.log('IMAGEN = ', this.img)
    return this.img;
  }
  getCountSongs(id: number){
    return this.numSongs;

  }
  getResult(){
    return this.resultados;

  }

  
}
