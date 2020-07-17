import { Component, OnInit, Input, Inject } from '@angular/core';
import { ISongListModel } from 'app/shared/models/isongList.model';
import { LoginService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnInit {
  loggedIn : boolean ;
  @Input( "data") data :ISongListModel[] ;
  @Input( "owner") owner :boolean ;
  constructor(
    @Inject(LoginService) private loginService: LoginService,
  ) {
    this.loggedIn =  loginService.isLoggedIn();
   }
  ngOnInit() {
    console.log('owner value : ',this.owner);
  }

}
