import { Component, OnInit, OnDestroy } from '@angular/core';

import { SonglistService } from '../services/songlist.service';
import { ListService } from '../services/listService';
import { ISongModel } from 'app/shared/models/isong.model';
import { DialogService } from 'ontimize-web-ngx';
import { ISongListModel } from 'app/shared/models/isongList.model';
import { load } from '@angular/core/src/render3/instructions';
import { Router, RouterLink } from '@angular/router';
import { ISonglistDetailModel } from 'app/shared/models/isonglistDetailModel';
import { MatRadioChange } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-songlist',
  templateUrl: './songlist.component.html',
  styleUrls: ['./songlist.component.scss']
})
export class SonglistComponent implements OnInit{

  private resultados: ISongListModel[];
  private img: number = 0;
  private numSongs: number = 0;
  owner: boolean;
  selectOptions: string[] = ['MyList', 'List'];
  radioSelected: string;
  searchText: string = '';
  error: boolean;
  mnjError: string;
  constructor(
    private songlistService: SonglistService,
    private listService: ListService,
    private dialogService: DialogService
  ) { }

  ngOnInit(
  ) {
    console.log("Valor owner en constructor", this.owner);
    this.owner ? this.loadMySonglists() : this.loadSonglists();
    
  }

  /*
  Método que llama a un servicio para consultar las listas de canciones del usuario logueado.
  */
  loadMySonglists() {
    console.log('_____operation MyList_______');
    this.songlistService.getAllSonglist().subscribe(
      (sl: any) => {
        if (sl['data']) {
          if (sl['data'].length > 0) {
            console.log('DATA = ', sl['data']);
            this.owner = true;
            this.resultados = sl['data'];
            console.log("resultados mis listas", this.resultados);
            console.log('valor owner', this.owner);
          } else { // si la búsqueda no devuelve resultados.
            this.resultados = null;
          }
        }
      },
      err => console.error(err) // en caso de error.
    );
  }

  loadSonglists() {
    console.log('_____operation List_______');
    this.songlistService.getPublicSonglist().subscribe(
      (sl: any) => {
        if (sl['data']) {
          if (sl['data'].length > 0) {
            console.log('DATA = ', sl['data']);
            this.owner = false;
            this.resultados = null;
            this.resultados = sl['data'];
            console.log("resultados listas publicas", this.resultados);
            console.log('valor owner', this.owner);
          } else { // si la búsqueda no devuelve resultados.
            this.resultados = null;
          }
        }
      },
      err => console.error(err) // en caso de error.
    );
  }
  getResult() {
    console.log('RESULTADOS = ', this.resultados);
    return this.resultados;
  }
  stringValidate() { // take al words legth >3
    let words: string[] = this.searchText.trim().split(' ');
    console.log(words);
    let wordToFind: string[] = new Array();
    let a = false;
    for (let word of words) {
      console.log('cada letra : ' + word);
      let trimword = word.trim();
      console.log('condicion letra : ' + trimword.length);
      console.log('letra aplicando trim : ' + trimword);
      if (trimword.length >= 3) {
        console.log(trimword);
        console.log(wordToFind);
        wordToFind.push(trimword);
        a = true;
      } else if (trimword.length == 0) {
        a = true;
      }
    }
    if (!a) {
      this.mnjError = `ERROR`;

    } else {
      this.mnjError = '';
    }
    if (wordToFind) {
      this.searchText = wordToFind.join(' ');
    }
  }

  onClickRadio(mrChange: MatRadioChange) {
    console.log('event  radioSelected is : ', mrChange.value);
    this.radioSelected = mrChange.value;
    this.stringValidate();
    console.log(' radioSelected is : ', this.radioSelected);
    this.search(this.radioSelected, this.searchText);
  }

  onItemChange($event) {
    this.searchText = $event;
    this.stringValidate();
    if (this.searchText.length > 2) {
      this.search(this.radioSelected, this.searchText);
      console.log(' searchText is : ', this.searchText);
    }
  }

  getOwner

  search(radioSelected: string, searchText: string) {
    if (radioSelected == "MyList") { this.loadMySonglists(); }
    if (radioSelected == "List") { this.loadSonglists(); }
  }
}
