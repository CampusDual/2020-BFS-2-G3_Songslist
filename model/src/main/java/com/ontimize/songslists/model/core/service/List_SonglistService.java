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
import com.ontimize.songslists.model.core.dao.List_SonglistDao;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;

@Service("List_SonglistService")
@Lazy

public class List_SonglistService implements IList_SongListService {
	@Autowired
	private List_SonglistDao list_songlistDao;
	@Autowired
	private DefaultOntimizeDaoHelper daoHelper;
	@Autowired private IUserService userSrv;
	@Autowired private ISonglistService songListSrv;
	 @Autowired private ISonglistService songlistService;

	@Override
	public EntityResult list_songlistQuery(Map<String, Object> keyMap, List<String> attrList)
			throws OntimizeJEERuntimeException {
		if (keyMap.containsKey("id_user")){
			keyMap.remove("id_user");
		}
		if (keyMap.containsKey("user")) {
			if (keyMap.get("user") == "owner") {
		keyMap.put("id_user", userSrv.getID());
			}
			keyMap.remove("user");
		}
		EntityResult res = this.daoHelper.query(this.list_songlistDao, keyMap, attrList);
		
		if (keyMap.containsKey("name_songlist")) {
			HashMap<String, Integer> map = new HashMap<>();
			//map.put("image", getImgID((String)keyMap.get("name_songlist")));
			Vector vector = new Vector ();
			vector.addElement(getImgID((String)keyMap.get("name_songlist")));
			res.put("image", vector);
			
		}
		
		return res; 
	}
	

	@Override
	public EntityResult list_songlistInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
		String name_SongList = (String)attrMap.get("name_songlist");
		attrMap.remove("name_songlist");
		int songListid = songListSrv.getSongListID(name_SongList);
		attrMap.put("id_songlist",songListSrv.getSongListID(name_SongList));
		return this.daoHelper.insert(this.list_songlistDao, attrMap);
	}

	@Override
	public EntityResult list_songlistUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap)
			throws OntimizeJEERuntimeException {
		return this.daoHelper.update(this.list_songlistDao, attrMap, keyMap);
	}

	@Override
	public EntityResult list_songlistDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
		if (keyMap.containsKey("name_songlist")){
		String name_SongList = (String)keyMap.get("name_songlist");
		keyMap.remove("name_songlist");
		int songListid = songListSrv.getSongListID(name_SongList);
		keyMap.put("id_songlist",songListSrv.getSongListID(name_SongList));
		}
		return this.daoHelper.delete(this.list_songlistDao, keyMap);
	}
	
	public int getImgID(String nameSongList) {
		try {
			HashMap<String, Object> mykeyMap = new HashMap<String, Object>();
			mykeyMap.put("name_songlist", nameSongList);
			mykeyMap.put("id_user", userSrv.getID());
			List<String> myList = new ArrayList<String>();
			myList.add("img_album");
			EntityResult enRest = this.daoHelper.query(this.list_songlistDao, mykeyMap, myList);
			Vector contentID = (Vector) enRest.get("img_album");
			System.out.println(contentID.toString());
			int id = (int) contentID.elementAt(0);
			return id;
		} catch (Exception e) {
			return -1;
		}
	}
	public int getImgID() {
		try {
			HashMap<String, Object> mykeyMap = new HashMap<String, Object>();
			mykeyMap.put("id_user", userSrv.getID());
			List<String> myList = new ArrayList<String>();
			myList.add("img_album");
			myList.add("name_songlist");
			EntityResult enRest = this.daoHelper.query(this.list_songlistDao, mykeyMap, myList);
			Vector contentID = (Vector) enRest.get("img_album");
			System.out.println(contentID.toString());
			int id = (int) contentID.elementAt(0);
			return id;
		} catch (Exception e) {
			return 0;
		}
	}
	public int getList_SongListID(int idSong, String nameSongList) {
		try {
			HashMap<String, Object> mykeyMap = new HashMap<String, Object>();
			mykeyMap.put("id_song", idSong);
			mykeyMap.put("id_songlist",songlistService.getSongListID(nameSongList));
			List<String> myList = new ArrayList<String>();
			myList.add("id_list_songlist");
			EntityResult enRest = this.daoHelper.query(this.list_songlistDao, mykeyMap, myList);
			Vector contentID = (Vector) enRest.get("id_list_songlist");
			System.out.println(contentID.toString());
			int id = (int) contentID.elementAt(0);
			return id;
		} catch (Exception e) {
			return 0;
		}
	}
	

}
