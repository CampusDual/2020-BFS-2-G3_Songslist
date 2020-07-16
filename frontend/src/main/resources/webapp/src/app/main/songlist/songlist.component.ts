import { Component, OnInit } from '@angular/core';

import { SonglistService } from '../services/songlist.service';
import { ListService } from '../services/listService';
import { ISongModel } from 'app/shared/models/isong.model';
import { DialogService } from 'ontimize-web-ngx';
import { ISongListModel } from 'app/shared/models/isongList.model';
import { load } from '@angular/core/src/render3/instructions';
import { Router, RouterLink } from '@angular/router';
import { ISonglistDetailModel} from 'app/shared/models/isonglistDetailModel';

@Component({
  selector: 'app-songlist',
  templateUrl: './songlist.component.html',
  styleUrls: ['./songlist.component.scss']
})
export class SonglistComponent implements OnInit {

  private resultados: ISongListModel[];
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
          for (var i: number; i < this.resultados.length; i++){
            var aux = this.getData(this.resultados[i].id_songlist);
            this.resultados[i].img = aux[0].img_album? aux[0].img_album : 0;
            this.resultados[i].numSongs = aux.length;
          }

          } else { // si la búsqueda no devuelve resultados.
            this.resultados = null;
          }
        }
      },
      err => console.error(err) // en caso de error.
    );
 
  }
  getData(id: number):Array<ISonglistDetailModel>{
    var result : Array<ISonglistDetailModel>;
    this.songlistService.getSongs(id).subscribe(
      (songlistData: any) => {
        if (songlistData['data'].length > 0) {
          result = songlistData['data'];
        }
      },
      err => console.error(err)
    );
    return result;
  }

  getResult(){
    return this.resultados;
  }


  openList(id: number){
    var urlList : string = 'main/songlistdetail/'+id;
    window.open(urlList, "_self");
  }  
}
