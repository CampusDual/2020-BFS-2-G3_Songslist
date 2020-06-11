package com.ontimize.songslists.api.core.service;

import java.util.List;
import java.util.Map;
import com.ontimize.db.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

public interface IGenreService {
	
	 // GENRES	
	 public EntityResult genreQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;
	 public EntityResult genreInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException;
	 public EntityResult genreUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
	 public EntityResult genreDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
}
