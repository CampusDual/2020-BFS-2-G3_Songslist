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
import com.ontimize.songslists.api.core.service.ISonglistService;
import com.ontimize.songslists.model.core.dao.SongDao;
import com.ontimize.songslists.model.core.dao.SonglistDao;
import com.ontimize.db.EntityResult;
import com.ontimize.db.SQLStatementBuilder;
import com.ontimize.db.SQLStatementBuilder.BasicExpression;
import com.ontimize.db.SQLStatementBuilder.BasicField;
import com.ontimize.db.SQLStatementBuilder.BasicOperator;
import com.ontimize.jee.server.rest.ORestController;

@RestController
@RequestMapping("/songlists")
@ComponentScan(basePackageClasses = { com.ontimize.songslists.api.core.service.ISonglistService.class })
public class SonglistRestController extends ORestController<ISonglistService> {

 @Autowired
 private ISonglistService songlistService;

 @Override
 public ISonglistService getService() {
  return this.songlistService;
 }
 
 
 @RequestMapping(value = "/searchSonglist", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public EntityResult currenSearch(@RequestBody Map<String, Object> req) {
		try {
			List<String> columns = (List<String>) req.get("columns");
			Map<String, Object> filter = (Map<String, Object>) req.get("filter");
			String songlistToSearch = (String) filter.get("SONGLIST");
			String userToSearch = (String) filter.get("USER");
	
			Map<String, Object> key = new HashMap<String, Object>();
			key.put(SQLStatementBuilder.ExtendedSQLConditionValuesProcessor.EXPRESSION_KEY,
					searchLike(songlistToSearch, userToSearch));
			return songlistService.songlistQuery(key, columns);
		} catch (Exception e) {
			e.printStackTrace();
			EntityResult res = new EntityResult();
			res.setCode(EntityResult.OPERATION_WRONG);
			return res;
		}
	}

	private BasicExpression searchLike(String songlistToSearch, String userToSearch) {
			
		BasicField songlists = new BasicField(SonglistDao.ATTR_SONGLIST_NAME);
		BasicField users = new BasicField(SonglistDao.ATTR_SONGLIST_NICK_USER);
		BasicExpression bexp1 = new BasicExpression(songlists, BasicOperator.LIKE_OP, "%"+songlistToSearch+"%");
		BasicExpression bexp2 = new BasicExpression(users, BasicOperator.LIKE_OP, "%"+userToSearch+"%");
		return new BasicExpression(bexp1, BasicOperator.AND_OP, bexp2);
	}
}
















