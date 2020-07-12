package com.ontimize.songslists.api.core.service;


import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.ontimize.db.EntityResult;


public interface IUserService {

	public EntityResult userQuery(Map<?, ?> keyMap, List<?> attrList) throws OntimizeJEERuntimeException;
	public EntityResult userInsert(Map<?, ?> attrMap) throws OntimizeJEERuntimeException;
	public EntityResult userUpdate(Map<?, ?> attrMap, Map<?, ?> keyMap) throws OntimizeJEERuntimeException;
	public EntityResult userDelete(Map<?, ?> keyMap) throws OntimizeJEERuntimeException;
	public boolean isnick ( String nameSongList );
	public int getID();
	public boolean ispassword ( String password );

}
