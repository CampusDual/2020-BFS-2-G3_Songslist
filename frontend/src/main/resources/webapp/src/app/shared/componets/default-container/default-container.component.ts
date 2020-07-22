import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IAlbumModel } from 'app/shared/models/ialbum.model';

@Component({
  selector: 'app-default-container',
  templateUrl: './default-container.component.html',
  styleUrls: ['./default-container.component.scss']
})
export class DefaultContainerComponent implements OnChanges {

  @Input("dataAlbums") dataAlbums: IAlbumModel[];
  constructor() { }

  ngOnChanges() { }
}