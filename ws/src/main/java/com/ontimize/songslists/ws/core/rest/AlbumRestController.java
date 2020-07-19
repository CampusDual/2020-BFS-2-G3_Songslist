package com.ontimize.songslists.ws.core.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.ontimize.songslists.api.core.service.IAlbumService;
import com.ontimize.songslists.model.core.dao.AlbumDao;
import com.ontimize.db.EntityResult;
import com.ontimize.db.SQLStatementBuilder;
import com.ontimize.db.SQLStatementBuilder.BasicExpression;
import com.ontimize.db.SQLStatementBuilder.BasicField;
import com.ontimize.db.SQLStatementBuilder.BasicOperator;
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