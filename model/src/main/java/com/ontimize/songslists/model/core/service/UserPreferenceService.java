package com.ontimize.songslists.model.core.service;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import com.ontimize.songslists.api.core.service.IUserPreferenceService;
import com.ontimize.songslists.model.core.dao.UserPreferenceDao;
import com.ontimize.db.EntityResult;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;


@Service("UserPreferenceService")
@Lazy
public class UserPreferenceService implements IUserPreferenceService {

	@Autowired
	private UserPreferenceDao userPreferenceDao;
	


	@Autowired
	private DefaultOntimizeDaoHelper daoHelper;

	public void loginQuery(Map<?, ?> key, List<?> attr) {
	}

	public EntityResult userpreferenceQuery(Map<?, ?> keyMap, List<?> attrList) {
		return this.daoHelper.query(userPreferenceDao, keyMap, attrList);
	}

	public EntityResult userpreferenceInsert(Map<?, ?> attrMap) {
		return this.daoHelper.insert(userPreferenceDao, attrMap);
	}

	public EntityResult userpreferenceUpdate(Map<?, ?> attrMap, Map<?, ?> keyMap) {
		return this.daoHelper.update(userPreferenceDao, attrMap, keyMap);
	}

	@Override
	public EntityResult userpreferenceDelete(Map<?, ?> keyMap) {
		// TODO Auto-generated method stub
		return this.daoHelper.delete(this.userPreferenceDao, keyMap);
	}
}