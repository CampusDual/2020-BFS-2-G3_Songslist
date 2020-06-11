package com.ontimize.songslists.ws.core.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ontimize.songslists.api.core.service.IGenreService;
import com.ontimize.jee.server.rest.ORestController;

@RestController
@RequestMapping("/genres")
@ComponentScan(basePackageClasses = { com.ontimize.songslists.api.core.service.IGenreService.class })
public class GenreRestController extends ORestController<IGenreService> {

 @Autowired
 private IGenreService genreService;

 @Override
 public IGenreService getService() {
  return this.genreService;
 }
}