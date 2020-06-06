package com.ontimize.songslists.ws.core.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ontimize.songslists.api.core.service.IAlbumService;
import com.ontimize.jee.server.rest.ORestController;

@RestController
@RequestMapping("/albums")
@ComponentScan(basePackageClasses = { com.ontimize.songslists.api.core.service.IAlbumService.class })
public class AlbumRestController extends ORestController<IAlbumService> {

 @Autowired
 private IAlbumService albumService;

 @Override
 public IAlbumService getService() {
  return this.albumService;
 }
}