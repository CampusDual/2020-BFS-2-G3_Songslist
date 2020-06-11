package com.ontimize.songslists.model.core.dao;


	import org.springframework.context.annotation.Lazy;
	import org.springframework.stereotype.Repository;

	import com.ontimize.jee.server.dao.common.ConfigurationFile;
	import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;

	@Repository("GenreDao")
	@Lazy
	@ConfigurationFile(configurationFile = "dao/GenreDao.xml", configurationFilePlaceholder = "dao/placeholders.properties")
	public class GenreDao extends OntimizeJdbcDaoSupport {

	 public static final String ATTR_ID_GENRE = "id_genre";
	 public static final String ATTR_GENRE_NAME = "name_genre"; 
	 public static final String ATTR_GENRE_DESCRIPTION = "description_genre"; 
	}