package com.ontimize.songslists.ws.core.rest;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import com.ontimize.songslists.api.core.service.IUserService;
import com.ontimize.db.EntityResult;
import com.ontimize.jee.server.rest.ORestController;


@RestController
@RequestMapping("/users")
@ComponentScan(basePackageClasses={com.ontimize.songslists.api.core.service.IUserService.class})
public class UserRestController extends ORestController<IUserService> {

	@Autowired
	private IUserService userSrv;

	@Override
	public IUserService getService() {
		return this.userSrv;
	}

	
	@RequestMapping(
		value = "/login",
		method = RequestMethod.POST,
		produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<EntityResult> login() {
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@RequestMapping(
			value = "/register",
			method = RequestMethod.POST,
			produces = MediaType.APPLICATION_JSON_VALUE)
		public ResponseEntity<EntityResult> register() {
			return new ResponseEntity<>(HttpStatus.OK);
		}
	
	 @RequestMapping(value = "/isPassword", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
		public EntityResult checkPass(@RequestBody Map<String, Object> req) {
		 try {
			List<String> columns = (List<String>) req.get("columns");
			columns.clear();
			columns.add("password_user");
			Map<String, Object> filter = (Map<String, Object>) req.get("filter");
			 EntityResult res =	 this.userSrv.userQuery(filter, columns);
			 return res;
		 } catch (Exception e) {
				e.printStackTrace();
				EntityResult res = new EntityResult();
				res.setCode(EntityResult.OPERATION_WRONG);
				return res;
			}
	 }
		 
	 @RequestMapping(value = "/isUser", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
		public EntityResult checkUser(@RequestBody Map<String, Object> req) {
		 try {
			List<String> columns = (List<String>) req.get("columns");
			columns.clear();
			columns.add("nick_user");
			Map<String, Object> filter = (Map<String, Object>) req.get("filter");
			 EntityResult res =	 this.userSrv.userQuery(filter, columns);
			 return res;
		 } catch (Exception e) {
				e.printStackTrace();
				EntityResult res = new EntityResult();
				res.setCode(EntityResult.OPERATION_WRONG);
				return res;
			}
	 }
		 
	

}