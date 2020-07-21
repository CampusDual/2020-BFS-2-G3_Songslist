package com.ontimize.songslists.model.core.service;

import java.util.List;
import java.util.Map;

import org.hsqldb.lib.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import com.ontimize.db.EntityResult;
import com.ontimize.songslists.api.core.service.IAlbumService;
import com.ontimize.songslists.model.core.dao.AlbumDao;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;

@Service("AlbumService")
@Lazy

public class AlbumService implements IAlbumService{
	 @Autowired private AlbumDao albumDao;
	 @Autowired private DefaultOntimizeDaoHelper daoHelper;
	 
	 @Override
	 public EntityResult albumQuery(Map<String, Object> keyMap, List<String> attrList)
	   throws OntimizeJEERuntimeException {
	  return this.daoHelper.query(this.albumDao, keyMap, attrList);
	 }

	 @Override
	 public EntityResult albumInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
	  return this.daoHelper.insert(this.albumDao, attrMap);
	 }

	 @Override
	 public EntityResult albumUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap)
	   throws OntimizeJEERuntimeException {
	  return this.daoHelper.update(this.albumDao, attrMap, keyMap);
	 }

	 @Override
	 public EntityResult albumDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
	  return this.daoHelper.delete(this.albumDao, keyMap);
	 }
}
