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

@Component({
  selector: 'app-songlist',
  templateUrl: './songlist.component.html',
  styleUrls: ['./songlist.component.scss']
})
export class SonglistComponent implements OnInit {

  private resultados: ISongListModel[];
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
    private listService: ListService,
    private dialogService: DialogService
  ) { }

  ngOnInit(
  ) {
    this.cleanSearch();
    this.owner ? this.loadMySonglists() : this.loadSonglists();

  }

  cleanSearch() {
    this.inputSearch("List", "");
  }

  /*
  Método que llama a un servicio para consultar las listas de canciones del usuario logueado.
  */
  loadMySonglists() {
    this.songlistService.getAllSonglist(this.searchText).subscribe(
      (sl: any) => {
        if (sl['data']) {
          if (sl['data'].length > 0) {
            this.owner = true;
            this.resultados = sl['data'];
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
    this.songlistService.getPublicSonglist(this.searchText).subscribe(
      (sl: any) => {
        if (sl['data']) {
          if (sl['data'].length > 0) {
            this.owner = false;
            this.resultados = null;
            this.resultados = sl['data'];
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


  inputSearch(radioSelected: string, searchText: string) {
    this.songlistService.getPublicSonglist(searchText).subscribe(
      (x: any) => {
        if (x['data']) {
          if (x['data'].length > 0) {
            this.resultados = x['data'];
            const myData = JSON.parse(localStorage.getItem(CONFIG.uuid));
            myData['search'] = { radioSelect: this.radioSelected, searchText: this.searchText };
            localStorage.setItem(CONFIG.uuid, JSON.stringify(myData));
          } else {
            this.resultados = Array();
          }
        }
      },
      err => console.error(err)
    );
  }

  onClickRadio(radio: MatRadioChange) {
    this.radioSelected = radio.value;
    console.log("radio = ", radio.value);
    console.log("RadioSelected", this.radioSelected)
    this.stringValidate();
    this.inputSearch(this.radioSelected, this.searchText);
  }

  onItemChange($event) {
    this.searchText = $event;
    this.stringValidate();
    this.inputSearch(this.radioSelected, this.searchText);

  }

  search(radioSelected: string, searchText: string) {
    if (radioSelected == "MyList") { this.loadMySonglists(); }
    if (radioSelected == "List") { this.loadSonglists(); }
  }
}
