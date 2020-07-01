package com.ontimize.songslists.model.core.dao;


	import org.springframework.context.annotation.Lazy;
	import org.springframework.stereotype.Repository;

	import com.ontimize.jee.server.dao.common.ConfigurationFile;
	import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;

	@Repository("AlbumDao")
	@Lazy
	@ConfigurationFile(configurationFile = "dao/AlbumDao.xml", configurationFilePlaceholder = "dao/placeholders.properties")
	public class AlbumDao extends OntimizeJdbcDaoSupport {

	 public static final String ATTR_ID_ALBUM = "id_album";
	 public static final String ATTR_ALBUM_NAME = "name_album"; 
	 public static final String ATTR_ALBUM_IMG = "img_album"; 
	 public static final String ATTR_ALBUM_YEAR = "year_album"; 
	 public static final String ATTR_ALBUM_DESCRIPTION = "description_album";
	 public static final String ATTR_ARTIST_ID_ARTIST = "id_artist";
	 public static final String ATTR_ARTIST_NAME_ARTIST = "name_artist";
	 public static final String ATTR_GENRE_ID_GENRE = "id_genre"; 
	 public static final String ATTR_GENRE_NAME_GENRE = "name_genre"; 

	}