package com.ontimize.songslists.model.core.dao;


	import org.springframework.context.annotation.Lazy;
	import org.springframework.stereotype.Repository;

	import com.ontimize.jee.server.dao.common.ConfigurationFile;
	import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;

	@Repository("SonglistDao")
	@Lazy
	@ConfigurationFile(configurationFile = "dao/SonglistDao.xml", configurationFilePlaceholder = "dao/placeholders.properties")
	public class SonglistDao extends OntimizeJdbcDaoSupport {

	 public static final String ATTR_ID_SONG_LIST = "id_songlist";
	 public static final String ATTR_SONGLIST_NAME = "name_songlist"; 
	 public static final String ATTR_SONGLIST_NICK_USER = "nick_user"; 
	 public static final String ATTR_SONGLIST_DESCRIPTION = "description_songlist"; 
	}
	
	