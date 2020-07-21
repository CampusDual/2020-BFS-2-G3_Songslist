import { Component, OnInit, Input } from '@angular/core';
import { IAlbumModel } from 'app/shared/models/ialbum.model';

@Component({
  selector: 'app-default-container',
  templateUrl: './default-container.component.html',
  styleUrls: ['./default-container.component.scss']
})
export class DefaultContainerComponent implements OnInit {

  @Input("dataAlbums") dataAlbums: IAlbumModel[];
  constructor() { }

  ngOnInit() { }
}