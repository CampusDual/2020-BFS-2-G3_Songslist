package com.ontimize.songslists.ws.core.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ontimize.songslists.api.core.service.IList_SongListService;
import com.ontimize.jee.server.rest.ORestController;

@RestController
@RequestMapping("/list_songlists")
@ComponentScan(basePackageClasses = { com.ontimize.songslists.api.core.service.IList_SongListService.class })
public class List_SonglistController extends ORestController<IList_SongListService> {

 @Autowired
 private IList_SongListService list_songlistService;

 @Override
 public IList_SongListService getService() {
  return this.list_songlistService;
 }
}