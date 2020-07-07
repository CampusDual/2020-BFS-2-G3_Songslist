package com.ontimize.songslists.ws.core.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.ontimize.songslists.api.core.service.IUserRoleService;
import com.ontimize.db.EntityResult;
import com.ontimize.jee.server.rest.ORestController;


@RestController
@RequestMapping("/userroles")
@ComponentScan(basePackageClasses={com.ontimize.songslists.api.core.service.IUserRoleService.class})
public class UserRoleRestController extends ORestController<IUserRoleService> {

	@Autowired
	private IUserRoleService userRoleSrv;

	@Override
	public IUserRoleService getService() {
		return this.userRoleSrv;
	}

	
	@RequestMapping(
		value = "/login",
		method = RequestMethod.POST,
		produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<EntityResult> login() {
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@RequestMapping(
			value = "/userRole",
			method = RequestMethod.POST,
			produces = MediaType.APPLICATION_JSON_VALUE)
		public ResponseEntity<EntityResult> register() {
			return new ResponseEntity<>(HttpStatus.OK);
		}

}