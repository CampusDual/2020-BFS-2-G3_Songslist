package com.ontimize.songslists.api.core.service;

import java.util.List;
import java.util.Map;
import com.ontimize.db.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

public interface IList_SongListService {
	
	// LIST_SONGLISTS
	
	public EntityResult list_songlistQuery(Map<String, Object> keyMap, List<String> attrList)
			throws OntimizeJEERuntimeException;

	public EntityResult list_songlistInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException;

	public EntityResult list_songlistUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap)
			throws OntimizeJEERuntimeException;

	public EntityResult list_songlistDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
	public int getImgID(String nameSongList);
	public int getImgID();
	public int getList_SongListID(int idSong, String nameSongList);
}
