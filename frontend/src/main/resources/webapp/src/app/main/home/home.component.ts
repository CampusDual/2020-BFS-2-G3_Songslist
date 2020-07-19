import { Component, OnInit, ViewChild, ElementRef, Renderer2, Inject, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HomeService } from './home.service';
import { ISongModel } from 'app/shared/models/isong.model';
import { MatRadioChange, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { CONFIG } from 'app/app.config';
import 'rxjs/add/operator/filter';
import { SelectionModel } from '@angular/cdk/collections';
import { LoginService } from 'ontimize-web-ngx';
import { Subscription } from 'rxjs';
import { ListService } from '../services/listService';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy  {
  refreshMessages: any[] = [];
  refreshSubscription  : Subscription;
  subscription : Subscription;
  tosearch;
  // input radio
  selectOptions: string[] = ['Song', 'Album', 'Genre', 'Artist'];
  radioSelected: string;
  dataSource;
  searchText: string = '';
  searchSongs: ISongModel[] = Array();
  error: boolean;
  mnjError: string;
  selection = new SelectionModel<ISongModel>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  loggedIn :boolean;

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    protected listService: ListService,
    protected homeService: HomeService,
    private renderer: Renderer2,
    private _route: ActivatedRoute, // recivir parametro id
    @Inject(LoginService) private loginService: LoginService,
  ) {
    this.loggedIn = loginService.isLoggedIn();
  }

  ngOnInit() {
    this.subscription = this._route.queryParams
      // .filter(params => params.tosearch )
      .subscribe(params => {
        if (params['tosearch'] === "ok") {
          const myData = JSON.parse(localStorage.getItem(CONFIG.uuid));
          let obj = myData['search'];
          this.radioSelected =obj.radioSelect;
          this.searchText = obj.searchText
          this.search( this.radioSelected,this.searchText);
        } else {
          console.log('sub-to-parem', params);
          this.defaultStart();
        }
      });
      this.refreshSubscription = this.listService.getRefresh().subscribe(message => {
        console.log('home-refreshSubscription-message',message);
        if (message) {
          console.log('home-refreshSubscription-message-refresh',message.action);
          if (message.refresh){
            if (message.refresh == "song" || message.refresh == "all"){
              console.log('home-component recive  REFRESH_SONG OR REFRESH_ALL');
              this.refreshMessages.push(message);
              if (this.radioSelected && this.searchText ){
              console.log('REFRESH_SONG OR REFRESH_ALL {radioSelected [', this.radioSelected,'], searchText[',this.searchText,']}');
              this.search(this.radioSelected, this.searchText)
              } else {
                console.log('REFRESH_SONG OR REFRESH_ALL {defaultStart}');
                this.defaultStart();
              }
        } else {
          // clear messages when empty message received
          this.refreshMessages = [];
        }
      }
      }
      });

  };

  defaultStart() {
    this.search("all", "");
  }

  search(radioSelected: string, searchText: string) {
    this.subscription = this.homeService.getSongData(radioSelected, searchText).subscribe(
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
            this.dataSource = new MatTableDataSource<ISongModel>(this.searchSongs);
            this.dataSource.paginator = this.paginator;
            //console.log('-------datasorce',this.dataSource);
          } else {
            this.searchSongs = Array();
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
      } else if (trimword.length == 0) {
        a = true;
      }
    }
    if (!a) {
      this.mnjError = `ERROR`;
      this.searchSongs = Array();
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
  }

  onItemChange($event) {
    this.searchText = $event;
    this.stringValidate();
    if (this.searchText.length > 2) {
      this.search(this.radioSelected, this.searchText);
      console.log(' searchText is : ', this.searchText);
    }else{this.searchText == ""}
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.searchSongs.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.searchSongs.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}



}

