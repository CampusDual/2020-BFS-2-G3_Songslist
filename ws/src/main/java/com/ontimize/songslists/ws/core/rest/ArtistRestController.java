package com.ontimize.songslists.ws.core.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ontimize.songslists.api.core.service.IArtistService;
import com.ontimize.jee.server.rest.ORestController;

@RestController
@RequestMapping("/artists")
@ComponentScan(basePackageClasses = { com.ontimize.songslists.api.core.service.IArtistService.class })
public class ArtistRestController extends ORestController<IArtistService> {

 @Autowired
 private IArtistService artistService;

 @Override
 public IArtistService getService() {
  return this.artistService;
 }
}