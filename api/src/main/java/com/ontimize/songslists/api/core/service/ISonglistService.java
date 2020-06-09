package com.ontimize.songslists.api.core.service;

import java.util.List;
import java.util.Map;
import com.ontimize.db.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

public interface ISonglistService {
	
	// SONGLISTS
	
	public EntityResult songlistQuery(Map<String, Object> keyMap, List<String> attrList)
			throws OntimizeJEERuntimeException;

	public EntityResult songlistInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException;

	public EntityResult songlistUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap)
			throws OntimizeJEERuntimeException;

	public EntityResult songlistDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;

}
