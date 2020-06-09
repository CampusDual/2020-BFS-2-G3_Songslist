package com.ontimize.songslists.ws.core.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ontimize.songslists.api.core.service.ISonglistService;
import com.ontimize.jee.server.rest.ORestController;

@RestController
@RequestMapping("/songlists")
@ComponentScan(basePackageClasses = { com.ontimize.songslists.api.core.service.IAlbumService.class })
public class SonglistRestController extends ORestController<ISonglistService> {

 @Autowired
 private ISonglistService songlistService;

 @Override
 public ISonglistService getService() {
  return this.songlistService;
 }
}