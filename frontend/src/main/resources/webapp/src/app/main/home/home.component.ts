import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeService } from './home.service';
import { ISongModule } from 'app/shared/models/isong.model';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // input radio
  selectOptions: string[] = ['Song', 'Album', 'Genre', 'Artist'];
  // @ViewChild("song") refSong: ElementRef;
  // @ViewChild("album") refAlbum: ElementRef;
  // @ViewChild("artist") refArtist: ElementRef;
  // @ViewChild("genre") refGenre: ElementRef;
  @ViewChild(".mensaje-error") refmenjErr: ElementRef;
  radioSelected: string;
  searchText: string = '';
  searchSongs: ISongModule[];
  error: boolean;
  mnjError: string;
  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    protected homeService: HomeService,
    private renderer: Renderer2

  ) {
  }

  ngOnInit() {
  }

  navigate() {
    this.router.navigate(['../', 'login'], { relativeTo: this.actRoute });
  }
  getDataArrayRadio() {
    return this.selectOptions;
  }
  getValueRadio() {
    return this.radioSelected;
  }


  stingValidate(){ // take al words legth >3
    let words: string[] =  this.searchText.trim().split(' ');
    for (let word of words){
      let trimword = word.trim();
     if (trimword.length < 3){
      this.removeItemFromArr(words , word );
     }
    }
    this.searchText = words.join(' ');
  }

   removeItemFromArr ( arr : string[] , item : string ) {
    var i = arr.indexOf( item );
    if ( i !== -1 ) {
        arr.splice( i, 1 );
    }
}

  display_error() {

  if ( this.searchText.trim().length > 2){
    this.mnjError = '';
    return false;
   } else {
    this.mnjError = 'plis put 3 leter to search';
   return true;
   }
  }


  onClickRadio($event) {
    this.radioSelected = $event;
    this.stingValidate();
    if (this.searchText.length > 2 ) {
    console.log(' radioSelected is : ', this.radioSelected);
    this.homeService.getSongData(this.radioSelected, this.searchText).subscribe(
      x => console.log('Observer got a next value: ' + x),
      err => console.error('Observer got an error: ' + err),
      () => console.log('Observer got a complete notification')
    );
    }
  }
  onItemChange($event) {
    this.searchText = $event;
    this.stingValidate();
    if (this.searchText.length > 3) {
      this.error = false;
      // this.renderer.setAttribute( this.refmenjErr.nativeElement, 'display', 'none');
      console.log(' searchText is : ', this.searchText);
      this.homeService.getSongData(this.radioSelected, this.searchText).subscribe(
        x => console.log('Observer got a next value: ' + x),
        err => console.error('Observer got an error: ' + err),
        () => console.log('Observer got a complete notification')
      );
    }
  }

}
