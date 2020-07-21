import { Component, OnInit, OnDestroy, Renderer2, ViewChild } from '@angular/core';

import { SonglistService } from '../services/songlist.service';
import { ListService } from '../services/listService';
import { ISongModel } from 'app/shared/models/isong.model';
import { DialogService } from 'ontimize-web-ngx';
import { ISongListModel } from 'app/shared/models/isongList.model';
import { load } from '@angular/core/src/render3/instructions';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ISonglistDetailModel } from 'app/shared/models/isonglistDetailModel';
import { MatRadioChange, MatTableDataSource, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';
import { CONFIG } from 'app/app.config';
import { ToolsService } from '../services/tools.service';

@Component({
  selector: 'app-songlist',
  templateUrl: './songlist.component.html',
  styleUrls: ['./songlist.component.scss']
})
export class SonglistComponent implements OnInit {
  private dataRest : ISongListModel[];
  private resultados: ISongListModel[];
  private MyList : ISongListModel[];
  private img: number = 0;
  private numSongs: number = 0;
  owner: boolean;
  selectOptions: string[] = ['MyList', 'List'];
  radioSelected: string;
  searchText: string = '';
  filtering: boolean = false;
  mnjError: string;
  private dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private renderer: Renderer2,
    private _route: ActivatedRoute,
    private songlistService: SonglistService,
    private toolsService :ToolsService,
    private listService: ListService,
    private dialogService: DialogService
  ) { }

  ngOnInit(
  ) {
    this.search();
  }


  search(searchText? : string){
     (searchText)?   this.loadSonglistOwnerId(searchText) : this.loadSonglistOwnerId();
  }
  /*
  Método que llama a un servicio para consultar las listas de canciones del usuario logueado.
  */
  loadSonglistOwnerId(searchText? : string) {
    this.listService.getSonglistOwnerId().subscribe(
      (sl: any) => {
        if (sl['data']) {
          if (sl['data'].length > 0) {
            this.owner = true;
            this.MyList = sl['data'];
            console.log('loadSonglistOwnerId  variables vacias ');
            console.log('loadSonglistOwnerId variables vacias MyList',this.MyList);
            (searchText)?  this.loadSonglists(searchText) : this.loadSonglists();
          } else { // si la búsqueda no devuelve resultados.
            this.resultados = null;
          }
        }
      },
      err => console.error(err) // en caso de error.
    );
  }

  loadSonglists(searchtext? : string) {
    let a : boolean = false;
    console.log('_____operation List_______');
   let  f = searchtext ? this.songlistService.getPublicSonglist(searchtext) : this.songlistService.getPublicSonglist() ;
   f.subscribe(
      (sl: any) => {
        if (sl['data']) {
          console.log('llega a data ',sl['data']);
          if (sl['data'].length > 0) {
            this.owner = false;
            this.resultados = null;
            this.resultados = sl['data'];
            console.log('loadSonglists  variables vacias ');
            console.log('loadSonglists  variables vacias resultados ', this.resultados );
            console.log('loadSonglists variables vacias MyList', this.MyList);
            if (this.resultados && this.MyList){
            this.resultados.forEach( t => {
              //t.owner = (t.nick_user == this.toolsService.getNickUser()) ? true : false;
                  this.MyList.forEach( c => {
                    if (t.id_songlist == c.id_songlist){
                      a = true;
                    }
                  });
                  t.owner = a ? true : false;
                  a = false;
            });
            this.dataRest = this.resultados;
            console.log('app-songlist   cargado dataRes',this.dataRest);
          }else {
            console.log('loadSonglists  variables vacias ');
            console.log('loadSonglists  variables vacias resultados ',this.resultados );
            console.log('loadSonglists variables vacias MyList',this.MyList);
            console.log('loadSonglists variables vacias dataRest', this.dataRest);
          }

          } else { // si la búsqueda no devuelve resultados.
            this.resultados = null;
          }
        }
      },
      err => console.error(err) // en caso de error.
    );
  }
  getResult() {
    return this.resultados;
  }
  stringValidate() { // take al words legth >3
    let words: string[] = this.searchText.trim().split(' ');
    let wordToFind: string[] = new Array();
    for (let word of words) {
      let trimword = word.trim();
      if (trimword.length >= 3) {
        wordToFind.push(trimword);
        this.filtering = true;
      }
      else {
        this.filtering = false

      }
    }
    if (this.filtering && wordToFind) {
      this.searchText = wordToFind.join(' ');
    } else {
      this.searchText = '';
    }

  }




  onItemChange($event) {
    this.searchText = $event;
    this.stringValidate();
    this.search( this.searchText);

  }

}
