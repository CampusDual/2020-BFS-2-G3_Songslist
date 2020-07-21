package com.ontimize.songslists.ws.core.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.ontimize.songslists.api.core.service.IList_SongListService;
import com.ontimize.songslists.api.core.service.ISonglistService;
import com.ontimize.songslists.model.core.dao.List_SonglistDao;
import com.ontimize.songslists.model.core.dao.SonglistDao;
import com.ontimize.db.EntityResult;
import com.ontimize.db.SQLStatementBuilder;
import com.ontimize.db.SQLStatementBuilder.BasicExpression;
import com.ontimize.db.SQLStatementBuilder.BasicField;
import com.ontimize.db.SQLStatementBuilder.BasicOperator;
import com.ontimize.jee.server.rest.ORestController;

@RestController
@RequestMapping("/list_songlists")
@ComponentScan(basePackageClasses = { com.ontimize.songslists.api.core.service.IList_SongListService.class })
public class List_SonglistController extends ORestController<IList_SongListService> {

 @Autowired
 private IList_SongListService list_songlistService;

 @Autowired
 private ISonglistService songlistService;
 
 @Override
 public IList_SongListService getService() {
  return this.list_songlistService;
 }
 

 @RequestMapping(
		 value = "/searchListSonglist", 
		 method = RequestMethod.POST, 
		 produces = MediaType.APPLICATION_JSON_VALUE)
	public EntityResult currentSearch(@RequestBody Map<String, Object> req) {
	 
		try {
			List<String> columns = (List<String>) req.get("columns");
			Map<String, Object> filter = (Map<String, Object>) req.get("filter");
			
			int songlistToSearch = Integer.parseInt((String)(filter.get("SONGLIST")));
			String userToSearch = (String) filter.get("USER");
	
			Map<String, Object> key = new HashMap<String, Object>();
			if (userToSearch.equals("")) {
				key.put(SQLStatementBuilder.ExtendedSQLConditionValuesProcessor.EXPRESSION_KEY,
						searchAnyListLike(songlistToSearch));
				
			}else {
				key.put(SQLStatementBuilder.ExtendedSQLConditionValuesProcessor.EXPRESSION_KEY,
						searchUserListLike(songlistToSearch, userToSearch));
			}
			
			return list_songlistService.list_songlistQuery(key, columns);
		} catch (Exception e) {
			e.printStackTrace();
			EntityResult res = new EntityResult();
			res.setCode(EntityResult.OPERATION_WRONG);
			return res;
		}
	}

	private BasicExpression searchUserListLike(int songlistToSearch, String userToSearch) {
			
		BasicField songlists = new BasicField(SonglistDao.ATTR_ID_SONG_LIST);
		BasicField users = new BasicField(SonglistDao.ATTR_SONGLIST_NICK_USER);
		BasicExpression bexp1 = new BasicExpression(songlists, BasicOperator.EQUAL_OP, songlistToSearch);
		BasicExpression bexp2 = new BasicExpression(users, BasicOperator.LIKE_OP, userToSearch);
		return new BasicExpression(bexp1, BasicOperator.AND_OP, bexp2);
	}
	private BasicExpression searchAnyListLike(int songlistToSearch) {
		
		BasicField songlists = new BasicField(SonglistDao.ATTR_ID_SONG_LIST);
		BasicExpression bexp1 = new BasicExpression(songlists, BasicOperator.EQUAL_OP, songlistToSearch);
		return bexp1;
	}
	
	@RequestMapping(value = "/delSong", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public EntityResult currenSearchSong(@RequestBody Map<?, ?> req) {
		try{
			Map<String, Object> filter = (Map<String, Object>) req.get("filter");
			Map<String, Object> Myfilter = new HashMap<String, Object>();
		if(filter.containsKey("id_song") && filter.containsKey("name_songlist")) {	
			int songID = (int) filter.get("id_song");
			String name =(String)filter.get("name_songlist");
			int SongListID = songlistService.getSongListID((String)filter.get("name_songlist"));
		int List_SongListID = list_songlistService.getList_SongListID(songID,name);
		Myfilter.put("id_list_songlist", List_SongListID);
		}else {
			Myfilter =filter;
		}
		return list_songlistService.list_songlistDelete( Myfilter);
		} catch (Exception e) {
			e.printStackTrace();
			EntityResult res = new EntityResult();
			res.setCode(EntityResult.OPERATION_WRONG);
			return res;
		}
	}
	
	@RequestMapping(value = "/delSonglist", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public EntityResult deleteSonglist(@RequestBody Map<?, ?> req) {
		try{
			Map<String, Object> filter = (Map<String, Object>) req.get("filter");
			Map<String, Object> Myfilter = new HashMap<String, Object>();
		if(filter.containsKey("id_songlist")) {	
			int songlistID = (int) filter.get("id_songlist");
		Myfilter.put("id_songlist", songlistID);
		}else {
			Myfilter =filter;
		}
		return songlistService.songlistDelete( Myfilter);
		} catch (Exception e) {
			e.printStackTrace();
			EntityResult res = new EntityResult();
			res.setCode(EntityResult.OPERATION_WRONG);
			return res;
		}
	}
}