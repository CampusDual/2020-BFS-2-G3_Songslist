import { Component, OnInit } from '@angular/core';
import { ISonglistDetailModel } from 'app/shared/models/isonglistDetailModel';
import { ActivatedRoute, Params } from '@angular/router';
import { SonglistService } from '../services/songlist.service';
import { Subscription } from 'rxjs';
import { ListService } from '../services/listService';

@Component({
  selector: 'app-songlist-detail',
  templateUrl: './songlist-detail.component.html',
  styleUrls: ['./songlist-detail.component.scss']
})
export class SonglistDetailComponent implements OnInit {
  public refreshSubscription: Subscription;

  public parametro: any;
  public refreshMessages: any[] = [];
  public songListResult: ISonglistDetailModel;
  public listResult: ISonglistDetailModel[];
  private option: boolean = true;
  constructor(
    private _route: ActivatedRoute,
    private songlistService: SonglistService,
    private listService: ListService
  ) { }

  ngOnInit() {
    this._route.params.forEach((params: Params) => {
      this.parametro = params['id'];
    });
    this.refreshSubscription = this.listService.getRefresh().subscribe(message => {
      if (message) {
        if (message.refresh) {
          if (message.refresh == "song" || message.refresh == 'list'|| message.refresh == "all") {
            this.refreshMessages.push(message);    
            
          } else {
            // clear messages when empty message received
            this.refreshMessages = [];
          }
        }
      }
    });

    this.ngOnStartList(this.parametro);
    this.ngOnStartDetail(this.parametro);
  }
  ngOnStartDetail(id: number) {
    this.songlistService.getSongs(id).subscribe(
      (songlistData: any) => {
        if (songlistData['data'].length > 0) {
          this.listResult = songlistData['data'];
        } else {
          this.listResult = null;
        }
      },
      err => console.error(err)
    );
  }
  ngOnStartList(id: number) {
    console.log('cargando lista', id);
    this.songlistService.getSonglist(id).subscribe(
      (sl: any) => {
        console.log('StartList data', sl['data']);
        if (sl['data']) {
          console.log('StartList data lenght', sl['data'].length);
          if (sl['data'].length > 0) {
            console.log('StartList data array', sl['data'][0]);
            this.songListResult = sl['data'][0];
          } else { // si la búsqueda no devuelve resultados.
            this.songListResult = null;
          }
        }
      },
      err => console.error(err) // en caso de error.
    );
  }

  getlistResult() {
    return this.listResult;
  }
}
