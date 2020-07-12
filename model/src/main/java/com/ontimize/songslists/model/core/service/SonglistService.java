package com.ontimize.songslists.model.core.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import com.ontimize.db.EntityResult;
import com.ontimize.songslists.api.core.service.ISonglistService;
import com.ontimize.songslists.model.core.dao.SonglistDao;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;

@Service("SonglistService")
@Lazy

public class SonglistService implements ISonglistService{
	 @Autowired private SonglistDao songlistDao;
	 @Autowired private DefaultOntimizeDaoHelper daoHelper;
	 
	 @Override
	 public EntityResult songlistQuery(Map<String, Object> keyMap, List<String> attrList)
	   throws OntimizeJEERuntimeException {
	  return this.daoHelper.query(this.songlistDao, keyMap, attrList);
	 }

	 @Override
	 public EntityResult songlistInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
	  return this.daoHelper.insert(this.songlistDao, attrMap);
	 }

	 @Override
	 public EntityResult songlistUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap)
	   throws OntimizeJEERuntimeException {
	  return this.daoHelper.update(this.songlistDao, attrMap, keyMap);
	 }

	 @Override
	 public EntityResult songlistDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
	  return this.daoHelper.delete(this.songlistDao, keyMap);
	 }
	 
	 
	 // todos los usuarios 
	 
	 public boolean isNameSonglist ( String nameSongList ) {
		try {
			 HashMap <String, String> mykeyMap =  new HashMap<String, String>();
			 mykeyMap.put("nick_user", this.daoHelper.getUser().getUsername());
			 List <String> myList =  new ArrayList<String>();
				myList.add("name_songlist");
			 EntityResult enRest =this.daoHelper.query(this.songlistDao, mykeyMap, myList);
			 Vector contentpassw =  (Vector) enRest.get("name_songlist");
			 String restPassw = (String) contentpassw.elementAt(0);
			 boolean a0 = restPassw.equals(nameSongList);
			 boolean a1 = contentpassw.contains(nameSongList);
			 enRest.size();
			return a0;
			} catch (Exception e) {
				 return false;
			 }
	 }

		// en el propio usuario

		public int getID() {
			try {
				HashMap<String, String> mykeyMap = new HashMap<String, String>();
				mykeyMap.put("nick_user", this.daoHelper.getUser().getUsername());
				List<String> myList = new ArrayList<String>();
				myList.add("id_user");
				EntityResult enRest = this.daoHelper.query(this.songlistDao, mykeyMap, myList);
				Vector contentID = (Vector) enRest.get("id_user");
				int id = (int) contentID.elementAt(0);
				return id;
			} catch (Exception e) {
				return -1;
			}
		}
	 
	
}
