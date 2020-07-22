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
import { IAlbumModel } from 'app/shared/models/ialbum.model';
import { AlbumService } from '../services/album.service';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  resultNewAlbums: IAlbumModel[] = null;
  resultNewSongs: ISongModel[] = null;
  refreshMessages: any[] = [];
  refreshSubscription: Subscription;
  subscription: Subscription;
  tosearch;
  // input radio
  selectOptions: string[] = ['Song', 'Album', 'Genre', 'Artist'];
  radioSelected: string = 'all';
  dataSource;
  searchText: string = '';
  searchSongs: ISongModel[] = Array();
  error: boolean;
  mnjError: string;
  selection = new SelectionModel<ISongModel>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  loggedIn: boolean;
  default: boolean = true;

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    protected listService: ListService,
    protected homeService: HomeService,
    protected albumService: AlbumService,
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
          this.radioSelected = obj.radioSelect;
          this.searchText = obj.searchText
          //this.clean();
          this.search(this.radioSelected, this.searchText);
        }
      });
    this.refreshSubscription = this.listService.getRefresh().subscribe(message => {
      if (message) {
        if (message.refresh) {
          if (message.refresh == "song" || message.refresh == "all") {
            this.refreshMessages.push(message);
            if (this.default) {
              this.loadNewAlbums();
            } else {
              this.search(this.radioSelected, this.searchText)
            }
          } else {
            // clear messages when empty message received
            this.refreshMessages = [];
          }
        }
      }
    });
    this.defaultStart();
  };
  defaultStart() {   

    if (this.default) {
      this.loadNewAlbums();
    }
    else {
      this.search(this.radioSelected, this.searchText);
    }
  }
  loadNewAlbums() {
    this.albumService.getNewAlbum().subscribe(
      (albumData: any) => {
        if (albumData['data']) {
          if (albumData['data'].length > 0) {
            this.resultNewAlbums = albumData['data'];
            console.log('NEW ALBUMS ', this.resultNewAlbums);
            this.defaultStart();
          }
        }
      },
      err => console.error(err)
    );
  }

  search(radioSelected: string, searchText: string) {
    console.log('SEARCH ---> ', this.searchText);
    this.subscription = this.homeService.getSongData(radioSelected, searchText).subscribe(
      (x: any) => {
        if (x['data']) {
          if (x['data'].length > 0) {
            //this.searchSongs = [];
            this.searchSongs = x['data'];
            const myData = JSON.parse(localStorage.getItem(CONFIG.uuid));
            myData['search'] = { radioSelect: this.radioSelected, searchText: this.searchText };
            console.log('searchSongs _____', this.searchSongs);
            localStorage.setItem(CONFIG.uuid, JSON.stringify(myData));
            this.dataSource = new MatTableDataSource<ISongModel>(this.searchSongs);
            this.dataSource.paginator = this.paginator;

            this.default = false;
            //console.log('-------datasorce',this.dataSource);
          } else {
            this.searchSongs=[];
            this.default = true;
            this.defaultStart();                
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
    let wordToFind: string[] = new Array();
    for (let word of words) {
      let trimword = word.trim();
      if (trimword.length >= 3) {
        wordToFind.push(trimword);
      } else {
        this.mnjError = `ERROR`;     
      }
    }
    if (wordToFind) {      
      this.searchText = wordToFind.join(' ');
    }
    if(this.searchText.length >2){
      //this.searchSongs = [];
      this.search(this.radioSelected, this.searchText);
    }else {     
      this.default = true;
      this.defaultStart();  
    } 
    
  }

  onClickRadio(mrChange: MatRadioChange) {
    this.radioSelected = mrChange.value;
    this.stringValidate();    
  }

  onItemChange($event) { 
         
    this.searchText = $event;
    this.stringValidate();
         

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

