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
			if (!option.equals("")) {
			Map<String, Object> key = new HashMap<String, Object>();
			key.put(SQLStatementBuilder.ExtendedSQLConditionValuesProcessor.EXPRESSION_KEY,
					searchLike(nameToSearch, option));
			return songService.songQuery(key, columns);
		}else {
			Map<String, Object> key = new HashMap<String, Object>();
			key.put(SQLStatementBuilder.ExtendedSQLConditionValuesProcessor.EXPRESSION_KEY,
					searchAll(nameToSearch));
			return songService.songQuery(key, columns);
			
		}

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
			case "genre":
			param = SongDao.ATTR_GENRE_NAME;
			// code block
			break;
		default:
			// code block
		}
		BasicField field = new BasicField(param);
		BasicExpression bexp1 = new BasicExpression(field, BasicOperator.LIKE_OP, "%"+toSearch+"%");
		return bexp1;
	}
	private BasicExpression searchAll(String toSearch) {		
		String param = SongDao.ATTR_SONG_NAME;
		String param1 = SongDao.ATTR_ALBUM_NAME;
		String param2 = SongDao.ATTR_ARTIST_NAME;
		String param3 = SongDao.ATTR_GENRE_NAME;
		BasicField field = new BasicField(param);
		BasicExpression bexp = new BasicExpression(field, BasicOperator.LIKE_OP, "%"+toSearch+"%");
		BasicField field1 = new BasicField(param1);
		BasicExpression bexp1 = new BasicExpression(field1, BasicOperator.LIKE_OP, "%"+toSearch+"%");
		BasicField field2 = new BasicField(param2);
		BasicExpression bexp2 = new BasicExpression(field2, BasicOperator.LIKE_OP, "%"+toSearch+"%");
		BasicField field3 = new BasicField(param3);
		BasicExpression bexp3 = new BasicExpression(field3, BasicOperator.LIKE_OP, "%"+toSearch+"%");
		BasicExpression bexp5 = new BasicExpression(bexp,BasicOperator.OR_OP,bexp1);
		BasicExpression bexp6 = new BasicExpression(bexp5,BasicOperator.OR_OP,bexp2);
		BasicExpression bexp7 = new BasicExpression(bexp6,BasicOperator.OR_OP,bexp3);
	return  bexp7;
}

}