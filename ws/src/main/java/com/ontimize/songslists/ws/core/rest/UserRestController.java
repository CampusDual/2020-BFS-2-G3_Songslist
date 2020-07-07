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
<<<<<<< HEAD


=======
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import com.ontimize.songslists.api.core.service.IUserService;
>>>>>>> 3ba107de8f0c374c6c67fb336c9278866acd6aac
import com.ontimize.db.EntityResult;
import com.ontimize.jee.server.rest.ORestController;
import com.ontimize.songslists.api.core.service.IUserService;


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

}
