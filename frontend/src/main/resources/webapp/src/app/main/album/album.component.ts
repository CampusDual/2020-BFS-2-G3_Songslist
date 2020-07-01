import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute, Params } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';
import { AlbumService } from '../services/album.service';
import { IAlbumModel } from 'app/shared/models/ialbum.model';
import { ISongModel } from 'app/shared/models/isong.model';

@Component({
    selector: 'app-album',
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
    public parametro: any;
    public albumResult: IAlbumModel;
    public songResult: ISongModel;


    constructor(
        private _route: ActivatedRoute,
        //private _router: Route,
        private albumService: AlbumService
    ) {

    }

    ngOnInit() {
        this._route.params.forEach((params: Params) => {
            this.parametro = params['id'];

        });
        this.ngOnStartAlbum(this.parametro);
        this.ngOnStartAlbumSonglist(this.parametro);
    }
    ngOnStartAlbum(id: number) {

        this.albumService.getAlbumData(id).subscribe(

            (albumData: any) => {

                if (albumData['data']) {

                    if (albumData['data'].length > 0) {

                        this.albumResult = albumData['data'][0];
                        console.log('DATA', albumData['data'])
                        console.log('ALBUMRESULT  ', this.albumResult.name_album);

                    } else {
                        this.albumResult = null;
                    }
                }
            },
            err => console.error(err)
        );
        console.log('fuera del subscribe', this.albumResult);
    }

    ngOnStartAlbumSonglist(id: number) {

        this.albumService.getAlbumSonglist(id).subscribe(

            (songlist: any) => {

                if (songlist['data']) {

                    if (songlist['data'].length > 0) {

                        this.songResult = songlist['data'];
                        console.log('DATA SONGLIST ', songlist['data']);
                        console.log('SONGLIST ', this.songResult);

                    } else {
                        this.songResult = null;
                    }
                }

            },
            err => console.error(err)

        );
        console.log('fuera del subscribe', this.songResult);
    }

    getAlbumResult(){
        return this.albumResult;
    }

    getSongResult(){
        return this.songResult;
    }





}
