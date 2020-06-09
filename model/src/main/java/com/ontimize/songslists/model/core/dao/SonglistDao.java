package com.ontimize.songslists.model.core.dao;


	import org.springframework.context.annotation.Lazy;
	import org.springframework.stereotype.Repository;

	import com.ontimize.jee.server.dao.common.ConfigurationFile;
	import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;

	@Repository("SonglistDao")
	@Lazy
	@ConfigurationFile(configurationFile = "dao/SonglistDao.xml", configurationFilePlaceholder = "dao/placeholders.properties")
	public class SonglistDao extends OntimizeJdbcDaoSupport {

	 public static final String ATTR_ID_SONG_LIST = "id_song_list";
	 public static final String ATTR_SONGLIST_NAME = "name_song_list"; 
	 public static final String ATTR_SONGLIST_USER_ = "user_"; 
	}