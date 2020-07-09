package com.ontimize.songslists.model.core.service;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import com.ontimize.songslists.api.core.service.IUserRoleService;
import com.ontimize.songslists.model.core.dao.UserRoleDao;
import com.ontimize.db.EntityResult;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;

@Service("UserRoleService")
@Lazy
public class UserRoleService implements IUserRoleService {

	@Autowired
	private UserRoleDao userRoleDao;

	@Autowired
	private DefaultOntimizeDaoHelper daoHelper;

	public void loginQuery(Map<?, ?> key, List<?> attr) {
	}

	public EntityResult userroleQuery(Map<?, ?> keyMap, List<?> attrList) {
		return this.daoHelper.query(userRoleDao, keyMap, attrList);
	}

	public EntityResult userroleInsert(Map<?, ?> attrMap) {
		
		attrMap.toString();
		
		return this.daoHelper.insert(userRoleDao, attrMap);
	}

	public EntityResult userroleUpdate(Map<?, ?> attrMap, Map<?, ?> keyMap) {
		return this.daoHelper.update(userRoleDao, attrMap, keyMap);
	}

	@Override
	public EntityResult userroleDelete(Map<?, ?> keyMap) {
		// TODO Auto-generated method stub
		return this.daoHelper.delete(this.userRoleDao, keyMap);
	}

}