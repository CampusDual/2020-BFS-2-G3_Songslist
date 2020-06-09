package com.ontimize.songslists.model.core.dao;


	import org.springframework.context.annotation.Lazy;
	import org.springframework.stereotype.Repository;

	import com.ontimize.jee.server.dao.common.ConfigurationFile;
	import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;

	@Repository("ArtistDao")
	@Lazy
	@ConfigurationFile(configurationFile = "dao/ArtistDao.xml", configurationFilePlaceholder = "dao/placeholders.properties")
	public class ArtistDao extends OntimizeJdbcDaoSupport {

	 public static final String ATTR_ID_ARTIST = "id_artist";
	 public static final String ATTR_ARTIST_NAME = "name_artist"; 
	 public static final String ATTR_ARTIST_DESCRIPTION = "description_artist"; 
	}