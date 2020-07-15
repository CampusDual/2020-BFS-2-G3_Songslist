package com.ontimize.songslists.api.core.service;


import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.ontimize.db.EntityResult;


public interface IUserService {

	public EntityResult userQuery(Map<?, ?> keyMap, List<?> attrList) ;
	public EntityResult userInsert(Map<?, ?> attrMap) ;
	public EntityResult userUpdate(Map<?, ?> attrMap, Map<?, ?> keyMap) ;
	public EntityResult userDelete(Map<?, ?> keyMap) ;
	public boolean isnick ( String nameSongList );
	public int getID();
	public boolean ispassword ( String password );

}
