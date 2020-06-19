import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
  radioSelected: string;
  searchText: string;
  constructor(
    private router: Router,
    private actRoute: ActivatedRoute
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

  onClickRadio($event) {
    this.radioSelected = $event;

    console.log(" radioSelected is : ", this.radioSelected);
  }
  onItemChange($event) {
     this.searchText = $event;
     console.log(" searchText is : ", this.searchText);
  }
 
}
