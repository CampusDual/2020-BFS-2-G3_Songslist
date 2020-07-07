package com.ontimize.songslists.ws.core.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.ontimize.songslists.api.core.service.IUserPreferenceService;
import com.ontimize.db.EntityResult;
import com.ontimize.jee.server.rest.ORestController;

@RestController
@RequestMapping("/userpreferences")
@ComponentScan(basePackageClasses={com.ontimize.songslists.api.core.service.IUserPreferenceService.class})
public class UserPreferenceRestControler extends ORestController<IUserPreferenceService> {
	@Autowired
	private IUserPreferenceService userPreferenceSrv;

	@Override
	public IUserPreferenceService getService() {
		return this.userPreferenceSrv;
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

}
