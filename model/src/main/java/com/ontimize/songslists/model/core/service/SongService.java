package com.ontimize.songslists.model.core.service;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import com.ontimize.db.EntityResult;
import com.ontimize.songslists.api.core.service.ISongService;
import com.ontimize.songslists.model.core.dao.SongDao;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;

@Service("SongService")
@Lazy

public class SongService implements ISongService{
	 @Autowired private SongDao songDao;
	 @Autowired private DefaultOntimizeDaoHelper daoHelper;
	 
	 @Override
	 public EntityResult songQuery(Map<String, Object> keyMap, List<String> attrList)
	   throws OntimizeJEERuntimeException {
	  return this.daoHelper.query(this.songDao, keyMap, attrList);
	 }
	 

	 @Override
	 public EntityResult songInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
	  return this.daoHelper.insert(this.songDao, attrMap);
	 }

	 @Override
	 public EntityResult songUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap)
	   throws OntimizeJEERuntimeException {
	  return this.daoHelper.update(this.songDao, attrMap, keyMap);
	 }

	 @Override
	 public EntityResult songDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
	  return this.daoHelper.delete(this.songDao, keyMap);
	 }
	 


}
