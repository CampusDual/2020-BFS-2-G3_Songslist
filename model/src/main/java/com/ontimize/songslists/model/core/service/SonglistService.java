package com.ontimize.songslists.model.core.service;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import com.ontimize.db.EntityResult;
import com.ontimize.songslists.api.core.service.ISonglistService;
import com.ontimize.songslists.model.core.dao.SonglistDao;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;

@Service("SonglistService")
@Lazy

public class SonglistService implements ISonglistService{
	 @Autowired private SonglistDao songlistDao;
	 @Autowired private DefaultOntimizeDaoHelper daoHelper;
	 
	 @Override
	 public EntityResult songlistQuery(Map<String, Object> keyMap, List<String> attrList)
	   throws OntimizeJEERuntimeException {
	  return this.daoHelper.query(this.songlistDao, keyMap, attrList);
	 }

	 @Override
	 public EntityResult songlistInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
	  return this.daoHelper.insert(this.songlistDao, attrMap);
	 }

	 @Override
	 public EntityResult songlistUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap)
	   throws OntimizeJEERuntimeException {
	  return this.daoHelper.update(this.songlistDao, attrMap, keyMap);
	 }

	 @Override
	 public EntityResult songlistDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
	  return this.daoHelper.delete(this.songlistDao, keyMap);
	 }

}
