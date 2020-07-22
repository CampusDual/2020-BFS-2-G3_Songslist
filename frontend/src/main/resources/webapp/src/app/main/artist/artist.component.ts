import { Component, OnInit } from '@angular/core';
import { IArtistModel } from 'app/shared/models/iartist.model';
import { ActivatedRoute, Params } from '@angular/router';
import { ArtistService } from '../services/artist.service';
import { IAlbumModel } from 'app/shared/models/ialbum.model';

@Component({
    selector: 'app-artist',
    templateUrl: './artist.component.html',
    styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
    public parametro: any;
    public artistResult: IArtistModel;
    public albumResult: IAlbumModel;
    public dateAlbum: Date;

    constructor(

        private _route: ActivatedRoute,
        private artistService: ArtistService
    ) { }

    ngOnInit() {

        this._route.params.forEach((params: Params) => {
            this.parametro = params['id'];

        });
        this.ngOnStartArtist(this.parametro);
        this.ngOnStartArtistAlbumlist(this.parametro);

    }
    ngOnStartArtist(id: number) {

        this.artistService.getArtistData(id).subscribe(

            (artistData: any) => {

                if (artistData['data']) {

                    if (artistData['data'].length > 0) {

                        this.artistResult = artistData['data'][0];

                    } else {
                        this.artistResult = null;
                    }
                }
            },
            err => console.error(err)
        );
    }
    ngOnStartArtistAlbumlist(id: number) {
        this.artistService.getArtistAlbumlist(id).subscribe(
            (albumlist: any) => {
                if (albumlist['data']) {
                    if (albumlist['data'].length > 0) {
                        this.albumResult = albumlist['data'];
                        console.log('DATA ALBUMLIST ', albumlist['data']);
                        console.log('ALBUMLIST ', this.albumResult);

                    } else {
                        this.albumResult = null;
                    }
                }

            },
            err => console.error(err)

        );
        console.log('fuera del subscribe', this.albumResult);

    }
    getAlbumResult() {
        console.log('Contenido de album', this.albumResult);
        return this.albumResult;

    }

    getArtistDescription() {
        console.log('Contenido de descripción', this.artistResult);
        return this.artistResult.description_artist;
    }


}
