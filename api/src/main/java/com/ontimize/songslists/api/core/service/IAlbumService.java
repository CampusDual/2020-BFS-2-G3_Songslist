package com.ontimize.songslists.api.core.service;


import java.util.List;
import java.util.Map;
import com.ontimize.db.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

public interface IAlbumService {
	
	 // SONGS
	 public EntityResult albumQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;
	 public EntityResult albumInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException;
	 public EntityResult albumUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
	 public EntityResult albumDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
}
