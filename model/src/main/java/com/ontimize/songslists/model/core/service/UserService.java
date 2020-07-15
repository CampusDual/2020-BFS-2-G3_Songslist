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
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
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
		HashMap <String, String> mykeyMap =  new HashMap<String, String>();
		mykeyMap.put("nick_user", this.daoHelper.getUser().getUsername());
		return this.daoHelper.query(userDao, mykeyMap, attrList);
	}

	public EntityResult userInsert(Map<?, ?> attrMap)  {
		System.out.println(attrMap.toString());
		return this.daoHelper.insert(userDao, attrMap);
	}

	public EntityResult userUpdate(Map<?, ?> attrMap, Map<?, ?> keyMap)  {
		try {
		String passw = (String) attrMap.get("password_user");
		if ( !ispassword(passw)) {
			EntityResult res = new EntityResult();
			res.setCode(EntityResult.OPERATION_WRONG);
			res.setMessage("bad pasword");
			return res;
		}
		HashMap <String, String> mykeyMap =  new HashMap<String, String>();
		mykeyMap.put("nick_user", this.daoHelper.getUser().getUsername());
		HashMap <String, Integer> mykeyMapUpdate =  new HashMap<String, Integer>();
		int id =  getID();
		if (id == -1) {
			EntityResult res = new EntityResult();
			res.setCode(EntityResult.OPERATION_WRONG);
			res.setMessage(" internal error ");
			return res;
		}
		mykeyMapUpdate.put("id_user", id);
		return this.daoHelper.update(userDao, attrMap, mykeyMapUpdate);
	 } catch (Exception e) {
			e.printStackTrace();
			EntityResult res = new EntityResult();
			res.setCode(EntityResult.OPERATION_WRONG);
			res.setMessage(e.getMessage());
			return res;
		}
	}

	public EntityResult userDelete(Map<?, ?> keyMap) {
		Map<Object, Object> attrMap = new HashMap<>();
		attrMap.put("delete_date_user", new Timestamp(Calendar.getInstance().getTimeInMillis()));
		return this.daoHelper.update(this.userDao, attrMap, keyMap);
	}
	
	// sin loguear
	public boolean isnick ( String nick ) {
		 HashMap <String, String> mykeyMap =  new HashMap<String, String>();
		 List <String> myList =  new ArrayList<String>();
			myList.add("nick_user");
		 EntityResult enRest =this.daoHelper.query(userDao, mykeyMap, myList);
		 Vector contentpassw =  (Vector) enRest.get("nick_user");
		 String[] restNick = (String[]) contentpassw.elementAt(0);
		 for (int i=0; i == restNick.length; i++) {
			 if (restNick[i].equals(nick)) {
				 return true;
			 }
		 }
		return false;
	 }
	
	// logueado 
	// capturar execpcion si no devulve el id correctamente
	public int getID(){
		try {
			HashMap <String, String> mykeyMap =  new HashMap<String, String>();
			mykeyMap.put("nick_user", this.daoHelper.getUser().getUsername());
			List <String> myList =  new ArrayList<String>();
			myList.add("id_user");
			EntityResult enRest = userQuery(mykeyMap,myList);
			Vector contentID =  (Vector) enRest.get("id_user");
			int id = (int) contentID.elementAt(0);
		 return id;
		 } catch (Exception e) {
			 return -1;
		 }
	 }
	
	public boolean ispassword ( String password ) {
		try {
		 HashMap <String, String> mykeyMap =  new HashMap<String, String>();
		 mykeyMap.put("nick_user", this.daoHelper.getUser().getUsername());
		 List <String> myList =  new ArrayList<String>();
			myList.add("password_user");
		 EntityResult enRest =this.daoHelper.query(userDao, mykeyMap, myList);
		 Vector contentpassw =  (Vector) enRest.get("password_user");
		 String restPassw = (String) contentpassw.elementAt(0);
		 boolean a0 = restPassw.equals(password);
		 boolean a1 = contentpassw.contains(password);
		 enRest.size();
		return a0;
		} catch (Exception e) {
			 return false;
		 }
	 }

}