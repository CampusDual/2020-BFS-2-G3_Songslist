package com.ontimize.songslists.model.core.service;

import java.util.List;
import java.util.Map;
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

	@Override
	public EntityResult list_songlistQuery(Map<String, Object> keyMap, List<String> attrList)
			throws OntimizeJEERuntimeException {
		return this.daoHelper.query(this.list_songlistDao, keyMap, attrList);
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
		return this.daoHelper.delete(this.list_songlistDao, keyMap);
	}

}
