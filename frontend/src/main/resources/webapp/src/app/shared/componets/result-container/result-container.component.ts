import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { ISongModel } from 'app/shared/models/isong.model';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'ontimize-web-ngx';


@Component({
  selector: 'app-result-container',
  templateUrl: './result-container.component.html',
  styleUrls: ['./result-container.component.scss']
})
export class ResultContainerComponent implements OnInit {
  selection = new SelectionModel<ISongModel>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input( "data") data :ISongModel[] ;
  dataSource;
  loggedIn :boolean;
  songsColums : Array<string>;
  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private _route: ActivatedRoute, // recivir parametro id
    @Inject(LoginService) private loginService: LoginService,
    ) {
      this.loggedIn=  loginService.isLoggedIn();
      this.songsColums = this.loggedIn ? ['select','Img','Song','Album','Artist','Genre','Action'] :['select','Img','Song','Album','Artist','Genre'];
   }

  ngOnInit() {
  this.dataSource = new MatTableDataSource<ISongModel>(this.data);
  this.dataSource.paginator = this.paginator;
  console.log('-----------datasorce on componet ',this.dataSource);
  }
/** Whether the number of selected elements matches the total number of rows. */
isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.data.length;
  return numSelected === numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  this.isAllSelected() ?
    this.selection.clear() :
    this.data.forEach(row => this.selection.select(row));
}

/** The label for the checkbox on the passed row */
checkboxLabel(row?: any): string {
  if (!row) {
    return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
}
navigate() {
  this.router.navigate(['../', 'login'], { relativeTo: this.actRoute });
}


}
