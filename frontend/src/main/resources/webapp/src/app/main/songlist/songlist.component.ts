import { Component, OnInit } from '@angular/core';
import { ISonglistModel} from 'app/shared/models/isonglistmodel';
import { SonglistService } from '../services/songlist.service';
import { ListService } from '../services/listService';
import { ISongModel } from 'app/shared/models/isong.model';
import { DialogService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-songlist',
  templateUrl: './songlist.component.html',
  styleUrls: ['./songlist.component.scss']
})
export class SonglistComponent implements OnInit {

  public songlistResult: ISonglistModel;
  public img : number;

  constructor(
    private songlistService: SonglistService,
    private listService: ListService,
    private dialogService: DialogService
  ) { }

  ngOnInit(  
  ) {
    this.loadMySonglists();
  }

  loadMySonglists(){
    this.songlistService.getAllSonglist().subscribe(
      (sl: any) => {
          if (sl['data']) {

              if (sl['data'].length > 0) {

                  this.songlistResult = sl['data'];

              } else {
                  this.songlistResult = null;
              }
          }
      },
      err => console.error(err)

  );
  console.log('fuera del subscribe', this.songlistResult);

  }



  getResult(){
    return this.songlistResult;
  }




}
