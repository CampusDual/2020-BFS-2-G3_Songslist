package com.ontimize.songslists.api.core.service;

import java.util.List;
import java.util.Map;

import com.ontimize.db.EntityResult;

public interface IUserRoleService {
	
	public EntityResult userroleQuery(Map<?, ?> keyMap, List<?> attrList);
	public EntityResult userroleInsert(Map<?, ?> attrMap);
	public EntityResult userroleUpdate(Map<?, ?> attrMap, Map<?, ?> keyMap);
	public EntityResult userroleDelete(Map<?, ?> keyMap);


}
