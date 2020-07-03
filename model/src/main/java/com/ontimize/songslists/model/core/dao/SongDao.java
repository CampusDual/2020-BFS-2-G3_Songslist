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
	 public static final String ATTR_SONG_DESCRIPTION = "description_song"; 
	 public static final String ATTR_ALBUM_ID = "id_album"; 
	 public static final String ATTR_ALBUM_NAME= "name_album"; 
	 public static final String ATTR_ALBUM_YEAR= "year_album"; 
	 public static final String ATTR_ALBUM_IMG= "img_album"; 
	 public static final String ATTR_ARTIST_ID = "id_artist"; 
	 public static final String ATTR_ARTIST_NAME= "name_artist"; 
	 public static final String ATTR_GENRE_ID = "id_genre"; 
	 public static final String ATTR_GENRE_NAME= "name_genre"; 

	}