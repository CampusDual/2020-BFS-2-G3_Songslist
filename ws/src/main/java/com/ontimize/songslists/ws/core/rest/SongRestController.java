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

import com.ontimize.songslists.api.core.service.ISongService;
import com.ontimize.songslists.model.core.dao.SongDao;
import com.ontimize.db.EntityResult;
import com.ontimize.db.SQLStatementBuilder;
import com.ontimize.db.SQLStatementBuilder.BasicExpression;
import com.ontimize.db.SQLStatementBuilder.BasicField;
import com.ontimize.db.SQLStatementBuilder.BasicOperator;
import com.ontimize.jee.server.rest.ORestController;

@RestController
@RequestMapping("/songs")
@ComponentScan(basePackageClasses = { com.ontimize.songslists.api.core.service.ISongService.class })
public class SongRestController extends ORestController<ISongService> {

	@Autowired
	private ISongService songService;


 @Override
 public ISongService getService() {
  return this.songService;
 }
 
 @RequestMapping(value = "/searchSong", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public EntityResult currenSearch(@RequestBody Map<String, Object> req) {
		try {
			List<String> columns = (List<String>) req.get("columns");
			Map<String, Object> filter = (Map<String, Object>) req.get("filter");
			String nameToSearch = (String) filter.get("NAME");
			String option = (String) filter.get("OPTION");
			Map<String, Object> key = new HashMap<String, Object>();
			key.put(SQLStatementBuilder.ExtendedSQLConditionValuesProcessor.EXPRESSION_KEY,
					searchLike(nameToSearch, option));
			return songService.songQuery(key, columns);
		} catch (Exception e) {
			e.printStackTrace();
			EntityResult res = new EntityResult();
			res.setCode(EntityResult.OPERATION_WRONG);
			return res;
		}
	}

	private BasicExpression searchLike(String toSearch, String option) {
		String param = null;
		switch (option) {
		case "song":
			param = SongDao.ATTR_SONG_NAME;
			// code block
			break;
		case "album":
			param = SongDao.ATTR_ALBUM_NAME;
			// code block
			break;
		case "artist":
			param = SongDao.ATTR_ARTIST_NAME;
			// code block
			break;
		default:
			// code block
		}
		BasicField field = new BasicField(param);
		BasicExpression bexp1 = new BasicExpression(field, BasicOperator.LIKE_OP, "%"+toSearch+"%");
		return bexp1;
	}
 

}