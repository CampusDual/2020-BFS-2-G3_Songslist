package com.ontimize.songslists.ws.core.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ontimize.db.EntityResult;
import com.ontimize.db.SQLStatementBuilder;
import com.ontimize.db.SQLStatementBuilder.BasicExpression;
import com.ontimize.db.SQLStatementBuilder.BasicField;
import com.ontimize.db.SQLStatementBuilder.BasicOperator;
import com.ontimize.songslists.api.core.service.IAlbumService;
import com.ontimize.songslists.api.core.service.IArtistService;
import com.ontimize.songslists.api.core.service.ISongService;
import com.ontimize.songslists.api.core.service.IUserPreferenceService;
import com.ontimize.songslists.api.core.service.IUserRoleService;
import com.ontimize.songslists.api.core.service.IUserService;
import com.ontimize.songslists.model.core.dao.SongDao;

@RestController
@RequestMapping("/public")
public class PublicRestController {
	@Autowired
	private ISongService songService;
	@Autowired
	private IAlbumService albumService;
	@Autowired
	private IUserService userService;
	@Autowired
	private IUserRoleService userroleService;
	@Autowired
	private IUserPreferenceService userpreferenceService;
	@Autowired
	private IArtistService artistService;

	@RequestMapping(value = "/searchSong", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public EntityResult currenSearch(@RequestBody Map<String, Object> req) {
		String option;
		HashMap<String, String> param = new HashMap<>();
		try {
			List<String> columns = (List<String>) req.get("columns");
			Map<String, Object> filter = (Map<String, Object>) req.get("filter");

			String toSearch = (String) filter.get("NAME");
			if (filter.containsKey("OPTION")) {
				option = (String) filter.get("OPTION");
				if (option != null) {
					switch (option) {
					case "song":
						param.put("song", SongDao.ATTR_SONG_NAME);
						break;
					case "album":
						param.put("album", SongDao.ATTR_ALBUM_NAME);
						break;
					case "artist":
						param.put("artist", SongDao.ATTR_ARTIST_NAME);
						break;
					case "genre":
						param.put("genre", SongDao.ATTR_GENRE_NAME);
						break;
					case "all":
						param.put("song", SongDao.ATTR_SONG_NAME);
						param.put("album", SongDao.ATTR_ALBUM_NAME);
						param.put("artist", SongDao.ATTR_ARTIST_NAME);
						param.put("genre", SongDao.ATTR_GENRE_NAME);
					case "":
						param.put("song", SongDao.ATTR_SONG_NAME);
						param.put("album", SongDao.ATTR_ALBUM_NAME);
						param.put("artist", SongDao.ATTR_ARTIST_NAME);
						param.put("genre", SongDao.ATTR_GENRE_NAME);
					default:
					}
				}
			} else {
				option = null;
				param.put("song", SongDao.ATTR_SONG_NAME);
				param.put("album", SongDao.ATTR_ALBUM_NAME);
				param.put("artist", SongDao.ATTR_ARTIST_NAME);
				param.put("genre", SongDao.ATTR_GENRE_NAME);
			}
			Map<String, Object> key = new HashMap<String, Object>();
			key.put(SQLStatementBuilder.ExtendedSQLConditionValuesProcessor.EXPRESSION_KEY,
					searchLike(toSearch, param));
			return songService.songQuery(key, columns);
		} catch (Exception e) {
			e.printStackTrace();
			EntityResult res = new EntityResult();
			res.setCode(EntityResult.OPERATION_WRONG);
			return res;
		}
	}

	private BasicExpression searchLike(String toSearch, HashMap<String, String> param) {
		String words[] = toSearch.replaceAll("\\s+", " ").trim().split(" ");
		BasicExpression bexpBParam = null;
		BasicExpression bexpB = null;
		for (int i = 0; i != words.length; i++) {
			for (String param00 : param.values()) {
				BasicField field = new BasicField(param00);
				BasicExpression bexpAParam = new BasicExpression(field, BasicOperator.LIKE_OP, "%" + words[i] + "%");
				if (bexpBParam == null && i == 0) {
					bexpBParam = bexpAParam;
				} else {
					bexpBParam = new BasicExpression(bexpBParam, BasicOperator.OR_OP, bexpAParam);
				}
			}
			if (bexpB == null && i == 0) {
				bexpB = bexpBParam;
			} else {
				bexpB = new BasicExpression(bexpB, BasicOperator.OR_OP, bexpBParam);
			}
		}
		return bexpB;
	}
	/*
	@RequestMapping(value = "/searchAlbum", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public EntityResult currenSearchAlbum(@RequestBody Map<?, ?> req) {
		List<String> columns = (List<String>) req.get("columns");
		Map<String, Object> filter = (Map<String, Object>) req.get("filter");
		if(filter.containsKey("id_album")){
			int album = Integer.parseInt((String)filter.get("id_album"));
			filter.put("id_album",album);
		}
		return albumService.albumQuery( filter,columns);
	}
*/
	@RequestMapping(value = "/publicAlbum", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public EntityResult currenSearchAlbum(@RequestBody Map<?, ?> req) {
		try{
		List<String> columns = (List<String>) req.get("columns");
		Map<String, Object> filter = (Map<String, Object>) req.get("filter");
		if(filter.containsKey("id_album")){
			int album = Integer.parseInt((String)filter.get("id_album"));
			filter.put("id_album",album);
		}
		return albumService.albumQuery( filter,columns);
		} catch (Exception e) {
			e.printStackTrace();
			EntityResult res = new EntityResult();
			res.setCode(EntityResult.OPERATION_WRONG);
			return res;
		}
	}
	@RequestMapping(value = "/publicArtistAlbums", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public EntityResult getArtistAlbums(@RequestBody Map<?, ?> req) {
		try{
		List<String> columns = (List<String>) req.get("columns");
		Map<String, Object> filter = (Map<String, Object>) req.get("filter");
		if(filter.containsKey("id_artist")){
			int artist = Integer.parseInt((String)filter.get("id_artist"));
			filter.put("id_artist",artist);
		}
		return albumService.albumQuery( filter,columns);
		} catch (Exception e) {
			e.printStackTrace();
			EntityResult res = new EntityResult();
			res.setCode(EntityResult.OPERATION_WRONG);
			return res;
		}
	}
	
	
	@RequestMapping(value = "/publicArtist", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public EntityResult currenSearchArtist(@RequestBody Map<?, ?> req) {
		try{
		List<String> columns = (List<String>) req.get("columns");
		Map<String, Object> filter = (Map<String, Object>) req.get("filter");
		if(filter.containsKey("id_artist")){
			int artist = Integer.parseInt((String)filter.get("id_artist"));
			filter.put("id_artist",artist);
		}
		return artistService.artistQuery( filter,columns);
		} catch (Exception e) {
			e.printStackTrace();
			EntityResult res = new EntityResult();
			res.setCode(EntityResult.OPERATION_WRONG);
			return res;
		}
	}
	
	@RequestMapping(value = "/publicSong", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public EntityResult currenSearchSong(@RequestBody Map<?, ?> req) {
		try{
		List<String> columns = (List<String>) req.get("columns");
		Map<String, Object> filter = (Map<String, Object>) req.get("filter");
		if(filter.containsKey("id_song")){
			int song = Integer.parseInt((String)filter.get("id_song"));
			filter.put("id_song",song);
		}
		return songService.songQuery( filter,columns);
		} catch (Exception e) {
			e.printStackTrace();
			EntityResult res = new EntityResult();
			res.setCode(EntityResult.OPERATION_WRONG);
			return res;
		}
	}
	
	@RequestMapping(value = "/publicRegister", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public EntityResult currentCreateUser(@RequestBody Map<?, ?> req) {
		try{
			Map<String, Object> attr = new HashMap<String, Object>();
			if(req.containsKey("attr")) {
				attr = (Map<String, Object>) req.get("attr");
			}
		return userService.userInsert(attr);
		} catch (Exception e) {
			e.printStackTrace();
			EntityResult res = new EntityResult();
			res.setCode(EntityResult.OPERATION_WRONG);
			return res;
		}
	}
	
	@RequestMapping(value = "/publicUserrole", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public EntityResult currentAssignRole(@RequestBody Map<?, ?> req) {
		try{
			System.out.println(req.toString());
			Map<String, Object> attr = new HashMap<String, Object>();
			if(req.containsKey("attr")) {
				attr = (Map<String, Object>) req.get("attr");
				System.out.println(attr.toString());
			}
		return userroleService.userroleInsert(attr);
		} catch (Exception e) {
			e.printStackTrace();
			EntityResult res = new EntityResult();
			res.setCode(EntityResult.OPERATION_WRONG);
			return res;
		}
	}
	@RequestMapping(value = "/publicUserpreference", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public EntityResult currentAssignPreference(@RequestBody Map<?, ?> req) {
		try{
			System.out.println(req.toString());
			Map<String, Object> attr = new HashMap<String, Object>();
			if(req.containsKey("attr")) {
				attr = (Map<String, Object>) req.get("attr");
				System.out.println(attr.toString());
			}
		return userpreferenceService.userpreferenceInsert(attr);
		} catch (Exception e) {
			e.printStackTrace();
			EntityResult res = new EntityResult();
			res.setCode(EntityResult.OPERATION_WRONG);
			return res;
		}
	}

}
