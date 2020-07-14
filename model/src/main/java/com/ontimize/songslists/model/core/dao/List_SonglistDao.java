package com.ontimize.songslists.model.core.dao;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;

@Repository("List_SongListDao")
@Lazy
@ConfigurationFile(configurationFile = "dao/List_SonglistDao.xml", configurationFilePlaceholder = "dao/placeholders.properties")
public class List_SonglistDao extends OntimizeJdbcDaoSupport {

	public static final String ATTR_ID_LIST_SONGLIST = "id_list_songlist";
	public static final String ATTR_SONG_ID = "id_song";
	public static final String ATTR_SONGLIST_ID = "id_songlist";
	public static final String ATTR_SONGLIST_NAME_ALBUM = "a.name_album";

}
