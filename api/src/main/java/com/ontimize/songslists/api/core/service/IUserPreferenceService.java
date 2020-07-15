package com.ontimize.songslists.api.core.service;

import java.util.List;
import java.util.Map;

import com.ontimize.db.EntityResult;

public interface IUserPreferenceService {
	
	public EntityResult userpreferenceQuery(Map<?, ?> keyMap, List<?> attrList);
	public EntityResult userpreferenceInsert(Map<?, ?> attrMap);
	public EntityResult userpreferenceUpdate(Map<?, ?> attrMap, Map<?, ?> keyMap);
	public EntityResult userpreferenceDelete(Map<?, ?> keyMap);


}
