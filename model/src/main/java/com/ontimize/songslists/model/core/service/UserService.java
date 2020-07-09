package com.ontimize.songslists.model.core.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.ontimize.songslists.api.core.service.IUserService;
import com.ontimize.songslists.model.core.dao.UserDao;
import com.ontimize.db.EntityResult;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;


@Service("UserService")
@Lazy
public class UserService implements IUserService {

	@Autowired
	private UserDao userDao;
	


	@Autowired
	private DefaultOntimizeDaoHelper daoHelper;

	public void loginQuery(Map<?, ?> key, List<?> attr) {
	}

	public EntityResult userQuery(Map<?, ?> keyMap, List<?> attrList) {
		attrList.size();
		HashMap <String, String> mykeyMap =  new HashMap<String, String>();
		mykeyMap.put("nick_user", this.daoHelper.getUser().getUsername());
		return this.daoHelper.query(userDao, mykeyMap, attrList);
	}

	public EntityResult userInsert(Map<?, ?> attrMap) {
		System.out.println(attrMap.toString());
		return this.daoHelper.insert(userDao, attrMap);
	}

	public EntityResult userUpdate(Map<?, ?> attrMap, Map<?, ?> keyMap) {
		HashMap <String, String> mykeyMap =  new HashMap<String, String>();
		List <String> myList =  new ArrayList<String>();
		myList.add("id_user");
		EntityResult enRest = userQuery(mykeyMap,myList);
		Vector contentID =  (Vector) enRest.get("id_user");
		int id = (int) contentID.elementAt(0);
		mykeyMap.put("nick_user", this.daoHelper.getUser().getUsername());
		HashMap <String, Integer> mykeyMapUpdate =  new HashMap<String, Integer>();
		mykeyMapUpdate.put("id_user", id);
		return this.daoHelper.update(userDao, attrMap, mykeyMapUpdate);
	}

	public EntityResult userDelete(Map<?, ?> keyMap) {
		Map<Object, Object> attrMap = new HashMap<>();
		attrMap.put("delete_date_user", new Timestamp(Calendar.getInstance().getTimeInMillis()));
		return this.daoHelper.update(this.userDao, attrMap, keyMap);
	}

}