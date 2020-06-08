package com.ontimize.songslists.model.core.dao;


	import org.springframework.context.annotation.Lazy;
	import org.springframework.stereotype.Repository;

	import com.ontimize.jee.server.dao.common.ConfigurationFile;
	import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;

	@Repository("SongDao")
	@Lazy
	@ConfigurationFile(configurationFile = "dao/SongDao.xml", configurationFilePlaceholder = "dao/placeholders.properties")
	public class SongDao extends OntimizeJdbcDaoSupport {

	 public static final String ATTR_ID_SONG = "id_song";
	 public static final String ATTR_SONG_NAME = "name_song"; 

	}