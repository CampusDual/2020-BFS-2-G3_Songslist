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
import com.ontimize.songslists.api.core.service.IList_SongListService;
import com.ontimize.songslists.api.core.service.ISonglistService;
import com.ontimize.songslists.api.core.service.IUserService;
import com.ontimize.songslists.model.core.dao.SonglistDao;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;

@Service("SonglistService")
@Lazy

public class SonglistService implements ISonglistService{
	 @Autowired private SonglistDao songlistDao;
	 @Autowired private DefaultOntimizeDaoHelper daoHelper;
	 @Autowired private IUserService userSrv;
	 @Autowired private IList_SongListService listSrv;
	 
	 @Override
	 public EntityResult songlistQuery(Map<String, Object> keyMap, List<String> attrList)
	   throws OntimizeJEERuntimeException {
			if (keyMap.containsKey("id_user")){
				keyMap.remove("id_user");
			}
			if (keyMap.containsKey("user")) {
				if (keyMap.get("user").equals("owner")) {
			keyMap.put("id_user", userSrv.getID());
				}
				keyMap.remove("user");
			}
			
			if (keyMap.containsKey("id_songlist")){
				int a = Integer.parseInt((String)keyMap.get("id_songlist"));
				keyMap.put("id_songlist",a);
			}
			/*
			EntityResult res = this.daoHelper.query(this.songlistDao, keyMap, attrList);
			
			if (keyMap.get("name_songlist")!="") {
				HashMap<String, Integer> map = new HashMap<>();
				//map.put("image", getImgID((String)keyMap.get("name_songlist")));
				Vector vector = new Vector ();
				vector.addElement(listSrv.getImgID((String)keyMap.get("name_songlist")));
				res.put("image", vector);
				
			}else if(keyMap.get("name_songlist")=="") {
				HashMap<String, Integer> map = new HashMap<>();
				//map.put("image", getImgID((String)keyMap.get("name_songlist")));
				Vector vector = new Vector ();
				vector.addElement(listSrv.getImgID());
				res.put("image", vector);
			}
			
			return res; */
				keyMap.toString();
				return this.daoHelper.query(songlistDao, keyMap, attrList);
			
		 
		 
	 }

	 @Override
	 public EntityResult songlistInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
		 attrMap.put("id_user", userSrv.getID());
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
	  
	 public EntityResult songlistOutnerQuery(Map<String, Object> keyMap, List<String> attrList)
			   throws OntimizeJEERuntimeException {
			HashMap <String, String> mykeyMap =  new HashMap<String, String>();
			mykeyMap.put("nick_user", this.daoHelper.getUser().getUsername());
			return this.daoHelper.query(songlistDao, mykeyMap, attrList);
			 }
	 
	 // todos los usuarios 
	 
	 // puedo llamar a UserService.getID
	 
	 public boolean isNameSonglist ( String nameSongList ) {
		try {
			 HashMap <String, String> mykeyMap =  new HashMap<String, String>();
			 mykeyMap.put("nick_user", this.daoHelper.getUser().getUsername());
			 List <String> myList =  new ArrayList<String>();
				myList.add("name_songlist");
			 EntityResult enRest =this.daoHelper.query(this.songlistDao, mykeyMap, myList);
			 enRest.getRecordValues(0);
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

		public int getSongListID(String nameSongList) {
			try {
				HashMap<String, Object> mykeyMap = new HashMap<String, Object>();
				mykeyMap.put("name_songlist", nameSongList);
				mykeyMap.put("id_user", userSrv.getID());
				List<String> myList = new ArrayList<String>();
				myList.add("id_songlist");
				EntityResult enRest = this.daoHelper.query(this.songlistDao, mykeyMap, myList);
				Vector contentID = (Vector) enRest.get("id_songlist");
				int id = (int) contentID.elementAt(0);
				return id;
			} catch (Exception e) {
				return -1;
			}
		}
		
		public int getImgID(String nameSongList) {
			try {
				HashMap<String, Object> mykeyMap = new HashMap<String, Object>();
				mykeyMap.put("name_songlist", nameSongList);
				mykeyMap.put("id_user", userSrv.getID());
				List<String> myList = new ArrayList<String>();
				myList.add("img_album");
				EntityResult enRest = this.daoHelper.query(this.songlistDao, mykeyMap, myList);
				Vector contentID = (Vector) enRest.get("img_album");
				int [] id = (int[]) contentID.elementAt(0);
				return id[0];
			} catch (Exception e) {
				return -1;
			}
		}
}
