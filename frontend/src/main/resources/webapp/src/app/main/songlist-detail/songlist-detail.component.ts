import { Component, OnInit } from '@angular/core';
import { ISonglistDetailModel } from 'app/shared/models/isonglistDetailModel';
import { ActivatedRoute, Params } from '@angular/router';
import { SonglistService } from '../services/songlist.service';

@Component({
  selector: 'app-songlist-detail',
  templateUrl: './songlist-detail.component.html',
  styleUrls: ['./songlist-detail.component.scss']
})
export class SonglistDetailComponent implements OnInit {

  public parametro: any;
  public listResult : ISonglistDetailModel;
  constructor(
    private _route: ActivatedRoute,
    private songlistService: SonglistService
    ) { }

  ngOnInit() {
    this._route.params.forEach((params: Params) => {
      this.parametro = params['id'];

    });
    this.ngOnStartDetail(this.parametro);
  }
  ngOnStartDetail(id: number){
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
    console.log('LISTA DE CANCIONES = ', this.listResult);
  }
  getlistResult() {
    console.log('get LISTA DE CANCIONES = ', this.listResult);
    return this.listResult;
  }


}
