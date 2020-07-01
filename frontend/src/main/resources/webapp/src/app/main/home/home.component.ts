import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HomeService } from './home.service';
import { ISongModel } from 'app/shared/models/isong.model';
import { MatRadioChange } from '@angular/material';
import { CONFIG } from 'app/app.config';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tosearch;
  // input radio
  selectOptions: string[] = ['Song', 'Album', 'Genre', 'Artist'];
  @ViewChild("radioLabel")  refradioLabel: ElementRef;
  @ViewChild("input")  refInput: ElementRef;
  @ViewChild("radiobutton")  refRadioButton: ElementRef;
  @ViewChild("radiogroupbutton")  refRadiogroupButton: ElementRef;
  radioSelected: string;
  searchText: string = '';
  searchSongs: ISongModel[] = Array();
  error: boolean;
  mnjError: string;
  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    protected homeService: HomeService,
    private renderer: Renderer2,
    private _route: ActivatedRoute // recivir parametro id

  ) {
  }

  ngOnInit() {

    this._route.queryParams
      .filter(params => params.tosearch)
      .subscribe(params => {
        if (params.tosearch === "ok") {
          const myData = JSON.parse(localStorage.getItem(CONFIG.uuid));
          let obj = myData['search'];
          this.search(obj.radioSelect, obj.searchText);
        }
      });
  };

  search(radioSelected: string, searchText: string) {
    this.homeService.getSongData(radioSelected, searchText).subscribe(
      (x: any) => {
        console.log('recibo todo ', x);
        if (x['data']) {
          console.log('recibo la parte de data ', x['data']);
          console.log('nº results ', x['data'].length);
          if (x['data'].length > 0) {
            console.log('recibo todo ', x);
            this.searchSongs = x['data'];
            const myData = JSON.parse(localStorage.getItem(CONFIG.uuid));
            myData['search'] = { radioSelect: this.radioSelected, searchText: this.searchText };
            localStorage.setItem(CONFIG.uuid, JSON.stringify(myData));
            console.log('igualo la parte de data a mi variable y la muestro ', this.searchSongs);
            this.onChangeHTML();
          } else {
            this.searchSongs = Array();
              this. offChangeHTML;
          }
        }
      },
      err => console.error(err)
    );
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
    if (this.searchText.length > 2) {
      console.log(' radioSelected is : ', this.radioSelected);
      this.search(this.radioSelected, this.searchText);
    }
    if (!this.searchSongs){
      this. offChangeHTML;
    }
  }
  onItemChange($event) {
    this.searchText = $event;
    this.stringValidate();
    if (this.searchText.length > 2) {
      this.search(this.radioSelected, this.searchText);
      console.log(' searchText is : ', this.searchText);
    }
    if (!this.searchSongs){
      this. offChangeHTML;
    }
  }
  onChangeHTML(){
    this.renderer.addClass(this.refInput.nativeElement, "search-input");
    this.renderer.addClass(this.refRadiogroupButton.nativeElement, "search-radio-group");
    this.renderer.addClass(this.refRadioButton.nativeElement, "search-radio-buttonl");
    this.renderer.addClass(this.refRadioButton.nativeElement, "smallRadio");
    this.renderer.addClass(this.refradioLabel.nativeElement, "search-label");
  }
  offChangeHTML(){
    this.renderer.removeClass(this.refInput.nativeElement, "search-input");
    this.renderer.removeClass(this.refRadiogroupButton.nativeElement, "search-radio-group");
    this.renderer.removeClass(this.refRadioButton.nativeElement, "search-radio-button");
    this.renderer.removeClass(this.refradioLabel.nativeElement, "search-label");
  }

}
